#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const agentsDir = path.join(root, "agents");
const manifestPath = path.join(agentsDir, "manifest.json");
const actionsPath = path.join(root, "actions.json");
const REQUIRED_ACTION_ENDPOINTS = [
  { method: "GET", path: "/api/agent/health" },
  { method: "GET", path: "/api/agent/status" },
  { method: "GET", path: "/api/agent/me" },
  { method: "GET", path: "/api/agent/settings" },
  { method: "POST", path: "/api/agent/autopilot" },
  { method: "POST", path: "/api/agent/adapt" },
  { method: "POST", path: "/api/agent/publish" },
  { method: "GET", path: "/api/agent/schedule/gaps" },
  { method: "POST", path: "/api/agent/products" },
  { method: "POST", path: "/api/agent/shorts" },
  { method: "GET", path: "/api/agent/shorts/{id}" },
  { method: "GET", path: "/api/agent/webhooks/deliveries" },
];

const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    fail(`JSON parse failed: ${filePath}: ${String(err)}`);
    return null;
  }
}

function actionKey(method, actionPath) {
  return `${method.toUpperCase()} ${actionPath}`;
}

function ensureGraph(filePath, graph) {
  if (!graph || typeof graph !== "object") {
    fail(`Graph is not an object: ${filePath}`);
    return;
  }

  const requiredRoot = [
    "id",
    "version",
    "name",
    "nodes",
    "links",
    "input_schema",
    "output_schema",
  ];
  for (const key of requiredRoot) {
    if (!(key in graph)) {
      fail(`Missing root field '${key}' in ${filePath}`);
    }
  }

  if (!Array.isArray(graph.nodes)) {
    fail(`'nodes' must be array in ${filePath}`);
    return;
  }
  if (!Array.isArray(graph.links)) {
    fail(`'links' must be array in ${filePath}`);
    return;
  }

  const nodeIds = new Set();
  for (const node of graph.nodes) {
    if (!node?.id || !node?.block_id) {
      fail(`Node missing id/block_id in ${filePath}`);
      continue;
    }
    nodeIds.add(node.id);

    if (!Array.isArray(node.input_links)) {
      fail(`Node ${node.id} missing input_links[] in ${filePath}`);
    }
    if (!Array.isArray(node.output_links)) {
      fail(`Node ${node.id} missing output_links[] in ${filePath}`);
    }
  }

  for (const link of graph.links) {
    if (!link?.id || !link?.source_id || !link?.sink_id) {
      fail(`Invalid link object in ${filePath}`);
      continue;
    }
    if (!nodeIds.has(link.source_id)) {
      fail(
        `Link ${link.id} source missing node ${link.source_id} in ${filePath}`,
      );
    }
    if (!nodeIds.has(link.sink_id)) {
      fail(`Link ${link.id} sink missing node ${link.sink_id} in ${filePath}`);
    }
  }

  const hasHttp = graph.nodes.some(
    (n) => n.block_id === "6595ae1f-b924-42cb-9a41-551a0611c4b4",
  );
  if (!hasHttp) {
    fail(`No HTTP request block found in ${filePath}`);
  }
}

const agentFiles = fs
  .readdirSync(agentsDir)
  .filter((name) => name.endsWith(".agent.json"))
  .sort();

if (agentFiles.length === 0) {
  fail("No .agent.json files found");
}

const manifest = readJson(manifestPath);
const actions = readJson(actionsPath);

if (manifest && Array.isArray(manifest.templates)) {
  const manifestFiles = manifest.templates.map((t) => t.file).sort();
  const expected = agentFiles.sort();
  if (manifestFiles.length !== expected.length) {
    fail(
      `Manifest count mismatch: manifest=${manifestFiles.length}, files=${expected.length}`,
    );
  }
  for (const file of expected) {
    if (!manifestFiles.includes(file)) {
      fail(`Manifest missing template file: ${file}`);
    }
  }
} else {
  fail(`Invalid or missing templates[] in ${manifestPath}`);
}

if (actions && Array.isArray(actions.agent_templates)) {
  for (const tpl of actions.agent_templates) {
    const file = String(tpl.file || "").replace(/^\.\/agents\//, "");
    if (!agentFiles.includes(file)) {
      fail(`actions.json references missing template: ${tpl.file}`);
    }
  }
} else {
  fail(`Invalid or missing agent_templates[] in ${actionsPath}`);
}

if (actions && Array.isArray(actions.actions)) {
  const seenActionKeys = new Map();

  for (const action of actions.actions) {
    const method = String(action.method || "").toUpperCase();
    const actionPath = String(action.path || "");
    const id = String(action.id || "");

    if (!method) {
      fail(`actions.json action is missing method (id=${id || "<no-id>"})`);
      continue;
    }
    if (!actionPath.startsWith("/")) {
      fail(
        `actions.json action has invalid path '${actionPath}' (id=${id || "<no-id>"})`,
      );
      continue;
    }

    const key = actionKey(method, actionPath);
    const ids = seenActionKeys.get(key) || [];
    ids.push(id || "<no-id>");
    seenActionKeys.set(key, ids);
  }

  for (const [key, ids] of seenActionKeys.entries()) {
    if (ids.length > 1) {
      fail(
        `actions.json has duplicate action endpoint '${key}' for ids: ${ids.join(", ")}`,
      );
    }
  }

  for (const required of REQUIRED_ACTION_ENDPOINTS) {
    const key = actionKey(required.method, required.path);
    if (!seenActionKeys.has(key)) {
      fail(`actions.json missing critical endpoint: ${key}`);
    }
  }

  const healthAction = actions.actions.find((a) => a.id === "health");
  const statusAction = actions.actions.find((a) => a.id === "status");
  if (healthAction && statusAction && healthAction.path === statusAction.path) {
    fail(
      "actions.json mixes infra health and operational status: health.path must differ from status.path",
    );
  }
} else {
  fail(`Invalid or missing actions[] in ${actionsPath}`);
}

for (const file of agentFiles) {
  const filePath = path.join(agentsDir, file);
  const graph = readJson(filePath);
  ensureGraph(filePath, graph);
}

if (errors.length > 0) {
  console.error("Template validation failed:");
  for (const err of errors) {
    console.error(`- ${err}`);
  }
  process.exit(1);
}

console.log(
  `Validated ${agentFiles.length} AutoGPT template(s) and ${actions?.actions?.length ?? 0} action entries.`,
);
