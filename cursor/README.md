# Citedy — AI SEO Content Autopilot for Cursor

Citedy connects Cursor to a full AI SEO platform via MCP, giving your AI assistant the ability to scout trending topics on X and Reddit, analyze competitors, generate SEO-optimized articles in 55 languages (with AI illustrations and voice-over), create social media adaptations for 9 platforms, publish to connected accounts, produce AI UGC viral video shorts with subtitles, ingest any URL or YouTube video into structured content, generate lead magnets, and run a fully automated content autopilot on a recurring schedule — all from inside your editor.

---

## Installation

### Option A — Cursor Marketplace

Search for **Citedy** in the Cursor Extensions marketplace and install directly.

### Option B — Manual Setup

1. Clone this repository or copy the files into your project.
2. Copy `mcp.json` to your Cursor MCP config location (typically `~/.cursor/mcp.json` or your project root).
3. Copy the `rules/` directory contents into your project's `.cursor/rules/` folder so Citedy tool guidance is available to the AI.

---

## Configuration

Set your Citedy API key as an environment variable before starting Cursor:

```bash
export CITEDY_API_KEY=your_api_key_here
```

Or add it to your shell profile (`~/.zshrc`, `~/.bashrc`) for persistence.

The MCP server URL is pre-configured in `mcp.json`:

```
https://mcp.citedy.com/mcp
```

---

## Get an API Key

**Option A — Dashboard**

1. Sign up or log in at [citedy.com](https://www.citedy.com)
2. Go to **Dashboard → Settings → API Keys**
3. Create a new key and copy it

**Option B — Agent Registration API**

```bash
curl -X POST https://www.citedy.com/api/agent/register \
  -H "Content-Type: application/json" \
  -d '{ "email": "you@example.com", "name": "My Cursor Agent" }'
```

The response includes your API key and initial credit balance.

---

## Documentation

- Full platform docs: [citedy.com](https://www.citedy.com)
- MCP tool reference: [citedy.com/tools/mcp](https://www.citedy.com/tools/mcp)

## Repository

[github.com/Citedy/citedy-seo-agent](https://github.com/Citedy/citedy-seo-agent)
