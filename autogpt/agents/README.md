# AutoGPT Templates

## Files (19 templates)

### Article Generation
1. `citedy-topic-to-publish.agent.json` — standard article from topic
2. `citedy-url-to-publish.agent.json` — standard article from source URLs
3. `citedy-turbo-article.agent.json` — turbo/turbo+ article (2-4 credits)

### Trend Discovery
4. `citedy-trend-to-publish.agent.json` — X/Twitter scout
5. `citedy-reddit-to-publish.agent.json` — Reddit scout
6. `citedy-scout-to-publish.agent.json` — extended scout preset
7. `citedy-scan.agent.json` — fast multi-source scan

### Social & Publishing
8. `citedy-micro-post.agent.json` — micro social post
9. `citedy-publish.agent.json` — publish/schedule adaptation

### Content Ingestion
10. `citedy-ingest.agent.json` — URL ingestion (YouTube, article, PDF, audio)

### Lead Magnets
11. `citedy-lead-magnet.agent.json` — PDF lead magnet

### Shorts Pipeline
12. `citedy-shorts-script.agent.json` — speech script (1 cr)
13. `citedy-shorts-avatar.agent.json` — AI avatar image (3 cr)
14. `citedy-shorts-video.agent.json` — video segment (60-185 cr)
15. `citedy-shorts-merge.agent.json` — merge + subtitles (5 cr)

### Automation & Integration
16. `citedy-session-manager.agent.json` — recurring session
17. `citedy-gap-to-publish.agent.json` — competitor gaps
18. `citedy-webhook-register.agent.json` — webhook endpoint
19. `citedy-product-upload.agent.json` — product knowledge

## Input Contract

Each template requires:

- `API Key` (string, secret): Citedy API key with `citedy_agent_` prefix
- `Request JSON` (string): valid JSON payload for template endpoint

## Output Contract

- `response` — 2xx success
- `client_error` — 4xx error
- `server_error` — 5xx error
- `error` — transport/runtime error
