# Changelog

## 3.0.0 - 2026-02-28

### Added

- 12 new importable templates (19 total):
  - `citedy-turbo-article` — ultra-cheap turbo article (2-4 credits)
  - `citedy-scan` — fast multi-source trend scan (2-8 credits)
  - `citedy-micro-post` — micro social post creation
  - `citedy-publish` — publish/schedule social adaptations
  - `citedy-ingest` — content ingestion (YouTube, article, PDF, audio)
  - `citedy-lead-magnet` — PDF lead magnet generation (30-100 credits)
  - `citedy-shorts-script` — speech script for shorts (1 credit)
  - `citedy-shorts-avatar` — AI avatar image (3 credits)
  - `citedy-shorts-video` — AI UGC viral video segment (60-185 credits)
  - `citedy-shorts-merge` — merge segments with subtitles (5 credits)
  - `citedy-webhook-register` — register webhook endpoint
  - `citedy-product-upload` — upload product knowledge (1 credit)
- `actions.json` expanded from 11 to 48 endpoint definitions with cost info
- All endpoints now include `cost` field for credit pricing
- New action categories: scan, post, publish, settings, schedule, image-style, personas, products, ingest, lead-magnets, shorts, webhooks, rotate-key, health

### Changed

- Bumped version to 3.0.0 in `actions.json` and `manifest.json`
- Updated `citedy-topic-to-publish` default payload: added `mode`, `persona`, `disable_competition` fields, changed default size from `mini` to `standard`
- Updated `citedy-url-to-publish` default payload: same field additions
- Updated `README.md` and `QUICKSTART.md` with all 19 templates and pricing reference
- Updated `agents/README.md` with full template listing

### Compatibility

- Existing 7 templates remain compatible (additive field changes only)
- API contracts unchanged — new templates call new v3.0.0 endpoints

## 1.0.0 - 2026-02-14

### Added

- Rebuilt AutoGPT integration package from scratch under `autogpt/`.
- Added 7 importable templates:
  - `citedy-topic-to-publish`
  - `citedy-url-to-publish`
  - `citedy-trend-to-publish`
  - `citedy-reddit-to-publish`
  - `citedy-gap-to-publish`
  - `citedy-session-manager`
  - `citedy-scout-to-publish`
- Added `actions.json` with endpoint/action reference and template index.
- Added `validate-templates.mjs` for static graph integrity checks.
- Added AutoGPT docs: `README.md`, `QUICKSTART.md`, `agents/README.md`.
- Added release draft text: `GITHUB_RELEASE_v1.0.0.md`.

### Changed

- Updated `SKILL.md` frontmatter with required `name` for TinyClaw-friendly skill metadata.
- Updated public package README with TinyClaw install and AutoGPT quickstart.

### Compatibility

- Existing Citedy API functionality unchanged.
- Existing skill workflow unchanged.
- New assets are additive and isolated to package/docs/templates.
