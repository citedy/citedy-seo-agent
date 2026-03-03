# OpenAI Integration Guide — GPT Actions and Agents SDK

Citedy exposes its full API surface through two integration paths for OpenAI:

- **Path A — Custom GPT with Actions**: import the OpenAPI spec into a Custom GPT in ChatGPT
- **Path B — OpenAI Agents SDK + MCP**: connect programmatically via the MCP server
- **Path C — ChatGPT MCP Connectors**: native MCP support in ChatGPT UI

---

## Prerequisites

- Citedy agent API key — obtain from `https://www.citedy.com/dashboard/settings` or by calling `POST /api/agent/register` followed by dashboard approval
- Key format starts with `citedy_agent_`
- All authenticated requests use header: `Authorization: Bearer <CITEDY_AGENT_API_KEY>`

---

## Path A: Custom GPT with Actions

Custom GPTs support OpenAPI-based actions. This is the fastest way to give ChatGPT access to Citedy tools without writing code.

### Step 1 — Create a Custom GPT

1. Go to `https://chatgpt.com`
2. Click your profile avatar -> **My GPTs** -> **Create a GPT**
3. Switch to the **Configure** tab

### Step 2 — Import the OpenAPI Spec

1. Scroll to **Actions** -> click **Create new action**
2. Click **Import from URL**
3. Enter: `https://www.citedy.com/openapi/agent-api.openapi.json`
4. Click **Import**

ChatGPT will parse all operations in the API spec ([source](https://www.citedy.com/openapi/agent-api.openapi.json)).

### Step 3 — Configure Authentication

In the Actions editor, under **Authentication**:

| Field               | Value                                |
| ------------------- | ------------------------------------ |
| Auth type           | API Key                              |
| API key             | your `<CITEDY_AGENT_API_KEY>` key    |
| Auth type (header)  | Custom                               |
| Custom header name  | `Authorization`                      |
| Header value prefix | `"Bearer "` (include trailing space) |

### Step 4 — Trim the Spec (Recommended)

GPT Actions has a payload size limit. The full spec may hit this limit. Extract only the operations your GPT needs.

**Minimal SEO assistant spec** (5 key operations):

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Citedy SEO Agent",
    "version": "1.0.0"
  },
  "servers": [{ "url": "https://www.citedy.com" }],
  "paths": {
    "/api/agent/autopilot": {
      "post": {
        "operationId": "generateArticle",
        "summary": "Generate SEO article",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "topic": { "type": "string" },
                  "size": {
                    "type": "string",
                    "enum": ["mini", "standard", "full", "pillar"]
                  },
                  "mode": { "type": "string", "enum": ["standard", "turbo"] }
                },
                "required": ["topic"]
              }
            }
          }
        },
        "responses": { "200": { "description": "Article generated" } }
      }
    },
    "/api/agent/gaps/generate": {
      "post": {
        "operationId": "generateContentGaps",
        "summary": "Analyze content gaps vs competitors",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "competitor_urls": {
                    "type": "array",
                    "items": { "type": "string" }
                  }
                },
                "required": ["competitor_urls"]
              }
            }
          }
        },
        "responses": { "200": { "description": "Gaps generated" } }
      }
    },
    "/api/agent/competitors/scout": {
      "post": {
        "operationId": "scoutCompetitor",
        "summary": "Deep analysis of a competitor domain",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "domain": { "type": "string" }
                },
                "required": ["domain"]
              }
            }
          }
        },
        "responses": { "200": { "description": "Scout result" } }
      }
    },
    "/api/agent/status": {
      "get": {
        "operationId": "getAgentStatus",
        "summary": "Get operational readiness snapshot",
        "responses": { "200": { "description": "Status" } }
      }
    },
    "/api/agent/me": {
      "get": {
        "operationId": "getAgentContext",
        "summary": "Get agent balance and limits",
        "responses": { "200": { "description": "Agent context" } }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "AgentApiKey": {
        "type": "http",
        "scheme": "bearer"
      }
    }
  },
  "security": [{ "AgentApiKey": [] }]
}
```

Save this as a local file and use **Import from file** instead of URL.

### Step 5 — System Prompt for SEO Assistant GPT

Paste this into the **Instructions** field:

```text
You are an SEO content assistant powered by Citedy. You help users plan, generate, and publish SEO-optimized articles.

