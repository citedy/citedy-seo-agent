# citedy-video-shorts

Generate viral UGC shorts for your own social channels.

Turn a topic, product angle, or campaign idea into a finished vertical talking-head short with script, avatar, rendering, subtitles, and optional publishing.

This package is built to feel like a producer, not a raw API manual.

## What It Does

`citedy-video-shorts` helps an agent turn requests like:

- "Create a 10-second UGC short about our product"
- "Use my usual founder avatar and make 3 variants"
- "Generate a Reel for this feature"
- "Make a YouTube Short and publish it"

into a working production flow:

1. generate a short script
2. generate or reuse an avatar
3. render the video
4. apply subtitles
5. optionally publish to Instagram Reels or YouTube Shorts

## Why It's Different

Most video tools stop at "generate a clip".

`citedy-video-shorts` is built for agent workflows:

- MCP-first orchestration when available
- REST fallback for older setups
- reusable brand and avatar memory
- anti-repetition memory through lightweight run history
- built on Citedy's production shorts pipeline

## Install

### OpenSkills

```bash
npx @smithery/cli@latest skill add citedy/shorts
```

### Codex / local agent setup

```bash
git clone https://github.com/citedy/shorts.git ~/.agents/skills/citedy-video-shorts
```

## Get Your Agent API Key

This skill uses a Citedy Agent API key that looks like:

```text
citedy_agent_...
```

Set it as:

```bash
export CITEDY_API_KEY=citedy_agent_your_key_here
```

### Option A - Dashboard

1. Sign in at [citedy.com](https://www.citedy.com)
2. Open **Settings -> Team & API**
3. Create or copy your Agent API key
4. Export it as `CITEDY_API_KEY`

### Option B - Register via API

```bash
curl -sS -X POST "https://www.citedy.com/api/agent/register" \
  -H "Content-Type: application/json" \
  -d '{"agent_name":"My Agent"}'
```

Then:

1. open the returned `approval_url`
2. approve the agent
3. copy the issued `citedy_agent_...` key
4. export it as `CITEDY_API_KEY`

### Sanity Check

```bash
curl -sS "https://www.citedy.com/api/agent/health" \
  -H "Authorization: Bearer $CITEDY_API_KEY"
```

## Pricing

| Step | Credits | USD |
|---|---:|---:|
| Script generation | 1 | $0.01 |
| Avatar generation | 3 | $0.03 |
| Video generation (5s) | 60 | $0.60 |
| Video generation (10s) | 130 | $1.30 |
| Video generation (15s) | 185 | $1.85 |
| Merge + subtitles | 5 | $0.05 |
| Publish to Instagram Reels | 0 | $0.00 |
| Publish to YouTube Shorts | 0 | $0.00 |

Current end-to-end totals:

| Output | Credits | USD |
|---|---:|---:|
| Full 10s short | 139 | $1.39 |
| Full 15s short | 194 | $1.94 |

Notes:

- Publishing is currently free for both Instagram Reels and YouTube Shorts.
- Instagram publishing is temporarily set to `0` credits and may change later.
- `1 credit = $0.01 USD`

Top up at [citedy.com/dashboard/billing](https://www.citedy.com/dashboard/billing).

## Quick Start

Tell the agent the outcome you want, not the pipeline steps.

Examples:

- "Create a 10-second UGC short about our AI SEO agent"
- "Use my founder avatar and make 3 short variants"
- "Generate a short and publish it to Instagram"
- "Make a YouTube Short from this angle"

If auth is already configured, the skill should proceed directly.

If auth is missing, use the Agent API key flow above.

## Execution Model

### Preferred Path

Use Citedy MCP tools when available:

- `shorts.script`
- `shorts.avatar`
- `shorts.generate`
- `shorts.get`
- `shorts.merge`
- `shorts.publish`

### Fallback Path

If MCP is unavailable, the skill still works through Citedy's REST API.

That keeps older agent setups and direct API-oriented workflows working.

## Persistent Memory

The package includes lightweight operational memory:

- `state/UGC-BRAND.md`
- `state/UGC-AVATAR.md`
- `state/ugc-video-log.jsonl`

These files help the skill:

- keep brand tone stable
- reuse the right avatar identity
- avoid repeating the same hook/avatar combination too often

## Defaults

Unless the user says otherwise, the package assumes:

- duration: `10`
- style: `hook`
- language: `en`
- aspect ratio: `9:16`
- resolution: `480p`
- publish: `false`

## Package Contents

```text
citedy-video-shorts/
├── SKILL.md
├── README.md
├── references/
│   ├── avatar-selection.md
│   ├── orchestration-rules.md
│   ├── prompt-styles.md
│   ├── publishing-playbooks.md
│   ├── transport-selection.md
│   └── troubleshooting.md
├── state/
│   ├── UGC-BRAND.md
│   ├── UGC-AVATAR.md
│   └── ugc-video-log.jsonl
└── scripts/
    └── self-test.sh
```

## Publishing Requirements

Publishing requires connected social accounts.

Connect accounts in your Citedy dashboard before using publish flows:

- Instagram Reels
- YouTube Shorts

If no accounts are connected, the skill can still generate videos and return downloadable assets.

## Validation

Run the package self-check:

```bash
bash scripts/self-test.sh
```

## Compatibility

This package intentionally preserves the existing public surface:

- same skill name: `citedy-video-shorts`
- same production backend contracts
- same ability to run through direct REST if needed

What changed is the packaging and orchestration quality.

## Notes

This public package is intentionally self-contained.

It should not depend on private local skills, workstation-specific paths, or internal-only documentation links.
