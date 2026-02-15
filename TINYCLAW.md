# TinyClaw Install Guide

This guide explains how to install `citedy-seo-agent` into [TinyClaw](https://github.com/jlia0/tinyclaw).

## Compatibility

- TinyClaw reads skills from the TinyClaw install root:
  - preferred: `.agent/skills`
  - fallback (legacy): `.agents/skills`
- A skill directory must contain `SKILL.md`.

## 1. Locate TinyClaw Root

Default install root is usually:

```bash
~/tinyclaw
```

If your TinyClaw is installed elsewhere, use that path as `TINYCLAW_ROOT`.

## 2. Install `citedy-seo-agent` Skill

From this repository root:

```bash
TINYCLAW_ROOT="${TINYCLAW_ROOT:-$HOME/tinyclaw}"

mkdir -p "$TINYCLAW_ROOT/.agent/skills/citedy-seo-agent"
cp ./citedy-seo-agent/SKILL.md "$TINYCLAW_ROOT/.agent/skills/citedy-seo-agent/SKILL.md"
```

Optional legacy mirror for older TinyClaw setups:

```bash
mkdir -p "$TINYCLAW_ROOT/.agents/skills/citedy-seo-agent"
cp ./citedy-seo-agent/SKILL.md "$TINYCLAW_ROOT/.agents/skills/citedy-seo-agent/SKILL.md"
```

## 3. Restart TinyClaw

```bash
tinyclaw restart
```

## 4. Verify

```bash
ls -la "$TINYCLAW_ROOT/.agent/skills/citedy-seo-agent"
```

Expected output includes:

- `SKILL.md`

## Troubleshooting

- If TinyClaw does not see the skill, confirm your TinyClaw root path and re-run copy command.
- If your installation uses only legacy paths, use `.agents/skills/citedy-seo-agent`.