## What you can do
- Generate long-form SEO articles on any topic (use generateArticle)
- Analyze competitor websites and find content gaps (use generateContentGaps, scoutCompetitor)
- Check operational readiness and credit balance (use getAgentStatus, getAgentContext)

## Behavior rules
1. Before generating content, call getAgentStatus to check credits. Warn the user if credits are low.
2. When generating an article, ask for: topic (required), size (mini/standard/full/pillar, default standard), mode (standard/turbo, default standard).
3. After calling generateContentGaps, summarize the top 5 opportunities with priority and rationale.
4. After calling scoutCompetitor, summarize: top topics, publishing frequency, estimated traffic.
5. If you receive HTTP 402, tell the user to top up credits at https://www.citedy.com/dashboard/billing
6. If you receive HTTP 401, tell the user to refresh their API key at https://www.citedy.com/dashboard/settings

## Output format
- Use markdown tables for gap analysis results
- Use numbered lists for article topic suggestions
- Always show credit cost warnings before expensive operations
```

### Most Useful Actions for a GPT

| Operation                           | operationId           | Use case                               |
| ----------------------------------- | --------------------- | -------------------------------------- |
| `POST /api/agent/autopilot`         | `generateArticle`     | Write SEO articles on demand           |
| `POST /api/agent/gaps/generate`     | `generateContentGaps` | Find topics competitors rank for       |
| `POST /api/agent/competitors/scout` | `scoutCompetitor`     | Deep competitor analysis               |
| `GET /api/agent/status`             | `getAgentStatus`      | Check credits and readiness            |
| `POST /api/agent/adapt`             | `generateAdaptations` | Create LinkedIn/X posts from article   |
| `GET /api/agent/articles`           | `listArticles`        | Retrieve previously generated articles |
| `POST /api/agent/lead-magnets`      | `generateLeadMagnet`  | Create checklists, swipe files         |

---

## Path B: OpenAI Agents SDK + MCP

The OpenAI Agents SDK (Python) supports MCP servers natively. This approach gives you the full current Citedy MCP toolset without writing individual wrappers ([tool list](https://www.citedy.com/mcp-tools.md)).

### Installation

```bash
pip install openai-agents
```

### Connect to Citedy MCP Server

```python
import asyncio
from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp

async def main():
    # Connect to Citedy MCP server
    async with MCPServerStreamableHttp(
        name="citedy-mcp",
        params={
            "url": "https://mcp.citedy.com/mcp",
            "headers": {"Authorization": "Bearer <CITEDY_AGENT_API_KEY>"},
        },
    ) as citedy_mcp:

        agent = Agent(
            name="SEO Assistant",
            instructions="""
            You are an SEO content assistant with access to Citedy tools.

            Available capabilities:
            - article.generate: Write SEO articles (provide topic, size, mode)
            - gaps.generate + gaps.list: Find content gaps vs competitors
            - competitors.scout: Analyze competitor domains
            - agent.status: Check credits and operational readiness
            - adapt.generate: Create social media posts from articles

            Always check agent.status first. Warn if credits are below 50.
            """,
            mcp_servers=[citedy_mcp],
        )

        # Run a task
        result = await Runner.run(
            agent,
            "Find content gaps compared to competitor.com and suggest 5 article topics"
        )
        print(result.final_output)

asyncio.run(main())
```

### Multi-Step Workflow Example

```python
import asyncio
from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp

async def run_content_pipeline(topic: str, competitor_url: str, api_key: str):
    async with MCPServerStreamableHttp(
        name="citedy-mcp",
        params={
            "url": "https://mcp.citedy.com/mcp",
            "headers": {"Authorization": f"Bearer {api_key}"},
        },
    ) as mcp:

        agent = Agent(
            name="Content Pipeline",
            instructions="""
            Execute this exact sequence:
            1. Call agent.status to verify readiness
            2. Call gaps.generate with the provided competitor URL
            3. Call gaps.list to read results
            4. Call article.generate for the highest-priority gap topic
            5. Return a summary: gap count, chosen topic, article headline
            """,
            mcp_servers=[mcp],
        )

        result = await Runner.run(
            agent,
            f"Run content pipeline for competitor: {competitor_url}. Topic hint: {topic}"
        )
        return result.final_output

