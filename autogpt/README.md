# Citedy SEO Agent for AutoGPT

v3.1.0 — Full API coverage with 19 importable templates.

## What You Get

- `agents/*.agent.json` — 19 importable AutoGPT templates
- `agents/manifest.json` — template index
- `actions.json` — 49 endpoint/action reference with pricing
- `validate-templates.mjs` — local integrity validator
- `QUICKSTART.md` — fast operator onboarding

## Prerequisites

- AutoGPT instance with graph import enabled
- Citedy API key (`citedy_agent_...`)
- Internet egress from AutoGPT runtime to `https://www.citedy.com`

## Import Steps

1. In AutoGPT, choose **Import Agent**.
2. Select one file from `agents/*.agent.json`.
3. Save imported agent.
4. Run with:

- `API Key`: `citedy_agent_...`
- `Request JSON`: payload for selected endpoint

## Templates

### Article Generation

- `citedy-topic-to-publish.agent.json` — Standard article from topic (15-48 credits)
- `citedy-url-to-publish.agent.json` — Standard article from source URLs
- `citedy-turbo-article.agent.json` — Ultra-cheap turbo article (2-4 credits)

### Trend Discovery

- `citedy-trend-to-publish.agent.json` — Scout X/Twitter trends (35-70 credits)
- `citedy-reddit-to-publish.agent.json` — Scout Reddit trends (30 credits)
- `citedy-scout-to-publish.agent.json` — Extended scout preset
- `citedy-scan.agent.json` — Fast multi-source trend scan (2-8 credits)

### Social & Publishing

- `citedy-micro-post.agent.json` — Create micro social post
- `citedy-publish.agent.json` — Publish/schedule social adaptation

### Content Ingestion

- `citedy-ingest.agent.json` — Ingest URL (YouTube, article, PDF, audio) (1-55 credits)

### Lead Magnets

- `citedy-lead-magnet.agent.json` — Generate PDF lead magnet (30-100 credits)

### Short-Form Video (Shorts Pipeline)

- `citedy-shorts-script.agent.json` — Generate speech script (1 credits)
- `citedy-shorts-avatar.agent.json` — Generate AI avatar image (3 credits)
- `citedy-shorts-video.agent.json` — Generate video segment (60-185 credits)
- `citedy-shorts-merge.agent.json` — Merge segments + subtitles (5 credits)

### Automation & Integration

- `citedy-session-manager.agent.json` — Recurring content session
- `citedy-gap-to-publish.agent.json` — Competitor content gaps (40 credits)
- `citedy-webhook-register.agent.json` — Register webhook endpoint
- `citedy-product-upload.agent.json` — Upload product knowledge (1 credits)

## Output Channels

All templates expose four outputs:

- `response` — successful 2xx response body
- `client_error` — 4xx response body
- `server_error` — 5xx response body
- `error` — runtime/transport errors

## Validate Templates Locally

```bash
node ./validate-templates.mjs
```

Validator now checks:

- graph integrity for every template
- `manifest.json` <-> `agents/*.agent.json` consistency
- `actions.json` template references
- critical endpoints presence in `actions.json` (including `GET /api/agent/status`)

## Notes

- Templates are direct API-call graphs, no compatibility wrappers.
- Existing Citedy API behavior is not modified by this package.
- Use `GET /api/agent/status` for actionable onboarding/readiness checks.
- 1 credit = $0.01 USD.
