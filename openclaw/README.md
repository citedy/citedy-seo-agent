# Citedy SEO Agent for OpenClaw

This directory contains the OpenClaw-compatible Agent Skill definition and a CLI registration helper.

## Contents

- `SKILL.md` — Agent Skill with extended OpenClaw metadata (tags, env requirements, privacy policy)
- `scripts/register.mjs` — CLI registration script (Node.js 18+)

## Install

### Via OpenClaw / ClawhubAI marketplace

Import `SKILL.md` as an Agent Skill from this repository.

### Manual

Copy `SKILL.md` into your agent's skills directory and configure `CITEDY_API_KEY` environment variable.

## Register via CLI

```bash
node scripts/register.mjs [agent_name]
```

The script calls `POST /api/agent/register` and prints the approval URL. If `agent_name` is omitted, it defaults to `agent-<hostname>`.

After approving, copy the API key and set it as `CITEDY_API_KEY`.