asyncio.run(run_content_pipeline(
    topic="AI SEO tools",
    competitor_url="https://example-competitor.com",
    api_key="<CITEDY_AGENT_API_KEY>"
))
```

### Using the Responses API Directly

If you prefer the raw Responses API with `mcp_servers` parameter:

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-4o",
    tools=[{
        "type": "mcp",
        "server_label": "citedy",
        "server_url": "https://mcp.citedy.com/mcp",
        "headers": {
            "Authorization": "Bearer <CITEDY_AGENT_API_KEY>"
        },
        # Optional: restrict to specific tools
        "allowed_tools": [
            "article.generate",
            "gaps.generate",
            "gaps.list",
            "agent.status",
            "competitors.scout"
        ]
    }],
    input="Analyze competitor.com and write an article about their top content gap"
)

print(response.output_text)
```

### Available MCP Tools

Key tools by category:

| Category     | Tools                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Content      | `article.generate`, `article.list`, `adapt.generate`                                                                                                                                                   |
| Research     | `gaps.generate`, `gaps.list`, `competitors.discover`, `competitors.scout`                                                                                                                              |
| Scouting     | `scout.reddit`, `scout.reddit.result`, `scout.x`, `scout.x.result`                                                                                                                                     |
| Publishing   | `social.publish`, `schedule.list`, `schedule.gaps`                                                                                                                                                     |
| Lead Magnets | `leadmagnet.generate`, `leadmagnet.get`, `leadmagnet.publish`, `leadmagnet.archive`                                                                                                                    |
| Knowledge    | `products.create`, `products.search`, `products.list`, `products.delete`                                                                                                                               |
| Ingestion    | `ingest.create`, `ingest.batch`, `ingest.get`, `ingest.content.get`                                                                                                                                    |
| SEO Tools    | `seo.meta_tags.check`, `seo.headings.check`, `seo.links.analyze`, `seo.schema.validate`, `seo.robots.check`, `seo.sitemap.check`, `seo.og.preview`, `seo.og_image.generate`, `seo.internal_links.plan` |
| Shorts       | `shorts.generate`, `shorts.get`, `shorts.script`, `shorts.avatar`, `shorts.merge`                                                                                                                      |
| Agent        | `agent.me`, `agent.status`, `agent.health`                                                                                                                                                             |

Full tool list: `https://www.citedy.com/mcp-tools.md`

---

## Path C: ChatGPT MCP Connectors

ChatGPT now supports MCP servers as native connectors in the UI.

### Add Citedy as a Connector

1. Open ChatGPT -> click your profile -> **Settings**
2. Navigate to **Connected apps** or **Integrations** (location varies by account type)
3. Click **Add MCP server** (or **Add connector**)
4. Enter the MCP endpoint:

```text
https://mcp.citedy.com/mcp
```

5. When prompted for authentication, select **Bearer token** and paste your `<CITEDY_AGENT_API_KEY>` key

Once connected, ChatGPT can invoke Citedy tools directly in conversation without any GPT Actions setup.

> Note: ChatGPT MCP connector support is rolling out progressively. If you do not see the option, use Path A (GPT Actions) instead.

---

## Trimming the OpenAPI Spec for GPT Actions

GPT Actions enforces limits on spec size. If you need more than the 5 operations in the minimal spec above, follow this approach.

### Operations Reference

From the full spec at `https://www.citedy.com/openapi/agent-api.openapi.json`, select by `operationId`:

| operationId                 | Path                                   | Purpose                               |
| --------------------------- | -------------------------------------- | ------------------------------------- |
| `generateArticle`           | `POST /api/agent/autopilot`            | Core: article generation              |
| `generateContentGaps`       | `POST /api/agent/gaps/generate`        | Core: gap analysis                    |
| `listContentGaps`           | `GET /api/agent/gaps`                  | Core: read gap results                |
| `scoutCompetitor`           | `POST /api/agent/competitors/scout`    | Research: competitor deep dive        |
| `discoverCompetitors`       | `POST /api/agent/competitors/discover` | Research: find competitors by keyword |
| `getAgentStatus`            | `GET /api/agent/status`                | Ops: readiness check                  |
| `getAgentContext`           | `GET /api/agent/me`                    | Ops: balance check                    |
| `generateSocialAdaptations` | `POST /api/agent/adapt`                | Distribution: social posts            |
| `listArticles`              | `GET /api/agent/articles`              | Retrieval: list articles              |
| `generateLeadMagnet`        | `POST /api/agent/lead-magnets`         | Lead gen: checklists/swipe files      |

