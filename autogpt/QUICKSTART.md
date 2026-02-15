# AutoGPT Quickstart (Citedy)

## 1. Pick Template

Use one of:

- `agents/citedy-topic-to-publish.agent.json`
- `agents/citedy-url-to-publish.agent.json`
- `agents/citedy-trend-to-publish.agent.json`
- `agents/citedy-reddit-to-publish.agent.json`
- `agents/citedy-gap-to-publish.agent.json`
- `agents/citedy-session-manager.agent.json`
- `agents/citedy-scout-to-publish.agent.json`

## 2. Import

In AutoGPT Builder: **Import Agent** → choose template file.

## 3. Run Inputs

- `API Key`: `citedy_agent_...`
- `Request JSON`: endpoint payload

Example for topic template:

```json
{
  "topic": "AI content marketing trends 2026",
  "size": "mini",
  "language": "en",
  "illustrations": false,
  "audio": false
}
```

## 4. Inspect Outputs

- Success path: `response`
- Validation/auth issues: `client_error`
- Backend failures: `server_error`
- Network/runtime issues: `error`

## 5. Production Workflow

1. `citedy-scout-to-publish` or `citedy-trend-to-publish`
2. `citedy-topic-to-publish` or `citedy-url-to-publish`
3. (Optional) call `/api/agent/adapt` using `actions.json` payload schema

## 6. Validate Package

```bash
node ./validate-templates.mjs
```
