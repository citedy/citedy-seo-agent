# Prompt Styles

## Canonical Source

For avatar-image prompts, the source of truth is:

- the Citedy avatar generation service implementation

Use this service-backed source to stay grounded in what Citedy already ships and tests.

## Goal

Keep prompts compact, visual, and coherent.

## Base Formula

Build prompts from:

- subject
- framing
- environment
- motion
- tone
- audio constraint

For avatar-image generation specifically, the canonical shape is:

- `Vertical 9:16`
- candid close-up selfie
- person identity block: origin + gender + type + representative age + service-backed appearance details such as clean skin, light natural makeup, neat facial hair, or messy hoodie styling
- direct-to-camera speaking moment
- iPhone front camera / wide-angle distortion
- chest-up framing, face centered
- background from canonical location mapping
- underexposed / low contrast / muted color / subtle film grain / visible skin pores
- strict negatives: no phone UI, no text overlays, no app interfaces, no timestamps

## Default Style

For most product UGC:

- medium close-up
- front-facing talking head
- stable camera
- one coherent location
- minimal motion
- no background music

## Good Patterns

- founder testimonial
- direct recommendation
- curiosity hook
- before/after claim with believable specificity
- tutorial tease

## Service-Aligned Visual Defaults

These defaults align tightly with the avatar service and should be preferred:

- selfie realism over polished ad photography
- one clear background instead of stacked visual ideas
- slight imperfection over sterile beauty-render look
- muted colors over saturated cinematic grading
- "mid-sentence directly to camera" energy for still avatar images

## Location Playbook

Use these pairings when selecting scene energy:

- `coffee_shop` + `tech_founder`: approachable SaaS founder recommendation
- `dev_cave` + `vibe_coder`: hacker / AI builder / indie dev
- `glass_office` + `executive`: polished enterprise angle
- `street` + `student` or `vibe_coder`: social-first casual discovery
- `podcast_studio` + `executive` or `tech_founder`: authority and commentary
- `home_office` + `tech_founder`: practical maker / remote business tone
- `car` + direct hot take hook: confessional UGC energy
- `park` + calmer educational hook: reflective or wellness-adjacent content

## Agent Rule

When you need avatar examples or location semantics, prefer the service-backed mappings over freeform invention.

The more the skill matches the generation service's own prompt assembly model, the more predictable the outputs will be.

## Avoid

- multi-scene chaos
- vague cinematic filler
- contradictory camera directions
- long paragraphs of style adjectives with no visual priority
