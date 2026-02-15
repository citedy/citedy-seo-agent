# Citedy SEO Agent for AutoGPT

This directory contains importable AutoGPT graph templates for Citedy API workflows.

## What You Get

- `agents/*.agent.json` — importable AutoGPT templates
- `agents/manifest.json` — template index
- `actions.json` — endpoint/action reference
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

- `citedy-topic-to-publish.agent.json` → `POST /api/agent/autopilot` (`topic`)
- `citedy-url-to-publish.agent.json` → `POST /api/agent/autopilot` (`source_urls`)
- `citedy-trend-to-publish.agent.json` → `POST /api/agent/scout/x`
- `citedy-reddit-to-publish.agent.json` → `POST /api/agent/scout/reddit`
- `citedy-gap-to-publish.agent.json` → `POST /api/agent/gaps/generate`
- `citedy-session-manager.agent.json` → `POST /api/agent/session`
- `citedy-scout-to-publish.agent.json` → `POST /api/agent/scout/x` (extended scout preset)

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

## Notes

- Templates are direct API-call graphs, no compatibility wrappers.
- Existing Citedy API behavior is not modified by this package.
