---
trigger: model_decision
description: "Use Citedy MCP tools for SEO content creation, trend scouting, competitor analysis, article generation, social adaptations, AI video shorts, content ingestion, and lead magnets"
---

# Citedy SEO Agent — MCP Rules

Citedy is an AI platform for SEO content automation: trend scouting, competitor analysis, article generation in 55 languages, social adaptations, AI video shorts, and lead magnets. Use these MCP tools whenever the user asks about SEO, content creation, competitor research, social media publishing, or AI video.

## MCP Endpoint

- **URL**: `https://mcp.citedy.com/mcp`
- **Protocol**: Streamable HTTP (MCP)
- **Auth**: Bearer token via `CITEDY_AGENT_API_KEY` environment variable
- **Header**: `Authorization: Bearer ${env:CITEDY_AGENT_API_KEY}`

## Registration

If the user has no API key:
1. Call `POST https://www.citedy.com/api/agent/register` with `{ "agent_name": "..." }`
2. Open the returned `approval_url` for the user
3. After approval, retrieve the API key from the response or dashboard

## Tool Reference

### Account
- `agent.me` — current account info, credits, plan
- `agent.status` — workspace status and limits

### Trend Scouting (async)
- `scout.x` — start X/Twitter trend scouting job
- `scout.reddit` — start Reddit trend scouting job
- `scout.x.result` / `scout.reddit.result` — poll for scouting results (poll until `status: complete`)

### Competitor Analysis
- `competitors.discover` — find competitors for a domain
- `competitors.scout` — analyze competitor content strategy

### Content Gaps
- `gaps.generate` — generate content gap opportunities (sync)
- `gaps.list` — list discovered content gaps

### Article Generation
- `article.generate` — generate SEO article (55 languages supported)
- `article.list` — list generated articles

### Social Adaptations
- `adapt.generate` — adapt content for social platforms: X, LinkedIn, Facebook, Reddit, Threads, Instagram, Reels, Shorts, Shopify

### Publishing
- `social.publish` — publish or schedule content to connected social accounts

### AI Video Shorts (async)
- `shorts.script` — generate video script from article or topic
- `shorts.avatar` — select AI avatar
- `shorts.generate` — start UGC viral video generation job
- `shorts.get` — poll for video generation result
- `shorts.merge` — merge video parts, add subtitles

### Content Ingestion (async)
- `ingest.create` — ingest single URL (YouTube, PDF, audio, web page)
- `ingest.batch` — ingest multiple URLs
- `ingest.get` — poll for ingestion status
- `ingest.content.get` — retrieve ingested content

### Lead Magnets
- `leadmagnet.generate` — generate lead magnet (checklist, swipe file, framework)
- `leadmagnet.get` — get lead magnet status/result
- `leadmagnet.publish` — publish lead magnet
- `leadmagnet.archive` — archive lead magnet

### Knowledge Base
- `products.create` — add product/service to knowledge base
- `products.list` — list knowledge base entries
- `products.search` — search knowledge base
- `products.delete` — remove knowledge base entry

### Content Calendar
- `schedule.list` — list scheduled content
- `schedule.gaps` — find scheduling gaps and opportunities

### Autopilot
- `session.create` — create autopilot session for automated content pipeline

### Webhooks
- `webhooks.register` — register webhook for events (article.ready, shorts.ready, etc.)
- `webhooks.list` — list registered webhooks
- `webhooks.delete` — remove webhook
- `webhooks.deliveries` — inspect webhook delivery history

### Configuration
- `personas.list` — list available writing personas/styles
- `settings.get` — get workspace settings and connected integrations

## Standard Workflow

1. **Scout** — `scout.x` or `scout.reddit` → poll `.result` until complete
2. **Find gaps** — `gaps.generate` → `gaps.list`
3. **Generate article** — `article.generate` → optionally verify via `article.list`
4. **Adapt for social** — `adapt.generate` with target platforms
5. **Publish** — `social.publish` or schedule
6. **Optionally create video** — `shorts.script` → `shorts.avatar` → `shorts.generate` → poll `shorts.get` → `shorts.merge`

## Async Polling Pattern

Tools marked async return a `jobId`. Poll the corresponding `.get` or `.result` tool with that `jobId` every 3-5 seconds until `status` is `complete` or `failed`. Tools: `scout.*`, `ingest.*`, `shorts.*`, `leadmagnet.*`.

## Credit Costs

Credits are consumed per operation. Check `agent.me` for current balance before expensive operations (video, bulk ingestion). Inform the user if balance is low.
