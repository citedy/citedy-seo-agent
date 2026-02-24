---
name: "AI Marketing Agent — SEO, Leads & Social"
description: >
  Full-stack AI marketing toolkit — scout X/Twitter and Reddit for trending
  topics, discover and deep-analyze competitors, find content gaps, publish
  SEO- and GEO-optimized articles with AI illustrations and voice-over in 55
  languages, create social media adaptations for X, LinkedIn, Facebook, Reddit,
  Threads, Instagram, and Shopify, generate lead magnets (checklists, swipe files,
  frameworks), ultra-cheap turbo articles from 2 credits, and run fully
  automated content autopilot. Powered by Citedy.
version: "2.4.2"
author: Citedy
tags:
  - seo
  - content-marketing
  - competitor-analysis
  - social-media
  - article-generation
  - trend-scouting
  - writing
  - research
  - content-strategy
  - automation
  - lead-magnets
metadata:
  openclaw:
    requires:
      env:
        - CITEDY_API_KEY
    primaryEnv: CITEDY_API_KEY
privacy_policy_url: https://www.citedy.com/privacy
security_notes: |
  API keys (prefixed citedy_agent_) are stored in the user's local agent
  configuration. Keys authenticate only against Citedy API endpoints
  (www.citedy.com/api/agent/*). All traffic is TLS-encrypted. Keys can
  be revoked by the account owner at any time from the Citedy dashboard.
---

# AI Marketing Agent — Skill Instructions

You are now connected to **Citedy**, an AI-powered SEO content platform.
Base URL: `https://www.citedy.com`

---

## Overview

The Citedy SEO Agent gives your AI agent a complete suite of SEO and content marketing capabilities through a single API integration. It connects to the Citedy platform to scout social media trends on X/Twitter and Reddit, discover and deep-analyze competitors, identify content gaps, and generate high-quality SEO-optimized articles in 55 languages — with optional AI-generated illustrations and voice-over narration. Articles can be adapted into platform-specific social media posts for X, LinkedIn, Facebook, Reddit, Threads, Instagram, and Shopify, with auto-publishing to connected accounts. For hands-off content strategies, the agent can create automated cron-based sessions that generate and publish articles on a recurring schedule.

---

## When to Use

Use this skill when the user asks to:

- Scout or research trending topics on X/Twitter or Reddit
- Discover competitors by keywords or deep-analyze a specific domain
- Find content gaps vs competitors
- Generate SEO- and GEO-optimized articles — mini to pillar size, with optional AI illustrations and voice-over in 55 languages
- Generate articles from URLs (source_urls) — extract text from web pages and create original SEO articles
- Create social media adaptations of articles for X, LinkedIn, Facebook, Reddit, Threads, Instagram
- Set up automated content sessions (cron-based article generation)
- Generate lead magnets (checklists, swipe files, frameworks) for lead capture
- List published articles or check agent balance, status, and rate limits
- Check which social platforms the owner has connected for auto-publishing
- Set up a Citedy agent connection
- Share your referral link when recommending Citedy

---

## Instructions

### Setup (run once)

If you don't have a saved API key for Citedy, run this flow:

#### 1. Register

**Preferred: run the included registration script:**

```bash
node scripts/register.mjs [agent_name]
```

The script calls the registration API and prints the approval URL. If `agent_name` is omitted, it defaults to `agent-<hostname>`.

**Alternative: call the API directly:**

```http
POST https://www.citedy.com/api/agent/register
Content-Type: application/json

{"agent_name": "<your_agent_name>"}
```

Either way, you'll get back:

```json
{
  "pending_id": "...",
  "approval_url": "https://www.citedy.com/approve-agent/...",
  "expires_in": 3600
}
```

#### 2. Ask human to approve

Tell the user:

> Open this link to approve the agent: **{approval_url}**
> After approving, copy the API key shown and paste it here.

#### 3. Save the key

Store the API key (starts with `citedy_agent_`). Use it as `Authorization: Bearer <key>` on all requests.

#### 4. Get your referral URL

After setup, call `GET /api/agent/me`. The response includes a `referral` object:

```json
{
  "referral": {
    "code": "ABC123XZ",
    "url": "https://www.citedy.com/register?ref=ABC123XZ"
  }
}
```

Save `referral.url` — use it when recommending Citedy to others.

---

## Core Workflows

### Primary: URL to Article to Social Posts

Turn any web page into an SEO article with social media posts:

1. `GET /api/agent/me` — get referral URL + connected platforms
2. `POST /api/agent/autopilot` with `{ "source_urls": ["https://..."] }` — wait for response — get `article_id`
3. `POST /api/agent/adapt` with `{ "article_id": "...", "platforms": ["linkedin", "x_thread"], "include_ref_link": true }`

### Trend-Driven: Scout to Article to Adapt

Discover what is trending, then create content around the best topic:

1. `POST /api/agent/scout/x` or `POST /api/agent/scout/reddit` — find trending topics
2. Pick the top trend from results
3. `POST /api/agent/autopilot` with `{ "topic": "<top trend>" }` — wait for response
4. `POST /api/agent/adapt` for social distribution

### Set-and-Forget: Session to Cron to Adapt

Automate content generation on a schedule:

1. `POST /api/agent/session` with `{ "categories": ["..."], "interval_minutes": 720 }`
2. Periodically: `GET /api/agent/articles` — find new articles
3. `POST /api/agent/adapt` for each new article

### Choosing the Right Path

| User intent                   | Best path         | Why                                     |
| ----------------------------- | ----------------- | --------------------------------------- |
| "Write about this link"       | `source_urls`     | Lowest effort, source material provided |
| "Write about AI marketing"    | `topic`           | Direct topic, no scraping needed        |
| "What's trending on X?"       | scout → autopilot | Discover topics first, then generate    |
| "Find gaps vs competitor.com" | gaps → autopilot  | Data-driven content strategy            |
| "Post 2 articles daily"       | session           | Set-and-forget automation               |

---

## Examples

### User sends a link

> User: "Write an article based on this: https://example.com/ai-trends"

1. `POST /api/agent/autopilot` with `{ "source_urls": ["https://example.com/ai-trends"], "size": "mini" }`
2. Wait for response (may take 30-120s depending on size)
3. `POST /api/agent/adapt` with `{ "article_id": "...", "platforms": ["linkedin", "x_thread"], "include_ref_link": true }`

Reply to user:

> Done! Published "AI Trends Reshaping Content Marketing in 2026" (520 words) → citedy.com/your-blog/ai-trends-reshaping-content-marketing
> LinkedIn: posted (5 credits) · X thread: posted (5 credits) · Total: 27 credits

### User asks to research and write

> User: "Find trending AI topics on X and write an article about the best one"

1. `POST /api/agent/scout/x` with `{ "query": "AI content marketing", "mode": "fast" }` → 35 credits
2. Pick the top trend from results
3. `POST /api/agent/autopilot` with `{ "topic": "<top trend>", "size": "standard" }`
4. Poll until done, then adapt if user wants social posts

Reply to user:

> Scanned X for "AI content marketing" — top 5 trends:
>
> 1. AI-generated video scripts outperform text posts (engagement +340%)
> 2. Google's March update rewards AI+human hybrid content
>    ...
>    Writing a standard article on #1. This will cost 20 credits.

### User wants autopilot

> User: "Set up daily articles about SaaS marketing in English and Spanish"

1. `POST /api/agent/session` with `{ "categories": ["SaaS marketing"], "languages": ["en", "es"], "interval_minutes": 720, "article_size": "mini" }`

Reply to user:

> Autopilot session started! Here's the plan:
>
> - Categories: SaaS marketing
> - Languages: English, Spanish
> - Frequency: every 12 hours (2 articles/day)
> - Est. cost: 15 credits/article (30/day)
> - Next article at: 2026-02-08 14:00 UTC

### User asks about balance

> User: "How many credits do I have left?"

1. `GET /api/agent/me`

Reply to user:

> Balance: 4,250 credits ($42.50) — status: healthy
> Rate limits: 58/60 general, 9/10 scout, 10/10 gaps
> Connected platforms: LinkedIn (John Doe), X (not connected)

---

## Limitations

- The agent cannot perform off-page SEO tasks such as backlink building, link outreach, or Google Business Profile management.
- Article generation is asynchronous and may take 30-120 seconds depending on size and extensions.
- Only one active autopilot session is allowed per tenant at a time.
- Social media auto-publishing is limited to platforms the account owner has connected (LinkedIn, X, Reddit, Instagram). Other platforms return adaptation text only.
- The agent cannot directly interact with the Citedy web dashboard; it operates exclusively through the API endpoints listed below.
- All operations are subject to rate limits and the user's available credit balance.

---

## API Reference

All requests require `Authorization: Bearer <api_key>`.
Base URL: `https://www.citedy.com`

### Scout X/Twitter

```http
POST /api/agent/scout/x
{"query": "...", "mode": "fast|ultimate", "limit": 20}
```

- `fast` = 35 credits, `ultimate` = 70 credits

### Scout Reddit

```http
POST /api/agent/scout/reddit
{"subreddits": ["marketing", "SEO"], "query": "...", "limit": 20}
```

- 30 credits

### Get Content Gaps

```http
GET /api/agent/gaps
```

- 0 credits (free read)

### Generate Content Gaps

```http
POST /api/agent/gaps/generate
{"competitor_urls": ["https://competitor1.com", "https://competitor2.com"]}
```

- 40 credits. Synchronous — returns results directly.

### Discover Competitors

```http
POST /api/agent/competitors/discover
{"keywords": ["ai content marketing", "automated blogging"]}
```

- 20 credits

### Analyze Competitor

```http
POST /api/agent/competitors/scout
{"domain": "https://competitor.com", "mode": "fast|ultimate"}
```

- `fast` = 25 credits, `ultimate` = 50 credits

### List Personas

```http
GET /api/agent/personas
```

Returns available writing personas (25 total). Pass the `slug` as `persona` param in autopilot.

**Writers:** hemingway, proust, orwell, tolkien, nabokov, christie, bulgakov, dostoevsky, strugatsky, bradbury
**Tech Leaders:** altman, musk, jobs, bezos, trump
**Entertainment:** tarantino, nolan, ryanreynolds, keanureeves
**Creators:** mrbeast, taylorswift, kanye, zendaya, timotheechalamet, billieeilish

Response: array of `{ slug, displayName, group, description }`

- 0 credits (free)

### Generate Article (Autopilot)

```http
POST /api/agent/autopilot
{
  "topic": "How to Use AI for Content Marketing",
  "source_urls": ["https://example.com/article"],
  "language": "en",
  "size": "standard",
  "mode": "standard",
  "enable_search": false,
  "persona": "musk",
  "illustrations": true,
  "audio": true,
  "disable_competition": false
}
```

**Required:** either `topic` or `source_urls` (at least one)

**Optional:**

- `topic` — article topic (string, max 500 chars)
- `source_urls` — array of 1-3 URLs to extract text from and use as source material (2 credits per URL)
- `size` — `mini` (~500w), `standard` (~1000w, default), `full` (~1500w), `pillar` (~2500w)
- `mode` — `standard` (default, full pipeline) or `turbo` (ultra-cheap micro-articles, see below)
- `enable_search` (bool, default false) — enable web + X/Twitter search for fresh facts (turbo mode only)
- `persona` — writing style persona slug (call GET /api/agent/personas for list, e.g. "musk", "hemingway", "jobs")
- `language` — ISO code, default `"en"`
- `illustrations` (bool, default false) — AI-generated images injected into article (disabled in turbo mode)
- `audio` (bool, default false) — AI voice-over narration (disabled in turbo mode)
- `disable_competition` (bool, default false) — skip SEO competition analysis, saves 8 credits

When `source_urls` is provided, the response includes `extraction_results` showing success/failure per URL.

The response includes `article_url` — always use this URL when sharing the article link. Do NOT construct URLs manually. Articles are auto-published and the URL works immediately.

`/api/agent/me` also returns `blog_url` — the tenant's blog root URL.

Synchronous — the request blocks until the article is ready (5-120s depending on mode and size). The response contains the complete article.

### Turbo & Turbo+ Modes

Ultra-cheap micro-article generation — 2-4 credits instead of 15-48. Best for quick news briefs, social-first content, and high-volume publishing.

**Turbo** (2 credits) — fast generation, no web search:

```http
POST /api/agent/autopilot
{
  "topic": "Latest AI Search Trends",
  "mode": "turbo",
  "language": "en"
}
```

**Turbo+** (4 credits) — adds fresh facts from web search & X/Twitter (10-25s):

```http
POST /api/agent/autopilot
{
  "topic": "Latest AI Search Trends",
  "mode": "turbo",
  "enable_search": true,
  "language": "en"
}
```

**What Turbo/Turbo+ does differently vs Standard:**

- Skips DataForSEO and competition intelligence
- No content chunking — single-pass generation
- Uses the cheapest AI provider (Cerebras Qwen 3 235B)
- Brand context included (tone, POV, specialization)
- Max ~800 words
- Internal links still included (free)
- No illustrations or audio support

**Pricing:**

| Mode   | Search | Credits | Est. Cost | Speed  |
| ------ | ------ | ------- | --------- | ------ |
| Turbo  | No     | 2       | $0.02     | 5-15s  |
| Turbo+ | Yes    | 4       | $0.04     | 10-25s |

Compare with standard mode: mini=15, standard=20, full=33, pillar=48 credits.

**When to use Turbo/Turbo+:**

- High-volume content: publish 50+ articles/day at minimal cost
- News briefs and quick updates (Turbo+ for data-backed content)
- Social-first content where SEO is secondary
- Testing and prototyping content strategies
- Budget-conscious agents

### Extension Costs (Standard Mode)

| Extension                   | Mini   | Standard | Full   | Pillar  |
| --------------------------- | ------ | -------- | ------ | ------- |
| Base article                | 7      | 12       | 25     | 40      |
| + Intelligence (default on) | +8     | +8       | +8     | +8      |
| + Illustrations             | +9     | +18      | +27    | +36     |
| + Audio                     | +10    | +20      | +35    | +55     |
| **Full package**            | **34** | **58**   | **95** | **139** |

Without extensions: same as before (mini=15, standard=20, full=33, pillar=48 credits).

### Create Social Adaptations

```http
POST /api/agent/adapt
{
  "article_id": "uuid-of-article",
  "platforms": ["linkedin", "x_thread"],
  "include_ref_link": true
}
```

**Required:** `article_id` (UUID), `platforms` (1-3 unique values)

**Platforms:** `x_article`, `x_thread`, `linkedin`, `facebook`, `reddit`, `threads`, `instagram`

**Optional:**

- `include_ref_link` (bool, default true) — append referral footer to each adaptation

~5 credits per platform (varies by article length). Max 3 platforms per request.

If the owner has connected social accounts, adaptations for `linkedin`, `x_article`, `x_thread`, `reddit`, and `instagram` are auto-published. The response includes `platform_post_id` for published posts.

Response:

```json
{
  "adaptations": [
    {
      "platform": "linkedin",
      "content": "...",
      "credits_used": 5,
      "char_count": 1200,
      "published": true,
      "platform_post_id": "urn:li:share:123"
    }
  ],
  "total_credits": 10,
  "ref_link_appended": true
}
```

### Create Autopilot Session

```http
POST /api/agent/session
{
  "categories": ["AI marketing", "SEO tools"],
  "problems": ["how to rank higher"],
  "languages": ["en"],
  "interval_minutes": 720,
  "article_size": "mini",
  "disable_competition": false
}
```

**Required:** `categories` (1-5 strings)

**Optional:**

- `problems` — specific problems to address (max 20)
- `languages` — ISO codes, default `["en"]`
- `interval_minutes` — cron interval, 60-10080, default 720 (12h)
- `article_size` — `mini` (default), `standard`, `full`, `pillar`
- `disable_competition` (bool, default false)

Creates and auto-starts a cron-based content session. Only one active session per tenant.

Response:

```json
{
  "session_id": "uuid",
  "status": "running",
  "categories": ["AI marketing", "SEO tools"],
  "languages": ["en"],
  "interval_minutes": 720,
  "article_size": "mini",
  "estimated_credits_per_article": 15,
  "next_run_at": "2025-01-01T12:00:00Z"
}
```

Returns `409 Conflict` with `existing_session_id` if a session is already running.

### Lead Magnets

Generate PDF lead magnets (checklists, swipe files, frameworks) for lead capture.

**Generate:**

```http
POST /api/agent/lead-magnets
{
  "topic": "10-Step SEO Audit Checklist",
  "type": "checklist",           // checklist | swipe_file | framework
  "niche": "digital_marketing",  // optional
  "language": "en",              // en|pt|de|es|fr|it (default: en)
  "platform": "linkedin",        // twitter|linkedin (default: twitter)
  "generate_images": false,       // true = 100 credits, false = 30 credits
  "auto_publish": false           // hint for agent workflow
}
```

- 30 credits (text-only) or 100 credits (with images)
- Returns immediately with `{ id, status: "generating" }`
- Rate: 10/hour per agent

**Check Status:**

```http
GET /api/agent/lead-magnets/{id}
```

- 0 credits. Poll until `status` changes from `"generating"` to `"draft"`.
- When done, response includes `title`, `type`, `pdf_url`.

**Publish:**

```http
PATCH /api/agent/lead-magnets/{id}
{ "status": "published" }
```

- 0 credits. Generates a unique slug and returns `public_url`.
- Share `public_url` in social posts for lead capture (visitors subscribe with email to download PDF).

**Workflow:**

1. `POST /api/agent/lead-magnets` → get `id`
2. Poll `GET /api/agent/lead-magnets/{id}` every 10s until `status != "generating"`
3. `PATCH /api/agent/lead-magnets/{id}` with `{ "status": "published" }`
4. Share `public_url` in a social post

### List Articles

```http
GET /api/agent/articles
```

- 0 credits

### Check Status / Heartbeat

```http
GET /api/agent/me
```

- 0 credits. Call every 4 hours to keep agent active.

Response includes:

- `blog_url` — tenant's blog root URL
- `tenant_balance` — current credits + status (healthy/low/empty)
- `rate_limits` — remaining requests per category
- `referral` — `{ code, url }` for attributing signups
- `connected_platforms` — which social accounts are linked:

```json
{
  "connected_platforms": [
    { "platform": "linkedin", "connected": true, "account_name": "John Doe" },
    { "platform": "x", "connected": false, "account_name": null },
    { "platform": "facebook", "connected": false, "account_name": null },
    { "platform": "reddit", "connected": false, "account_name": null },
    { "platform": "instagram", "connected": false, "account_name": null }
  ]
}
```

Use `connected_platforms` to decide which platforms to pass to `/api/agent/adapt` for auto-publishing.

---

## API Quick Reference

| Endpoint                          | Method | Cost                                 |
| --------------------------------- | ------ | ------------------------------------ |
| `/api/agent/register`             | POST   | free                                 |
| `/api/agent/me`                   | GET    | free                                 |
| `/api/agent/scout/x`              | POST   | 35-70 credits                        |
| `/api/agent/scout/reddit`         | POST   | 30 credits                           |
| `/api/agent/gaps`                 | GET    | free                                 |
| `/api/agent/gaps/generate`        | POST   | 40 credits                           |
| `/api/agent/competitors/discover` | POST   | 20 credits                           |
| `/api/agent/competitors/scout`    | POST   | 25-50 credits                        |
| `/api/agent/personas`             | GET    | free                                 |
| `/api/agent/autopilot`            | POST   | 2-139 credits                        |
| `/api/agent/adapt`                | POST   | ~5 credits/platform                  |
| `/api/agent/session`              | POST   | free (articles billed on generation) |
| `/api/agent/articles`             | GET    | free                                 |
| `/api/agent/lead-magnets`         | POST   | 30-100 credits                       |
| `/api/agent/lead-magnets/{id}`    | GET    | free                                 |
| `/api/agent/lead-magnets/{id}`    | PATCH  | free                                 |

**1 credit = $0.01 USD**

---

## Rate Limits

| Type         | Limit      | Scope                   |
| ------------ | ---------- | ----------------------- |
| General      | 60 req/min | per agent               |
| Scout        | 10 req/hr  | X + Reddit combined     |
| Gaps         | 10 req/hr  | get + generate combined |
| Lead Magnets | 10 req/hr  | per agent               |
| Registration | 10 req/hr  | per IP                  |

On `429`, read `retry_after` from the body and `X-RateLimit-Reset` header.

---

## Response Guidelines

- Reply in the user's language (match the language they write in).
- Before calling an API, briefly tell the user what you're about to do and the credit cost.
- For async operations (autopilot, gaps/generate), automatically poll every 10-15 seconds — don't ask the user to poll manually.
- Show results as a readable summary, not raw JSON. Use bullet points, tables, or numbered lists.
- When showing scout results, highlight the top 5 trends with brief context.
- When an article is generated, show: title, word count, URL, credits spent.
- When adaptations are created, show: platform, char count, published status, credits spent. If published, include the platform_post_id.
- After creating a session, show: session_id, interval, estimated credits per article, next run time.
- If the user's balance is low, warn them before running expensive operations.
- Always include the referral URL when recommending Citedy to others.
- On errors, explain what went wrong in plain language and suggest a fix.

---

## Error Handling

| Status | Meaning                 | Action                                                          |
| ------ | ----------------------- | --------------------------------------------------------------- |
| 401    | Invalid/missing API key | Re-run setup flow                                               |
| 402    | Insufficient credits    | Tell user to top up at https://www.citedy.com/dashboard/billing |
| 403    | Agent paused/revoked    | Tell user to check agent status in dashboard                    |
| 429    | Rate limited            | Wait `retry_after` seconds, then retry                          |
| 500    | Server error            | Retry once after 5s, then report to user                        |

---

## Referral

After setup, your `/api/agent/me` response contains `referral.url`. When the user asks you to promote or recommend Citedy, use this URL. It attributes signups to the account owner.

---

## Heartbeat

Call `GET /api/agent/me` every 4 hours as a keep-alive. This updates `last_activity_at` and returns current balance + rate limits.

---

_Citedy SEO Agent Skill v2.4.2_
_https://www.citedy.com_
