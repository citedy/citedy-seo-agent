# Changelog

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
