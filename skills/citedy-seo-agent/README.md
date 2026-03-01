# citedy-seo-agent

> Full-stack AI marketing toolkit — trend scouting, competitor analysis, SEO articles in 55 languages, social distribution, AI avatar videos, lead magnets, content ingestion, and fully automated autopilot.

## What It Does

The Citedy SEO Agent is the complete content marketing suite in a single skill. It covers every stage of the content workflow: discover trending topics on X/Twitter and Reddit, deep-analyze competitors and find content gaps, generate SEO- and GEO-optimized articles with AI illustrations and voice-over in 55 languages, adapt content for 9 social platforms, create short-form AI avatar videos for TikTok and Reels, generate PDF lead magnets (checklists, swipe files, frameworks), ingest YouTube videos and PDFs into structured content, and run fully automated cron-based publishing sessions.

## Install

### Claude Code
```
/plugin → citedy/claude-plugins → install citedy-seo-agent
```

### OpenAI Codex CLI
```bash
# User-global (available in all projects)
git clone https://github.com/Citedy/citedy-seo-agent.git ~/.agents/skills/citedy-seo-agent

# Or project-level
git clone https://github.com/Citedy/citedy-seo-agent.git .agents/skills/citedy-seo-agent
```

### Universal (openskills)
```bash
npx openskills install Citedy/citedy-seo-agent
```

## Quick Start

1. **Register** your agent (one-time setup):
   ```
   POST https://www.citedy.com/api/agent/register
   { "email": "you@example.com", "name": "My Agent" }
   ```
   Open the approval link in your email, then save the returned `api_key` as `CITEDY_API_KEY`.

2. **Verify connection**:
   ```
   GET https://www.citedy.com/api/agent/health
   Authorization: Bearer $CITEDY_API_KEY
   ```

3. **Scout trending topics** on X:
   ```
   POST https://www.citedy.com/api/agent/scout/x
   { "query": "your niche", "mode": "fast" }
   ```

4. **Generate an article** from a topic:
   ```
   POST https://www.citedy.com/api/agent/autopilot
   { "topic": "...", "size": "standard", "language": "en" }
   ```

## Full Capabilities

| Feature | Credits |
|---|---|
| Scout X — fast / ultimate | 35 / 70 cr |
| Scout Reddit | 30 cr |
| Content gap analysis | 40 cr |
| Competitor discovery | 20 cr |
| Competitor deep-scan | 25–50 cr |
| Turbo article | 2–4 cr |
| Mini article (~500w) | 15 cr |
| Standard article (~1,000w) | 20 cr |
| Full article (~2,000w) | 33 cr |
| Pillar article (~4,000w) | 48 cr |
| +Web intelligence | +8 cr |
| +AI illustrations | +9–36 cr |
| +Voice-over audio | +10–55 cr |
| Social adaptation | ~5 cr/platform |
| AI avatar video (5s/10s/15s) | 64–194 cr |
| Content ingestion (web/PDF/audio) | 1–30 cr |
| Content ingestion (YouTube) | 5–55 cr |
| Lead magnet (text-only) | 30 cr |
| Lead magnet (with images) | 100 cr |

1 credit = $0.01 USD. New accounts get **100 free credits** — no credit card required.

Top up at [citedy.com/dashboard/billing](https://www.citedy.com/dashboard/billing)

## Focused Skills

Looking for a specific capability? Each focused skill is a standalone entry point:

| Skill | What It Does |
|---|---|
| [citedy-video-shorts](../citedy-video-shorts/) | AI avatar video with subtitles for TikTok/Reels/Shorts |
| [citedy-content-ingestion](../citedy-content-ingestion/) | Turn any URL into structured content (YouTube, PDF, audio) |
| [citedy-trend-scout](../citedy-trend-scout/) | Scout X/Reddit trends + content gaps + competitors |
| [citedy-lead-magnets](../citedy-lead-magnets/) | Generate checklists, swipe files, frameworks |
| [citedy-content-writer](../citedy-content-writer/) | End-to-end blog autopilot with social distribution |

## Compatible Platforms

- Claude Code — `/plugin` → `citedy/claude-plugins` → install `citedy-seo-agent`
- OpenAI Codex CLI — `git clone` into `~/.agents/skills/`
- Factory Droid — `git clone` into `~/.factory/skills/`
- TinyClaw — see [TINYCLAW.md](../../TINYCLAW.md)
- AutoGPT — import templates from `../../autogpt/agents/*.agent.json`
- Any [Agent Skills](https://github.com/topics/agent-skills)-compatible platform

---

_[citedy.com](https://www.citedy.com)_
