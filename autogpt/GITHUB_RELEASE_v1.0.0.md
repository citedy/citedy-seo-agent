# Release v1.0.0 - Citedy SEO Agent AutoGPT + TinyClaw Support

## Why this release

This release restores and ships a complete integration package so AutoGPT and TinyClaw owners can start with Citedy API quickly, without changing the existing Citedy backend functionality.

## Included

- TinyClaw-ready `SKILL.md` metadata (`name` in frontmatter)
- AutoGPT templates in `autogpt/agents/`:
  - `citedy-topic-to-publish.agent.json`
  - `citedy-url-to-publish.agent.json`
  - `citedy-trend-to-publish.agent.json`
  - `citedy-reddit-to-publish.agent.json`
  - `citedy-gap-to-publish.agent.json`
  - `citedy-session-manager.agent.json`
  - `citedy-scout-to-publish.agent.json`
- Action/reference catalog: `autogpt/actions.json`
- Operator docs:
  - `autogpt/README.md`
  - `autogpt/QUICKSTART.md`
  - `autogpt/agents/README.md`
- Validation tool:
  - `autogpt/validate-templates.mjs`

## Quick start for AutoGPT owners

1. Import any template from `autogpt/agents/*.agent.json`.
2. Run with:

- `API Key` = `citedy_agent_...`
- `Request JSON` = endpoint payload

3. Read outputs: `response`, `client_error`, `server_error`, `error`.

## Quick start for TinyClaw owners

1. Copy skill file to TinyClaw install skills directory:

```bash
mkdir -p ~/tinyclaw/.agents/skills/citedy-seo-agent
cp /absolute/path/to/citedy-seo-agent/SKILL.md ~/tinyclaw/.agents/skills/citedy-seo-agent/SKILL.md
```

2. Restart TinyClaw:

```bash
tinyclaw restart
```

## Notes

- This release is additive and does not modify Citedy API contracts.
- For async endpoints (`scout`, `ingest`, `shorts`, `leadmagnet`, `brand.scan`), use status polling endpoints from `actions.json`.
