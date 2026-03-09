#!/usr/bin/env node
/**
 * Deploy Citedy agents to AutoGPT Platform via External API.
 *
 * Usage:
 *   AUTOGPT_API_KEY=agpt_... node deploy-to-autogpt.mjs
 *
 * Creates each agent as a connected graph:
 *   Input → SendWebRequest → Output
 *
 * Node IDs use placeholders that the server remaps via reassign_ids().
 */

import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const AUTOGPT_API_KEY = process.env.AUTOGPT_API_KEY;
if (!AUTOGPT_API_KEY) {
  console.error("Error: Set AUTOGPT_API_KEY env variable");
  process.exit(1);
}

const BASE_URL = "https://backend.agpt.co/external-api/v1";

// Block IDs from AutoGPT Platform (stable across deployments)
const BLOCKS = {
  INPUT: "c0a8e994-ebf1-4a9c-a4d8-89d09c86741b",
  OUTPUT: "363ae599-353e-4804-937e-b2ee3cef3da4",
  WEB_REQUEST: "6595ae1f-b924-42cb-9a41-551a0611c4b4",
};

const manifest = JSON.parse(
  readFileSync(join(__dirname, "agents", "manifest.json"), "utf-8")
);

function loadAgentTemplate(file) {
  try {
    return JSON.parse(
      readFileSync(join(__dirname, "agents", file), "utf-8")
    );
  } catch {
    return null;
  }
}

/**
 * Build a fully-wired graph for one agent.
 * Uses placeholder node IDs — server reassigns them and remaps links.
 */
function buildGraph(entry) {
  const template = loadAgentTemplate(entry.file);

  const inputNodeId = "aaaaaaaa-0001-0001-0001-000000000001";
  const webNodeId = "aaaaaaaa-0002-0002-0002-000000000002";
  const outputNodeId = "aaaaaaaa-0003-0003-0003-000000000003";

  const inputNode = {
    id: inputNodeId,
    block_id: BLOCKS.INPUT,
    input_default: {
      name: "input",
      title: "Input",
      description: "Request payload (JSON) for " + entry.name,
    },
    metadata: { position: { x: -200, y: 0 } },
  };

  const webRequestNode = {
    id: webNodeId,
    block_id: BLOCKS.WEB_REQUEST,
    input_default: {
      url: entry.endpoint,
      method: entry.method || "POST",
      headers: { "Content-Type": "application/json" },
      body: template?.input?.body_template || {},
    },
    metadata: { position: { x: 200, y: 0 } },
  };

  const outputNode = {
    id: outputNodeId,
    block_id: BLOCKS.OUTPUT,
    input_default: {
      name: "result",
      title: "Result",
      description: "API response from Citedy",
    },
    metadata: { position: { x: 600, y: 0 } },
  };

  // Wire: Input.result → WebRequest.body, WebRequest.response → Output.value
  const links = [
    {
      id: "bbbbbbbb-0001-0001-0001-000000000001",
      source_id: inputNodeId,
      sink_id: webNodeId,
      source_name: "result",
      sink_name: "body",
      is_static: false,
    },
    {
      id: "bbbbbbbb-0002-0002-0002-000000000002",
      source_id: webNodeId,
      sink_id: outputNodeId,
      source_name: "response",
      sink_name: "value",
      is_static: false,
    },
  ];

  return {
    name: entry.name,
    description: entry.description + " | Citedy AI SEO Platform (citedy.com)",
    nodes: [inputNode, webRequestNode, outputNode],
    links,
  };
}

async function createGraph(graph) {
  const resp = await fetch(`${BASE_URL}/graphs`, {
    method: "POST",
    headers: {
      "X-API-Key": AUTOGPT_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graph),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`${resp.status}: ${text}`);
  }

  return resp.json();
}

async function main() {
  const skipNames = process.argv.includes("--skip")
    ? new Set(process.argv[process.argv.indexOf("--skip") + 1]?.split(","))
    : new Set();

  console.log(
    `\nDeploying ${manifest.templates.length} Citedy agents to AutoGPT Platform...\n`
  );

  const results = [];
  for (const entry of manifest.templates) {
    if (skipNames.has(entry.id)) {
      console.log(`⏭  Skipping: ${entry.name}`);
      continue;
    }

    try {
      const graph = buildGraph(entry);
      const created = await createGraph(graph);
      const linkCount = created.links?.length ?? 0;
      console.log(
        `✅ ${entry.name} → ${created.id} (${created.nodes?.length} nodes, ${linkCount} links)`
      );
      results.push({
        id: entry.id,
        graphId: created.id,
        name: entry.name,
        status: "created",
      });
    } catch (err) {
      console.error(`❌ ${entry.name}: ${err.message}`);
      results.push({
        id: entry.id,
        name: entry.name,
        status: "error",
        error: err.message,
      });
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(
    `Created: ${results.filter((r) => r.status === "created").length}`
  );
  console.log(
    `Errors:  ${results.filter((r) => r.status === "error").length}`
  );
  console.log(`\nGraph IDs:`);
  results
    .filter((r) => r.graphId)
    .forEach((r) => console.log(`  ${r.name}: ${r.graphId}`));
}

main().catch(console.error);
