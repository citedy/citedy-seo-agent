# Publishing Playbooks

## Publish Only On Clear Intent

Only publish when the user explicitly requests publishing or the request clearly includes it.

## Availability First

Before offering publish, check whether a supported social account is already connected in `Settings -> Integrations`.

If a connected account exists:

- the skill may offer auto-publish
- the skill may confirm that publishing is available after render

If no connected account exists:

- do not promise publishing
- return the finished video
- tell the user to connect a social account in `Settings -> Integrations`

## Current UX Rule

Do not ask the user to choose among multiple platforms.

Ask:

- **"Do you want video only, or auto-publish if your connected social account is available?"**

## General Rules

- keep confirmation concise
- report whether auto-publish happened
- do not over-explain metadata generation
- if publish is unavailable, fall back cleanly to video-only delivery