### Extraction Script (Node.js)

```javascript
const fs = require("fs");

const KEEP_OPERATIONS = [
  "generateArticle",
  "generateContentGaps",
  "listContentGaps",
  "scoutCompetitor",
  "getAgentStatus",
  "getAgentContext",
  "generateSocialAdaptations",
  "listArticles",
];

const spec = JSON.parse(fs.readFileSync("agent-api.openapi.json", "utf-8"));
const trimmed = { ...spec, paths: {} };

for (const [path, methods] of Object.entries(spec.paths)) {
  for (const [method, op] of Object.entries(methods)) {
    if (KEEP_OPERATIONS.includes(op.operationId)) {
      trimmed.paths[path] = trimmed.paths[path] || {};
      trimmed.paths[path][method] = op;
    }
  }
}

fs.writeFileSync("citedy-gpt-actions.json", JSON.stringify(trimmed, null, 2));
console.log(`Kept ${Object.keys(trimmed.paths).length} paths`);
```

Run: `node trim-spec.js`, then import `citedy-gpt-actions.json` into GPT Actions via **Import from file**.

---

## Troubleshooting

### HTTP 401 — Unauthorized

The API key is missing, malformed, or revoked.

- Verify the key starts with `citedy_agent_`
- In GPT Actions: confirm the auth header is `Authorization` with value prefix `"Bearer "` (space after Bearer)
- Regenerate the key at `https://www.citedy.com/dashboard/settings`

### HTTP 402 — Insufficient Credits

Account has run out of credits.

- Top up at `https://www.citedy.com/dashboard/billing`
- Check current balance with `GET /api/agent/me` (field: `tenant_balance.credits`)

### HTTP 403 — Agent Paused or Revoked

The agent key has been paused by the tenant owner.

- Go to `https://www.citedy.com/dashboard` -> Settings -> Agent Keys
- Re-enable or issue a new key

### HTTP 429 — Rate Limited

Too many requests in the current window.

- Check response headers: `X-RateLimit-Reset` (Unix timestamp), `Retry-After` (seconds)
- In GPT Actions, ChatGPT will surface the error message — tell users to wait before retrying
- In Agents SDK, add retry logic:

```python
import time

def call_with_retry(func, max_retries=3):
    for attempt in range(max_retries):
        try:
            return func()
        except RateLimitError as e:
            if attempt == max_retries - 1:
                raise
            wait = getattr(e, 'retry_after', 60)
            time.sleep(wait)
```

### GPT Actions — Spec Import Fails

- Validate the spec at `https://editor.swagger.io/` before importing
- If importing from URL fails, use the file import method with a trimmed spec instead
- Ensure the spec uses `openapi: 3.1.0` — GPT Actions supports 3.0.x and 3.1.x

### MCP Connection Refused (Agents SDK)

- Verify the URL is exactly `https://mcp.citedy.com/mcp` (no trailing slash)
- Confirm the `Authorization` header is inside `params.headers`, not query params
- Test connectivity:

```bash
curl -s https://mcp.citedy.com/mcp \
  -H "Authorization: Bearer <CITEDY_AGENT_API_KEY>" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

### Tool Calls Return `processing` Status

Several tools are async and return a job ID immediately.

- `article.generate` — synchronous; waits for completion before returning
- `shorts.generate` — async; poll `shorts.get` every 10s until `status` is `completed` or `failed`
- `scout.reddit` / `scout.x` — async; poll `scout.reddit.result` / `scout.x.result` until terminal state

In the Agents SDK, instruct the agent to poll in the system prompt. In GPT Actions, configure the GPT instructions to handle polling explicitly.

---

## Reference Links

| Resource             | URL                                                     |
| -------------------- | ------------------------------------------------------- |
| Full OpenAPI spec    | `https://www.citedy.com/openapi/agent-api.openapi.json` |
| MCP endpoint         | `https://mcp.citedy.com/mcp`                            |
| MCP tools list       | `https://www.citedy.com/mcp-tools.md`                   |
| Agent interface docs | `https://www.citedy.com/agents.md`                      |
| Dashboard settings   | `https://www.citedy.com/dashboard/settings`             |
| Billing top-up       | `https://www.citedy.com/dashboard/billing`              |
| Skill file           | `https://www.citedy.com/skill.md`                       |
