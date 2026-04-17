# Avatar Selection

## Canonical Source

The source of truth for avatar semantics is:

- the Citedy avatar generation service implementation

This file defines:

- allowed avatar enums
- location background meanings
- beauty params by gender/type
- the final prompt composition strategy

Do not invent conflicting avatar meanings in the skill layer.

## Goal

Pick avatars that feel consistent with brand intent without repeating the same recipe forever.

## Allowed Types

Use only these canonical values:

- `gender`: `male` | `female`
- `origin`: `european` | `asian` | `african` | `latin` | `middle_eastern` | `south_asian`
- `age_range`: `18-25` | `26-35` | `36-50`
- `type`: `tech_founder` | `vibe_coder` | `student` | `executive`
- `location`: `coffee_shop` | `dev_cave` | `street` | `car` | `home_office` | `podcast_studio` | `glass_office` | `rooftop` | `bedroom` | `park` | `gym`

## Location Meanings

These are the intended backgrounds and lighting semantics from the generation service.

### `coffee_shop`

- background: blurred coffee shop interior, warm Edison bulbs bokeh, exposed brick
- lighting: warm indoor lighting

### `dev_cave`

- background: dark bedroom, LED strip light glowing blue/purple, MacBook Pro on desk, monitor with code visible
- lighting: one side lit by window, other by monitor glow, slightly underexposed, muted cool tones

### `street`

- background: urban city street, parked cars, brick buildings, trees
- lighting: natural daylight, overcast

### `car`

- background: driver seat, steering wheel, parking lot
- lighting: harsh natural light from window

### `home_office`

- background: bookshelf, monitor with code, cozy desk, coffee mug, messy cables
- lighting: warm indoor lighting

### `podcast_studio`

- background: wooden desk, condenser mic, neon sign, wooden panels
- lighting: warm moody

### `glass_office`

- background: floor-to-ceiling glass windows, city view, standing desks, whiteboards
- lighting: natural daylight

### `rooftop`

- background: concrete railing, blurred buildings, overcast sky
- lighting: late afternoon flat light

### `bedroom`

- background: fairy string lights, books, bed with blankets, houseplants
- lighting: warm tones

### `park`

- background: green park path, trees, early morning sun, dappled light, benches
- lighting: early morning golden light

### `gym`

- background: gym mirror, weight rack
- lighting: harsh fluorescent

## Type-to-Look Heuristics

The service already encodes appearance defaults.

### Female

- `vibe_coder`: clean skin, natural beauty, no makeup, messy hair or ponytail, plain oversized hoodie, no logos, no text, AirPods in ears
- other types: attractive, well-groomed, natural beauty, symmetrical features, light natural makeup

### Male

- `vibe_coder`: clean skin, no acne, naturally good-looking but zero effort styling, messy hair, plain black hoodie, no logos, no text, no stickers, AirPods in ears
- other types: well-groomed, clean skin, neat facial hair, sharp jawline, confident attractive look

## Prompt Assembly Model

The service builds avatar prompts around this shape:

- vertical 9:16 candid close-up selfie
- origin + gender + type + representative age
- beauty/type-specific description
- talking mid-sentence directly to camera with natural hand gesture
- iPhone front camera, wide-angle distortion
- chest-up framing, face centered
- location-specific background
- slightly underexposed, low contrast, muted colors, location lighting, subtle film grain
- visible skin pores
- no UI, no text overlays, no app interfaces, no timestamps
- real raw iPhone selfie quality

## Reuse Policy

If `state/UGC-AVATAR.md` contains a strong prior recipe and the user did not ask for a new identity, reuse it.

## Variation Policy

If recent runs are too repetitive:

- keep the same general persona
- vary only one or two dimensions
- preserve recognizability where possible

Recommended dimensions to vary:

- location
- wardrobe vibe
- age band

Avoid random full resets unless the user explicitly wants a different face.

## Default Persona Heuristic

When no state exists:

- B2B / SaaS / founder products: `tech_founder`
- casual consumer products: `student` or `tech_founder`, depending on credibility needed
- engineering tools: `tech_founder` or `vibe_coder`, depending on tone

## Location Selection Heuristics

- `coffee_shop`: default for broad UGC / founder / approachable B2B
- `dev_cave`: best fit for hacker, AI, coding, indie-builder tone
- `street`: broad lifestyle / creator recommendation energy
- `car`: confession, hot take, candid founder energy
- `home_office`: work-from-home SaaS or creator-business tone
- `podcast_studio`: authority, host, expert commentary
- `glass_office`: polished B2B, executive, enterprise-adjacent tone
- `rooftop`: aspirational, launch, momentum, founder-story feel
- `bedroom`: soft personal creator tone, relatable casual content
- `park`: calm wellness, reflection, morning-routine style
- `gym`: discipline, self-improvement, high-energy transformation tone

## Anti-Repetition Rule

Avoid using the same:

- gender
- origin
- type
- location

combination on consecutive outputs unless the user explicitly wants a fixed on-camera identity.
