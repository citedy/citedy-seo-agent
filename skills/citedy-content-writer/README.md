# citedy-content-writer

> End-to-end blog autopilot — from topic to published, multi-platform content campaign in one conversation, in 55 languages.

## What It Does

Covers the entire content production pipeline: research from URLs or topics, generate SEO- and GEO-optimized articles (4 size presets, 55 languages, 25 writing personas), enhance with AI illustrations and voice-over, adapt for 9 social platforms (X, LinkedIn, Facebook, Reddit, Threads, Instagram, Instagram Reels, YouTube Shorts, Shopify), and set up cron-based autopilot sessions for hands-free publishing. Includes a product knowledge base so the AI references your real product data during generation.

## Install

### Claude Code
```
/plugin → citedy/claude-plugins → install citedy-content-writer
```

### OpenAI Codex CLI
```bash
git clone https://github.com/Citedy/citedy-seo-agent.git ~/.agents/skills/citedy-content-writer
```

### Universal (openskills)
```bash
npx openskills install Citedy/citedy-content-writer
```

## Quick Start

1. **Get an API key** at [citedy.com/dashboard/settings](https://www.citedy.com/dashboard/settings)

2. **Generate an article** from a topic:
   ```
   POST https://www.citedy.com/api/agent/autopilot
   Authorization: Bearer $CITEDY_API_KEY
   { "topic": "How to reduce churn in B2B SaaS", "size": "standard", "language": "en" }
   ```

3. **Poll for completion** (every 10s):
   ```
   GET https://www.citedy.com/api/agent/status/{article_id}
   ```

4. **Create social adaptations** (up to 3 platforms per call):
   ```
   POST https://www.citedy.com/api/agent/adapt
   { "article_id": "art_xxxx", "platforms": ["linkedin", "x_thread", "reddit"] }
   ```

5. **Set up autopilot** for daily publishing:
   ```
   POST https://www.citedy.com/api/agent/session
   { "categories": ["SaaS", "productivity"], "interval_minutes": 1440, "article_size": "standard" }
   ```

## Pricing

### Article Generation

| Size | Credits | Description |
|---|---|---|
| Turbo | 2 credits | Fast, no web search |
| Turbo+ | 4 credits | Fast + web intelligence |
| Mini | 15 credits | ~500 words |
| Standard | 20 credits | ~1,000 words |
| Full | 33 credits | ~2,000 words |
| Pillar | 48 credits | ~4,000 words |

### Extensions

| Extension | Credits |
|---|---|
| +Web intelligence | +8 credits |
| +AI illustrations | +9–36 credits |
| +Voice-over audio | +10–55 credits |
| Social adaptation | ~5 credits/platform |

1 credit = $0.01 USD

Top up at [citedy.com/dashboard/billing](https://www.citedy.com/dashboard/billing)

## Part of Citedy SEO Agent

This is a focused skill from the [Citedy SEO Agent](../citedy-seo-agent/) full suite. Install the full suite for articles, social media, video shorts, trend scouting, lead magnets, content ingestion, and more.

---

_[citedy.com](https://www.citedy.com)_
