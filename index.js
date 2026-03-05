#!/usr/bin/env node
/**
 * Citedy SEO Agent — stdio MCP server (Docker / local).
 *
 * The full 41-tool server runs in the cloud at https://mcp.citedy.com/mcp
 * This lightweight wrapper exposes a single "citedy_connect" tool that
 * returns connection details so any MCP client can discover the remote
 * endpoint without manual configuration.
 *
 * Usage:
 *   docker run -e CITEDY_API_KEY=your_key ghcr.io/citedy/citedy-seo-agent
 *   # or
 *   npx citedy-seo-agent
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const REMOTE_URL = "https://mcp.citedy.com/mcp";

const server = new McpServer({
  name: "citedy-seo-agent",
  version: "3.1.0",
});

server.tool(
  "citedy_connect",
  "Returns connection details for the full Citedy MCP server (41 tools: SEO, content, social, video, lead magnets)",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: [
          "Citedy SEO Agent — Full-stack AI Marketing Toolkit",
          "",
          `Remote endpoint: ${REMOTE_URL}`,
          "Transport:       Streamable HTTP",
          "Auth:            Bearer <CITEDY_API_KEY>",
          "",
          "Get your API key: https://www.citedy.com/dashboard/settings",
          "",
          "Claude Desktop config (~/.claude/mcp.json):",
          JSON.stringify(
            {
              mcpServers: {
                citedy: {
                  url: REMOTE_URL,
                  headers: {
                    Authorization: "Bearer <YOUR_API_KEY>",
                  },
                },
              },
            },
            null,
            2
          ),
        ].join("\n"),
      },
    ],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
