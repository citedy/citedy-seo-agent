# AutoGPT Templates

## Files

1. `citedy-topic-to-publish.agent.json`
2. `citedy-url-to-publish.agent.json`
3. `citedy-trend-to-publish.agent.json`
4. `citedy-reddit-to-publish.agent.json`
5. `citedy-gap-to-publish.agent.json`
6. `citedy-session-manager.agent.json`
7. `citedy-scout-to-publish.agent.json`

## Input Contract

Each template requires:

- `API Key` (string, secret): Citedy API key with `citedy_agent_` prefix
- `Request JSON` (string): valid JSON payload for template endpoint

## Output Contract

- `response`
- `client_error`
- `server_error`
- `error`
