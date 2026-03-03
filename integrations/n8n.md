# Citedy MCP + n8n Integration Guide

Connect Citedy's MCP server to n8n to automate SEO content workflows: article generation, content gap analysis, social adaptation, and more — all from n8n nodes.

- MCP endpoint: `https://mcp.citedy.com/mcp`
- 52 tools available (article, gaps, competitors, social, shorts, webhooks, etc.)
- Full tool list: [https://www.citedy.com/mcp-tools.md](https://www.citedy.com/mcp-tools.md)

---

## Prerequisites

- n8n instance (self-hosted or n8n Cloud, version with MCP Client Tool node support)
- Citedy API key — get one at [https://www.citedy.com/dashboard/settings](https://www.citedy.com/dashboard/settings)

---

## Setup: MCP Client Tool Node

n8n supports MCP natively via the **MCP Client Tool** node (available in n8n 1.x with AI Agent nodes).

### Steps

1. In your workflow, add an **AI Agent** node (or open an existing one).
2. Inside the agent, click **Add Tool** and select **MCP Client Tool**.
3. Configure the node:

**Transport**: `HTTP (Streamable HTTP / SSE)`

**URL**:

```
https://mcp.citedy.com/mcp
```

**Authentication**: Custom Header

| Header Name     | Header Value                   |
| --------------- | ------------------------------ |
| `Authorization` | `Bearer citedy_agent_YOUR_KEY` |

4. Click **Test Connection** — you should see 52 tools loaded.
5. Optionally filter to specific tools using the **Tools Filter** field (e.g. `article.generate, gaps.generate`).

### Reusable credential

Create a reusable **HTTP Header Auth** credential in n8n:

```json
{
  "name": "Citedy MCP",
  "headerName": "Authorization",
  "headerValue": "Bearer citedy_agent_YOUR_KEY"
}
```

Attach it to every MCP Client Tool node that connects to Citedy.

---

## Example Workflow: Auto-Generate Blog Article

Runs on a schedule, generates an article, then sends a Slack notification with the result.

### Node layout

```
[Schedule Trigger] → [AI Agent] → [Slack]
                          |
                    [MCP Client Tool: Citedy]
```

### 1. Schedule Trigger

- Mode: `Every Day` at `08:00`

### 2. AI Agent

- Node: **AI Agent**
- Model: any (GPT-4o, Claude, etc.)
- System prompt:

```
You are a content automation agent. When triggered, call article.generate with the
provided topic and return the article title and URL.
```

- Add tool: **MCP Client Tool** (configured as above)

### 3. article.generate parameters

```json
{
  "topic": "AI SEO trends 2026",
  "size": "standard",
  "mode": "turbo"
}
```

Successful response includes `article_id`, `title`, `article_url`, and `status`.

### 4. Slack notification

- Node: **Slack**
- Channel: `#content`
- Message:

```
New article published: {{ $json.title }}
URL: {{ $json.article_url }}
```

---

## Example Workflow: Content Gap Analysis

Discover content opportunities by analyzing competitor domains on a weekly schedule.

### Node layout

```
[Schedule Trigger] → [AI Agent] → [Google Sheets]
                          |
                    [MCP Client Tool: Citedy]
```

### 1. Schedule Trigger

- Mode: `Every Week` on Monday

### 2. AI Agent system prompt

```
Analyze content gaps against our competitors. Call gaps.generate with the competitor
URLs below, then call gaps.list to retrieve results. Return a summary of the top 5
opportunities.
```

### 3. gaps.generate parameters

```json
{
  "competitor_urls": [
    "https://competitor-one.com/blog",
    "https://competitor-two.com"
  ]
}
```

### 4. gaps.list

No parameters required. Returns saved gap opportunities with `score`, `priority`, `keyword`, and `rationale` fields.

### 5. Write to Google Sheets

Map fields from the gaps response:

| Sheet Column | Expression              |
| ------------ | ----------------------- |
| Keyword      | `{{ $json.keyword }}`   |
| Priority     | `{{ $json.priority }}`  |
| Score        | `{{ $json.score }}`     |
| Rationale    | `{{ $json.rationale }}` |

---

## Example Workflow: Article + Social Distribution

Generate an article and immediately create social adaptations for LinkedIn and X.

### Tool sequence

1. `article.generate` — generate the article
2. `article.list` (limit: 1) — retrieve the new article's ID
3. `adapt.generate` — create social variants

### article.generate parameters

```json
{
  "topic": "Why MCP is replacing custom API integrations",
  "size": "standard",
  "mode": "turbo"
}
```

### article.list parameters

```json
{
  "limit": 1,
  "offset": 0
}
```

### adapt.generate parameters

```json
{
  "article_id": "{{ $('article.list').item.json.id }}",
  "platforms": ["linkedin", "x_thread"],
  "include_ref_link": true
}
```

Response includes per-platform text, character counts, and `published` status per platform.

---

## Available Tools Reference

Full tool list with descriptions: [https://www.citedy.com/mcp-tools.md](https://www.citedy.com/mcp-tools.md)

Key tool groups:

| Group        | Tools                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Articles     | `article.generate`, `article.list`                                                                                                                                                                     |
| Gaps         | `gaps.generate`, `gaps.list`                                                                                                                                                                           |
| Competitors  | `competitors.discover`, `competitors.scout`                                                                                                                                                            |
| Social       | `adapt.generate`, `social.publish`                                                                                                                                                                     |
| Ingestion    | `ingest.create`, `ingest.get`, `ingest.batch`, `ingest.content.get`                                                                                                                                    |
| Shorts       | `shorts.generate`, `shorts.get`, `shorts.script`, `shorts.avatar`, `shorts.merge`                                                                                                                      |
| Lead Magnets | `leadmagnet.generate`, `leadmagnet.get`, `leadmagnet.publish`, `leadmagnet.archive`                                                                                                                    |
| Webhooks     | `webhooks.register`, `webhooks.list`, `webhooks.deliveries`, `webhooks.delete`                                                                                                                         |
| Agent        | `agent.status`, `agent.me`, `agent.health`                                                                                                                                                             |
| Brand        | `brand.scan`, `brand.scan.get`                                                                                                                                                                         |
| SEO          | `seo.meta_tags.check`, `seo.headings.check`, `seo.links.analyze`, `seo.schema.validate`, `seo.robots.check`, `seo.sitemap.check`, `seo.og.preview`, `seo.og_image.generate`, `seo.internal_links.plan` |
| Products     | `products.list`, `products.create`, `products.search`, `products.delete`                                                                                                                               |
| Schedule     | `schedule.list`, `schedule.gaps`                                                                                                                                                                       |
| Personas     | `personas.list`                                                                                                                                                                                        |
| Session      | `session.create`                                                                                                                                                                                       |
| Settings     | `settings.get`                                                                                                                                                                                         |

### Async tools — polling required

Some tools start a background job and return an ID. Poll the result tool every 10 seconds until status is `completed` or `failed`.

| Start tool            | Poll tool             | ID field |
| --------------------- | --------------------- | -------- |
| `ingest.create`       | `ingest.get`          | `id`     |
| `ingest.batch`        | `ingest.get`          | `id`     |
| `leadmagnet.generate` | `leadmagnet.get`      | `id`     |
| `scout.x`             | `scout.x.result`      | `runId`  |
| `scout.reddit`        | `scout.reddit.result` | `runId`  |
| `shorts.generate`     | `shorts.get`          | `id`     |
| `brand.scan`          | `brand.scan.get`      | `id`     |

In n8n, handle polling with a **Wait** node + **IF** node loop, or use an AI Agent node which auto-polls when the tool response contains a `poll_tool` field.

---

## Troubleshooting

### 401 Unauthorized

```json
{ "error": "Unauthorized" }
```

- Verify the `Authorization` header is exactly `Bearer citedy_agent_YOUR_KEY` with no extra spaces.
- Confirm the key is active at [https://www.citedy.com/dashboard/settings](https://www.citedy.com/dashboard/settings).

### 402 Payment Required

```json
{ "error": "Insufficient credits" }
```

- Top up at [https://www.citedy.com/dashboard/billing](https://www.citedy.com/dashboard/billing).
- Check current balance with the `agent.me` tool.

### 429 Too Many Requests

```json
{ "error": "Rate limited", "retry_after": 30 }
```

- Add a **Wait** node after the failing step, using the `retry_after` value from the response.
- Spread scheduled workflows across the day to avoid burst limits.

### MCP connection fails in n8n

- Confirm the URL is exactly `https://mcp.citedy.com/mcp`.
- Ensure your n8n instance can reach external HTTPS endpoints (check firewall/proxy for self-hosted setups).
- Validate connectivity manually:

```bash
curl -s https://mcp.citedy.com/mcp \
  -H "Authorization: Bearer citedy_agent_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

Expected: a JSON response listing 52 tools.

### Tool returns status `processing`

Async tools return a `poll_tool` and `poll_id` in the response body. Handle in n8n:

1. Extract `poll_id` with a **Set** node.
2. Add a **Wait** node (10 seconds).
3. Call the poll tool (e.g. `ingest.get`) with `{"id": "{{ $json.poll_id }}"}`.
4. Use an **IF** node to check `status !== "completed"` and loop back to the Wait node.
