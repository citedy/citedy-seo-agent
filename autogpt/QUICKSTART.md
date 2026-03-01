# AutoGPT Quickstart (Citedy v3.0.0)

## 1. Pick Template

### Fastest Start

- `agents/citedy-turbo-article.agent.json` — 2 credits, ~10s

### Standard Article

- `agents/citedy-topic-to-publish.agent.json` — from topic
- `agents/citedy-url-to-publish.agent.json` — from URLs

### Trend Discovery

- `agents/citedy-scan.agent.json` — fast multi-source scan (2-8 cr)
- `agents/citedy-trend-to-publish.agent.json` — X/Twitter deep scout
- `agents/citedy-reddit-to-publish.agent.json` — Reddit scout

### Shorts Pipeline (full video in 4 steps)

1. `agents/citedy-shorts-script.agent.json` — script (1 cr)
2. `agents/citedy-shorts-avatar.agent.json` — avatar (3 cr)
3. `agents/citedy-shorts-video.agent.json` — video (60-185 cr)
4. `agents/citedy-shorts-merge.agent.json` — merge + subtitles (5 cr)

### Content Ingestion

- `agents/citedy-ingest.agent.json` — YouTube, articles, PDFs, audio

### Lead Magnets

- `agents/citedy-lead-magnet.agent.json` — PDF checklists, swipe files, frameworks

### Social

- `agents/citedy-micro-post.agent.json` — create micro post
- `agents/citedy-publish.agent.json` — publish/schedule adaptation

### Integration

- `agents/citedy-webhook-register.agent.json` — webhook events
- `agents/citedy-product-upload.agent.json` — product knowledge base
- `agents/citedy-session-manager.agent.json` — recurring automation
- `agents/citedy-gap-to-publish.agent.json` — competitor gaps
- `agents/citedy-scout-to-publish.agent.json` — extended scout

## 2. Import

In AutoGPT Builder: **Import Agent** -> choose template file.

## 3. Run Inputs

- `API Key`: `citedy_agent_...`
- `Request JSON`: endpoint payload

Example for turbo template:

```json
{
  "topic": "AI content marketing trends 2026",
  "mode": "turbo",
  "enable_search": false,
  "language": "en"
}
```

Example for standard topic template:

```json
{
  "topic": "AI content marketing trends 2026",
  "size": "standard",
  "mode": "standard",
  "language": "en",
  "persona": "musk",
  "illustrations": false,
  "audio": false
}
```

Example for shorts script:

```json
{
  "topic": "AI personas let you write as Elon Musk",
  "duration": "short",
  "style": "hook",
  "language": "en"
}
```

## 4. Inspect Outputs

- Success path: `response`
- Validation/auth issues: `client_error`
- Backend failures: `server_error`
- Network/runtime issues: `error`

## 5. Production Workflows

### Article + Social

1. `citedy-topic-to-publish` or `citedy-url-to-publish`
2. Call `/api/agent/adapt` with the `article_id` from response
3. Call `/api/agent/publish` to push to connected platforms

### Trend -> Article

1. `citedy-scan` or `citedy-trend-to-publish`
2. Pick top trend from results
3. `citedy-topic-to-publish` with the trend as topic

### Shorts Pipeline

1. `citedy-shorts-script` -> get script text
2. `citedy-shorts-avatar` -> get avatar_url (show to user)
3. `citedy-shorts-video` -> generate video (poll for completion)
4. `citedy-shorts-merge` -> merge segments with subtitles

### Ingest -> Article

1. `citedy-ingest` -> submit URL, poll until completed
2. Use summary as input for `citedy-topic-to-publish`

## 6. Validate Package

```bash
node ./validate-templates.mjs
```

## 7. Pricing Quick Reference

| Operation                     | Credits     |
| ----------------------------- | ----------- |
| Turbo article                 | 2           |
| Turbo+ (with search)          | 4           |
| Standard mini                 | 15          |
| Standard standard             | 20          |
| Standard full                 | 33          |
| Standard pillar               | 48          |
| Scan (fast/deep/ultra/ultra+) | 2/4/6/8     |
| Social adaptation             | ~5/platform |
| Shorts script                 | 1           |
| Shorts avatar                 | 3           |
| Shorts video 5s/10s/15s       | 60/130/185  |
| Shorts merge                  | 5           |
| Content ingestion             | 1-55        |
| Lead magnet (text/images)     | 30/100      |
| Scout X (fast/ultimate)       | 35/70       |
| Scout Reddit                  | 30          |
| Competitor gaps               | 40          |

1 credit = $0.01 USD
