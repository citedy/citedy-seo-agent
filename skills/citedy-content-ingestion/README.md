# citedy-content-ingestion

> Turn any URL into structured content — YouTube videos, web articles, PDFs, and audio files — ready for any LLM pipeline.

## What It Does

Submit a URL and get back clean structured content: full transcript, summary, metadata, and word count. YouTube ingestion uses the Gemini Video API for deep video understanding beyond auto-generated captions — capturing speaker intent, visual context, and chapter structure. Use as a standalone input node for summarization, Q&A, article generation, or knowledge base indexing. Batch up to 20 URLs in one call.

## Install

### Claude Code

```
/plugin → citedy/claude-plugins → install citedy-content-ingestion
```

### OpenAI Codex CLI

```bash
git clone https://github.com/citedy/ingest.git ~/.agents/skills/citedy-content-ingestion
```

### Universal (openskills)

```bash
npx openskills install citedy/ingest
```

## Quick Start

1. **Register** and get an API key:

   ```
   POST https://www.citedy.com/api/agent/register
   { "agent_name": "My Agent", "contact_email": "you@example.com" }
   ```

2. **Submit a URL** for ingestion:

   ```
   POST https://www.citedy.com/api/agent/ingest
   Authorization: Bearer $CITEDY_API_KEY
   { "url": "https://www.youtube.com/watch?v=example" }
   ```

   Returns `{ "id": "job_abc123", "status": "processing" }`

3. **Poll for completion** (every 5–15s, free):

   ```
   GET https://www.citedy.com/api/agent/ingest/job_abc123
   ```

4. **Retrieve content** (free):
   ```
   GET https://www.citedy.com/api/agent/ingest/job_abc123/content
   ```
   Returns transcript, summary, metadata, word count.

## Pricing

| Content Type         | Duration / Size | Credits    |
| -------------------- | --------------- | ---------- |
| Web article          | any             | 1 credits  |
| PDF document         | any             | 2 credits  |
| YouTube video        | < 10 min        | 5 credits  |
| YouTube video        | 10–30 min       | 15 credits |
| YouTube video        | 30–60 min       | 30 credits |
| YouTube video        | 60–120 min      | 55 credits |
| Audio file           | < 10 min        | 3 credits  |
| Audio file           | 10–30 min       | 8 credits  |
| Audio file           | 30–60 min       | 15 credits |
| Audio file           | 60+ min         | 30 credits |
| Cache hit (any type) | —               | 1 credits  |

1 credit = $0.01 USD. Failed jobs are not charged.

Top up at [citedy.com/dashboard/billing](https://www.citedy.com/dashboard/billing)

## Part of Citedy SEO Agent

This is a focused skill from the [Citedy SEO Agent](../citedy-seo-agent/) full suite. Install the full suite for articles, social media, video shorts, trend scouting, lead magnets, content ingestion, and more.

---

_[citedy.com](https://www.citedy.com)_
