# citedy-video-shorts

> Generate branded AI avatar lip-sync video shorts for TikTok, Reels, and YouTube Shorts — script to final video with subtitles for $1.39–$1.94.

## What It Does

Turn any topic or product description into a professional 5–15 second talking-head video. The skill generates a speech script, creates a custom AI avatar, renders the lip-sync video, and burns in subtitles — all in one automated pipeline. No other MCP skill or agent tool offers end-to-end branded avatar video generation with full pipeline control.

## Install

### Claude Code
```
/plugin → citedy/claude-plugins → install citedy-video-shorts
```

### OpenAI Codex CLI
```bash
git clone https://github.com/Citedy/citedy-seo-agent.git ~/.agents/skills/citedy-video-shorts
```

### Universal (openskills)
```bash
npx openskills install Citedy/citedy-video-shorts
```

## Quick Start

1. **Register** your agent and get an API key:
   ```
   POST https://www.citedy.com/api/agent/register
   { "email": "you@example.com", "name": "My Agent" }
   ```

2. **Generate script** (1 credit):
   ```
   POST https://www.citedy.com/api/agent/shorts/script
   { "topic": "Why you need daily skincare", "duration": "short", "style": "hook" }
   ```

3. **Generate avatar** (3 credits):
   ```
   POST https://www.citedy.com/api/agent/shorts/avatar
   { "gender": "female", "type": "professional", "location": "office" }
   ```

4. **Generate video** (60–185 credits, async — poll every 8s):
   ```
   POST https://www.citedy.com/api/agent/shorts
   { "prompt": "...", "avatar_url": "...", "duration": 10, "speech_text": "..." }
   ```

5. **Merge + subtitles** (5 credits):
   ```
   POST https://www.citedy.com/api/agent/shorts/merge
   { "video_urls": ["..."], "phrases": ["..."] }
   ```

## Pricing

| Step | Duration | Credits | USD |
|---|---|---|---|
| Script generation | any | 1 cr | $0.01 |
| Avatar generation | — | 3 cr | $0.03 |
| Video generation | 5s | 60 cr | $0.60 |
| Video generation | 10s | 130 cr | $1.30 |
| Video generation | 15s | 185 cr | $1.85 |
| Merge + subtitles | — | 5 cr | $0.05 |
| **Full 10s video** | **10s** | **139 cr** | **$1.39** |
| **Full 15s video** | **15s** | **194 cr** | **$1.94** |

1 credit = $0.01 USD

Top up at [citedy.com/dashboard/billing](https://www.citedy.com/dashboard/billing)

## Part of Citedy SEO Agent

This is a focused skill from the [Citedy SEO Agent](../citedy-seo-agent/) full suite. Install the full suite for articles, social media, video shorts, trend scouting, lead magnets, content ingestion, and more.

---

_[citedy.com](https://www.citedy.com)_
