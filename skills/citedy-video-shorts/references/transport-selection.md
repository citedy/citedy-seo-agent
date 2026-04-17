# Transport Selection

## Primary Rule

Use MCP first. Use REST only as fallback.

## MCP Path

If these tools are available, use them:

- `shorts.script`
- `shorts.avatar`
- `shorts.generate`
- `shorts.get`
- `shorts.merge`
- `shorts.publish`

## REST Fallback

If MCP is unavailable, use:

- `POST /api/agent/shorts/script`
- `POST /api/agent/shorts/avatar`
- `POST /api/agent/shorts`
- `GET /api/agent/shorts/{id}`
- `POST /api/agent/shorts/merge`
- `POST /api/agent/shorts/publish`

## Mixed-Mode Rule

Do not mix MCP and REST within the same run unless a transport-level failure forces a restart.

If restart is required:

- report the fallback clearly
- restart the remaining flow cleanly
- avoid duplicate generation work

## Resume Rule

Every generation should persist minimal durable metadata before any retriable step:

- `generation_id`
- `artifact_urls`
- `status`
- `step`

On retry or resume:

1. check whether a prior `generation_id` exists
2. verify whether recorded `artifact_urls` are still valid
3. reuse valid artifacts instead of regenerating them
4. continue from the last durable `step`
5. keep using the same `generation_id` on resumed work so billing and downstream systems can recognize idempotent continuation

## Auth

If REST is required and no valid key exists:

1. call `POST /api/agent/register`
2. ask the human to approve `approval_url`
3. store `citedy_agent_...` only in a secure secret store such as an OS keychain, secret manager, or encrypted local keystore
4. never write the key to repo-tracked files or logs; redact any `Authorization: Bearer <key>` value in logs
5. if a local file is unavoidable, use restrictive filesystem permissions and rotate the key if exposure is suspected
6. use `Authorization: Bearer <key>`
