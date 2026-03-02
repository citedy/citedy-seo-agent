# citedy-lead-magnets

> Generate AI-powered checklists, swipe files, and frameworks that convert visitors into subscribers — as a downloadable PDF with optional AI illustrations.

## What It Does

Produces ready-to-publish PDF lead magnets in minutes. Choose from three types: checklists (step-by-step action items), swipe files (curated templates and scripts), or frameworks (structured methodologies). Each lead magnet gets a hosted lead capture page where visitors enter their email to download the PDF. No other MCP or skill store offers lead magnet generation — this is a unique capability powered exclusively by Citedy.

## Install

### Claude Code
```
/plugin → citedy/claude-plugins → install citedy-lead-magnets
```

### OpenAI Codex CLI
```bash
git clone https://github.com/Citedy/citedy-seo-agent.git ~/.agents/skills/citedy-lead-magnets
```

### Universal (openskills)
```bash
npx openskills install Citedy/citedy-lead-magnets
```

## Quick Start

1. **Get an API key** at [citedy.com/dashboard/settings](https://www.citedy.com/dashboard/settings)

2. **Generate lead magnet** (async, poll every 5s):
   ```
   POST https://www.citedy.com/api/agent/lead-magnets
   Authorization: Bearer $CITEDY_API_KEY
   {
     "topic": "SEO audit for small businesses",
     "type": "checklist",
     "niche": "digital marketing",
     "language": "en"
   }
   ```

3. **Poll until ready** (`status: "draft"`):
   ```
   GET https://www.citedy.com/api/agent/lead-magnets/{id}
   ```
   Returns `pdf_url` and `preview_url`.

4. **Publish** to get a lead capture page:
   ```
   PATCH https://www.citedy.com/api/agent/lead-magnets/{id}
   { "status": "published" }
   ```
   Returns `public_url` — share this link to capture emails.

## Pricing

| Type | Credits | USD |
|---|---|---|
| Text-only lead magnet | 30 cr | $0.30 |
| Lead magnet with AI illustrations | 100 cr | $1.00 |
| Poll / publish / update | 0 cr | Free |

1 credit = $0.01 USD

Top up at [citedy.com/dashboard/billing](https://www.citedy.com/dashboard/billing)

## Part of Citedy SEO Agent

This is a focused skill from the [Citedy SEO Agent](../citedy-seo-agent/) full suite. Install the full suite for articles, social media, video shorts, trend scouting, lead magnets, content ingestion, and more.

---

_[citedy.com](https://www.citedy.com)_
