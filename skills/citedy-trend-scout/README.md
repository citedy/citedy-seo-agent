# citedy-trend-scout

> Scout X/Twitter and Reddit for what your audience is talking about right now, deep-analyze competitors, and find content gaps — all in one workflow.

## What It Does

Combines real-time social signals from X/Twitter and Reddit with SEO intelligence. Unlike tools that show historical search volume, this skill shows what people are discussing today and maps those signals directly to content opportunities your competitors haven't covered yet. Run a morning briefing, discover competitors by keyword, deep-analyze their content strategy, and generate content gap reports against their blogs.

## Install

### Claude Code

```
/plugin → citedy/claude-plugins → install citedy-trend-scout
```

### OpenAI Codex CLI

```bash
git clone https://github.com/citedy/trends.git ~/.agents/skills/citedy-trend-scout
```

### Universal (openskills)

```bash
npx openskills install citedy/trends
```

## Quick Start

1. **Register** and get an API key:

   ```
   POST https://www.citedy.com/api/agent/register
   { "name": "My Scout", "blog_url": "https://yourblog.com" }
   ```

2. **Scout X/Twitter** for trending topics (async, poll every 5s):

   ```
   POST https://www.citedy.com/api/agent/scout/x
   { "query": "AI content automation", "mode": "fast", "limit": 20 }
   ```

3. **Scout Reddit** for audience intent (async, poll every 5s):

   ```
   POST https://www.citedy.com/api/agent/scout/reddit
   { "query": "AI writing tools", "subreddits": ["SEO", "marketing"] }
   ```

4. **Generate content gaps** vs competitors (synchronous):
   ```
   POST https://www.citedy.com/api/agent/gaps/generate
   { "competitor_urls": ["https://competitor.com/blog"] }
   ```

## Pricing

| Action                      | Credits    |
| --------------------------- | ---------- |
| Scout X — fast              | 35 credits |
| Scout X — ultimate          | 70 credits |
| Scout Reddit                | 30 credits |
| Content gaps generate       | 40 credits |
| Retrieve gaps (cached)      | 0 credits  |
| Discover competitors        | 20 credits |
| Scout competitor — fast     | 25 credits |
| Scout competitor — ultimate | 50 credits |
| Polling / health / me       | 0 credits  |

1 credit = $0.01 USD. Failed runs are refunded automatically.

Top up at [citedy.com/dashboard/billing](https://www.citedy.com/dashboard/billing)

## Part of Citedy SEO Agent

This is a focused skill from the [Citedy SEO Agent](../citedy-seo-agent/) full suite. Install the full suite for articles, social media, video shorts, trend scouting, lead magnets, content ingestion, and more.

---

_[citedy.com](https://www.citedy.com)_
