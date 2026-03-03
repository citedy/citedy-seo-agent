---
name: citedy-content-writer
title: "AI Content Writer"
description: >
  From topic to published blog post in one conversation — generate SEO- and
  GEO-optimized articles with AI illustrations and voice-over in 55 languages,
  create social media adaptations for 9 platforms, set up automated content
  sessions, and manage product knowledge base. End-to-end blog autopilot.
  Powered by Citedy.
version: "1.0.0"
author: Citedy
tags:
  - content-marketing
  - seo
  - article-generation
  - social-media
  - blog-automation
  - writing
  - autopilot
metadata:
  openclaw:
    requires:
      env:
        - CITEDY_API_KEY
    primaryEnv: CITEDY_API_KEY
  compatible_with: "citedy-seo-agent@3.0.0"
privacy_policy_url: https://www.citedy.com/privacy
security_notes: |
  API keys (prefixed citedy_agent_) authenticate against Citedy API endpoints only.
  All traffic is TLS-encrypted.
---

# AI Content Writer — Skill Instructions

## Overview

**AI Content Writer** is an end-to-end blog autopilot powered by [Citedy](https://www.citedy.com/). It covers the entire content production pipeline in a single conversation:

1. **Research** — source URLs or topic input, optional web intelligence search
2. **Write** — SEO & GEO-optimized articles in 55 languages, 4 size presets
3. **Enhance** — AI illustrations, voice-over audio, internal link optimization, humanization
4. **Distribute** — social media adaptations for 9 platforms (X, LinkedIn, Facebook, Reddit, Threads, Instagram, Instagram Reels, YouTube Shorts)
5. **Automate** — cron-based autopilot sessions, scheduling, webhook notifications

No competitor offers the full pipeline in one agent skill.

---

## When to Use

Use this skill when the user wants to:

- Write a blog article from a topic or URL
- Create social media posts from an existing article
- Set up automated daily/weekly content publishing
- Manage a product knowledge base for AI-grounded articles
- Schedule and fill content calendar gaps
- Generate micro-posts across multiple platforms at once
- Select a writing persona (25 available)

---

## Setup

### 1. Get an API Key

Direct the user to: **https://www.citedy.com/dashboard/settings** → Team & API section.

API keys are prefixed `citedy_agent_`.

### 2. Register the Agent

```
POST https://www.citedy.com/api/agent/register
Content-Type: application/json

{
  "name": "My Content Agent",
  "description": "Automated blog content writer"
}
```

**Headers:** `Authorization: Bearer <CITEDY_API_KEY>`

**Response:**
```json
{
  "agent_id": "ag_xxxx",
  "status": "active",
  "blog_handle": "my-blog"
}
```

Store `agent_id` — it is required for session and webhook operations.

### 3. Verify Connection

```
GET https://www.citedy.com/api/agent/me
Authorization: Bearer <CITEDY_API_KEY>
```

---

## Core Workflows

### Workflow 1: URL to Article

Convert any web page, blog post, or competitor article into an original SEO-optimized article.

```
POST https://www.citedy.com/api/agent/autopilot
Authorization: Bearer <CITEDY_API_KEY>
Content-Type: application/json

{
  "source_urls": ["https://example.com/some-article"],
  "language": "en",
  "size": "standard",
  "illustrations": true,
  "audio": false
}
```

After generation, adapt for social:

```
POST https://www.citedy.com/api/agent/adapt
Authorization: Bearer <CITEDY_API_KEY>
Content-Type: application/json

{
  "article_id": "<returned_article_id>",
  "platforms": ["linkedin", "x_article"],
  "include_ref_link": true
}
```

---

### Workflow 2: Topic to Article

Write an article from a plain-text topic or title.

```
POST https://www.citedy.com/api/agent/autopilot
Authorization: Bearer <CITEDY_API_KEY>
Content-Type: application/json

{
  "topic": "How to reduce churn in B2B SaaS",
  "language": "en",
  "size": "full",
  "persona": "saas-founder",
  "enable_search": true
}
```

---

### Workflow 3: Turbo Mode (Fast & Cheap)

For quick content at low cost. Two sub-modes:

| Mode | Credits | Description |
|------|---------|-------------|
| `turbo` | 2 credits | Fast generation, no web search |
| `turbo+` | 4 credits | Fast generation + web intelligence |

```
POST https://www.citedy.com/api/agent/autopilot
Authorization: Bearer <CITEDY_API_KEY>
Content-Type: application/json

{
  "topic": "5 productivity hacks for remote teams",
  "mode": "turbo",
  "language": "en"
}
```

For turbo+, add `"enable_search": true`.

---

### Workflow 4: Social Adaptations

Adapt an existing article to up to 3 platforms per request.

```
POST https://www.citedy.com/api/agent/adapt
Authorization: Bearer <CITEDY_API_KEY>
Content-Type: application/json

{
  "article_id": "art_xxxx",
  "platforms": ["x_thread", "linkedin", "reddit"],
  "include_ref_link": true
}
```

Available platforms: `x_article`, `x_thread`, `linkedin`, `facebook`, `reddit`, `threads`, `instagram`, `instagram_reels`, `youtube_shorts`

---

### Workflow 5: Autopilot Session (Automated Publishing)

Set up recurring content generation on a cron schedule.

```
POST https://www.citedy.com/api/agent/session
Authorization: Bearer <CITEDY_API_KEY>
Content-Type: application/json

{
  "categories": ["SaaS", "productivity", "remote work"],
  "problems": ["user churn", "onboarding friction", "team alignment"],
  "languages": ["en"],
  "interval_minutes": 1440,
  "article_size": "standard",
  "disable_competition": false
}
```

`interval_minutes: 1440` = once per day. Sessions run automatically and publish articles to the connected blog.

---

### Workflow 6: Micro-Post

Publish short-form content across platforms without writing a full article first.

```
POST https://www.citedy.com/api/agent/post
Authorization: Bearer <CITEDY_API_KEY>
Content-Type: application/json

{
  "topic": "Why async communication beats meetings",
  "platforms": ["x_thread", "linkedin"],
  "tone": "professional",
  "contentType": "tip",
  "scheduledAt": "2026-03-02T09:00:00Z"
}
```

---

### Workflow 7: Knowledge Base (Products)

Ground articles with real product data. The AI references this during generation.

**Add a product:**
```
POST https://www.citedy.com/api/agent/products
Authorization: Bearer <CITEDY_API_KEY>
Content-Type: application/json

{
  "name": "Citedy Pro",
  "description": "AI-powered blog automation platform",
  "url": "https://www.citedy.com/pricing",
  "features": ["autopilot", "SEO optimization", "55 languages"]
}
```

**List products:**
```
GET https://www.citedy.com/api/agent/products
Authorization: Bearer <CITEDY_API_KEY>
```

**Search products:**
```
POST https://www.citedy.com/api/agent/products/search
Authorization: Bearer <CITEDY_API_KEY>
Content-Type: application/json

{
  "query": "pricing plans"
}
```

**Delete a product:**
```
DELETE https://www.citedy.com/api/agent/products/<product_id>
Authorization: Bearer <CITEDY_API_KEY>
```

---

### Workflow 8: Schedule Management

Check what content is planned and find gaps.

```
GET https://www.citedy.com/api/agent/schedule
GET https://www.citedy.com/api/agent/schedule/gaps
GET https://www.citedy.com/api/agent/schedule/suggest
```

All require `Authorization: Bearer <CITEDY_API_KEY>`.

---

### Workflow 9: Publish

Publish or schedule a social adaptation.

```
POST https://www.citedy.com/api/agent/publish
Authorization: Bearer <CITEDY_API_KEY>
Content-Type: application/json

{
  "adaptationId": "adp_xxxx",
  "action": "schedule",
  "platform": "linkedin",
  "accountId": "acc_xxxx",
  "scheduledAt": "2026-03-02T10:00:00Z"
}
```

`action` values: `now`, `schedule`, `cancel`

---

## Examples

### Example 1: Write Article from URL

**User:** "Write an article based on this post: https://competitor.com/best-crm-tools"

**Agent flow:**
1. Call `POST /api/agent/autopilot` with `source_urls: ["https://competitor.com/best-crm-tools"]`, `size: "standard"`, `language: "en"`
2. Poll status or wait for webhook `article.completed`
3. Return article title, URL, and word count to user
4. Ask: "Want social media adaptations? Which platforms?"

---

### Example 2: Daily Autopilot

**User:** "Set up daily articles about fintech in English and Spanish"

**Agent flow:**
1. Call `POST /api/agent/session` with `categories: ["fintech", "payments", "banking"]`, `languages: ["en", "es"]`, `interval_minutes: 1440`, `article_size: "standard"`
2. Confirm session ID and next scheduled run
3. Optionally register webhook to notify user on each article completion

---

### Example 3: Turbo Mode

**User:** "Quickly write 5 short articles about remote work tips"

**Agent flow:**
1. For each topic, call `POST /api/agent/autopilot` with `mode: "turbo"`, `size: "mini"`
2. Run calls sequentially or note rate limits
3. Return list of generated article titles and links

---

### Example 4: Social Adaptations

**User:** "Take my latest article and make posts for LinkedIn, Reddit, and X"

**Agent flow:**
1. Call `GET /api/agent/articles` to find the latest article ID
2. Call `POST /api/agent/adapt` with `platforms: ["linkedin", "reddit", "x_thread"]`, `include_ref_link: true`
3. Return each adaptation with preview text
4. Ask: "Want to publish now or schedule?"

---

## API Reference

### POST /api/agent/autopilot

Generate a full blog article.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `topic` | string | one of topic/source_urls | Article topic or title |
| `source_urls` | string[] | one of topic/source_urls | URLs to base the article on |
| `language` | string | no | Language code, default `en`. 55 languages supported |
| `size` | string | no | `mini`, `standard`, `full`, `pillar`. Default `standard` |
| `mode` | string | no | `standard`, `turbo`. Default `standard` |
| `enable_search` | boolean | no | Enable web intelligence. Default `false` |
| `persona` | string | no | Writing persona slug (see Personas section) |
| `illustrations` | boolean | no | Generate AI illustrations. Default `false` |
| `audio` | boolean | no | Generate voice-over audio. Default `false` |
| `disable_competition` | boolean | no | Skip competitor analysis. Default `false` |

**Response:**
```json
{
  "article_id": "art_xxxx",
  "status": "processing",
  "estimated_seconds": 45,
  "credits_reserved": 20
}
```

---

### GET /api/agent/articles

List generated articles.

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter: `draft`, `published`, `processing` |
| `limit` | integer | Max results, default 20 |
| `offset` | integer | Pagination offset |

---

### POST /api/agent/adapt

Create social media adaptations from an article.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `article_id` | string | yes | Source article ID |
| `platforms` | string[] | yes | 1–3 platforms per request |
| `include_ref_link` | boolean | no | Append article backlink. Default `true` |

**Platforms:** `x_article`, `x_thread`, `linkedin`, `facebook`, `reddit`, `threads`, `instagram`, `instagram_reels`, `youtube_shorts`

---

### POST /api/agent/publish

Publish or schedule an adaptation.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `adaptationId` | string | yes | Adaptation ID from `/adapt` |
| `action` | string | yes | `now`, `schedule`, `cancel` |
| `platform` | string | yes | Target platform |
| `accountId` | string | yes | Connected social account ID |
| `scheduledAt` | string | no | ISO 8601 datetime for scheduled action |

---

### POST /api/agent/session

Create an automated content session.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `categories` | string[] | yes | Topic categories for generation |
| `problems` | string[] | no | Specific problems or pain points to cover |
| `languages` | string[] | no | Language codes. Default `["en"]` |
| `interval_minutes` | integer | no | Generation interval. Default `1440` (daily) |
| `article_size` | string | no | `mini`, `standard`, `full`, `pillar` |
| `disable_competition` | boolean | no | Skip competitor analysis. Default `false` |

---

### POST /api/agent/post

Create and publish a micro-post.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `topic` | string | yes | Post topic |
| `platforms` | string[] | yes | Target platforms |
| `tone` | string | no | `professional`, `casual`, `humorous`, `authoritative` |
| `contentType` | string | no | `tip`, `insight`, `question`, `announcement`, `story` |
| `scheduledAt` | string | no | ISO 8601 datetime. Omit for immediate |

---

### GET /api/agent/personas

List all available writing personas.

No parameters required.

**Response:** Array of persona objects with `slug`, `name`, `description`, `style`.

---

### GET /api/agent/settings

Get current agent/blog settings.

---

### PUT /api/agent/settings

Update agent/blog settings.

| Parameter | Type | Description |
|-----------|------|-------------|
| `default_language` | string | Default article language |
| `default_size` | string | Default article size |
| `auto_publish` | boolean | Auto-publish generated articles |
| `default_persona` | string | Default persona slug |

---

### POST /api/agent/products

Add a product to knowledge base.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | yes | Product name |
| `description` | string | yes | Product description |
| `url` | string | no | Product landing page |
| `features` | string[] | no | Key features list |

---

### GET /api/agent/products

List all products in knowledge base.

---

### POST /api/agent/products/search

Semantic search over knowledge base.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | yes | Search query |

---

### DELETE /api/agent/products/:id

Remove a product from knowledge base.

---

### GET /api/agent/schedule

Get current content schedule (upcoming articles, sessions).

---

### GET /api/agent/schedule/gaps

Find gaps in the content calendar where no articles are scheduled.

---

### GET /api/agent/schedule/suggest

Get AI-suggested topics to fill schedule gaps based on existing content and SEO opportunities.

---

### POST /api/agent/webhooks

Register a webhook endpoint for event notifications.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | yes | HTTPS endpoint URL |
| `events` | string[] | yes | Event types to subscribe to |
| `secret` | string | no | HMAC signing secret |

---

### GET /api/agent/webhooks

List registered webhooks.

---

### DELETE /api/agent/webhooks/:id

Remove a webhook registration.

---

### GET /api/agent/webhooks/deliveries

Get recent webhook delivery history with status codes and payloads.

---

### GET /api/agent/health

Check API availability.

---

### GET /api/agent/me

Get current agent profile, blog info, and credit balance.

---

### GET /api/agent/status/:article_id

Poll article generation status.

**Response:**
```json
{
  "article_id": "art_xxxx",
  "status": "processing|completed|failed",
  "progress": 75,
  "article_url": "https://blog.example.com/article-slug"
}
```

---

## Pricing

All costs in credits. **1 credit = $0.01 USD.**

### Article Generation

| Size | Standard Mode | Description |
|------|--------------|-------------|
| `mini` | 15 credits | ~500 words, quick post |
| `standard` | 20 credits | ~1,000 words, full article |
| `full` | 33 credits | ~2,000 words, in-depth piece |
| `pillar` | 48 credits | ~4,000 words, pillar content |

### Turbo Mode

| Mode | Cost | Notes |
|------|------|-------|
| `turbo` | 2 credits | Fast, no web search |
| `turbo+` | 4 credits | Fast + web intelligence |

### Extensions

| Extension | Cost |
|-----------|------|
| +Intelligence (web search) | +8 credits |
| +Illustrations (per article) | +9–36 credits depending on count |
| +Audio voice-over | +10–55 credits depending on length & language |

### Social Adaptations

~5 credits per platform per article.

### Knowledge Base

Products storage is free. Semantic search costs minimal credits per query.

---

## Persona List

25 writing personas available. Pass the `slug` to `/api/agent/autopilot`.

### Writers & Journalists
| Slug | Name |
|------|------|
| `investigative-reporter` | Investigative Reporter |
| `science-communicator` | Science Communicator |
| `business-journalist` | Business Journalist |
| `travel-writer` | Travel Writer |
| `food-critic` | Food Critic |

### Tech Leaders & Experts
| Slug | Name |
|------|------|
| `saas-founder` | SaaS Founder |
| `cto-engineer` | CTO / Senior Engineer |
| `data-scientist` | Data Scientist |
| `cybersecurity-expert` | Cybersecurity Expert |
| `product-manager` | Product Manager |

### Business & Finance
| Slug | Name |
|------|------|
| `startup-advisor` | Startup Advisor |
| `marketing-strategist` | Marketing Strategist |
| `venture-capitalist` | Venture Capitalist |
| `hr-consultant` | HR Consultant |
| `financial-analyst` | Financial Analyst |

### Entertainment & Lifestyle
| Slug | Name |
|------|------|
| `comedian-writer` | Comedian Writer |
| `lifestyle-blogger` | Lifestyle Blogger |
| `fitness-coach` | Fitness Coach |
| `parenting-expert` | Parenting Expert |
| `pop-culture-critic` | Pop Culture Critic |

### Creators & Educators
| Slug | Name |
|------|------|
| `youtube-educator` | YouTube Educator |
| `newsletter-writer` | Newsletter Writer |
| `academic-researcher` | Academic Researcher |
| `motivational-speaker` | Motivational Speaker |
| `creative-storyteller` | Creative Storyteller |

---

## Webhook Event Types

Subscribe to these events when registering a webhook:

| Event | Triggered When |
|-------|---------------|
| `article.started` | Article generation begins |
| `article.completed` | Article fully generated and ready |
| `article.failed` | Article generation failed |
| `article.published` | Article published to blog |
| `adaptation.completed` | Social adaptation ready |
| `adaptation.published` | Social post published |
| `session.started` | Autopilot session triggered |
| `session.article_generated` | Session produced an article |
| `session.completed` | Session cycle finished |
| `session.failed` | Session encountered an error |
| `credits.low` | Credit balance below threshold |
| `credits.exhausted` | Credits depleted, operations paused |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| `/api/agent/autopilot` | 10 requests/minute |
| `/api/agent/adapt` | 20 requests/minute |
| `/api/agent/post` | 30 requests/minute |
| `/api/agent/products` | 60 requests/minute |
| All other endpoints | 120 requests/minute |

Rate limit headers are included in all responses: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

---

## Limitations

- Social adaptation: maximum 3 platforms per `/api/agent/adapt` call
- Autopilot: `source_urls` maximum 5 URLs per request
- Knowledge base: maximum 500 products per account
- Webhooks: maximum 10 registered endpoints per account
- Article sizes above `standard` may take 60–180 seconds to generate
- `turbo` and `turbo+` modes do not support `illustrations` or `audio`
- Language support varies by persona — not all personas support all 55 languages

---

## Error Handling

All errors follow a consistent structure:

```json
{
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "Not enough credits to complete this operation",
    "required": 20,
    "available": 5
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing API key |
| `INSUFFICIENT_CREDITS` | 402 | Not enough credits |
| `RATE_LIMITED` | 429 | Too many requests |
| `ARTICLE_NOT_FOUND` | 404 | Article ID does not exist |
| `INVALID_PLATFORM` | 400 | Unknown platform slug |
| `SESSION_CONFLICT` | 409 | Active session already exists |
| `GENERATION_FAILED` | 500 | AI generation error — retry safe |

### Agent Response Guidelines

When an error occurs:

1. **`INSUFFICIENT_CREDITS`** — Inform the user of current balance and required credits. Direct to: `https://www.citedy.com/dashboard/billing`
2. **`RATE_LIMITED`** — Wait for `Retry-After` header value before retrying. Do not spam requests.
3. **`GENERATION_FAILED`** — Retry once after 10 seconds. If it fails again, report the error and suggest trying a different topic or smaller size.
4. **`UNAUTHORIZED`** — Guide the user to check their API key at `https://www.citedy.com/dashboard/settings`.

---

## Response Guidelines for the Agent

- Always show the user the article title and URL after successful generation
- When generation is async (status `processing`), poll `/api/agent/status/:article_id` every 10 seconds up to 5 minutes
- Present credit costs before starting expensive operations (full/pillar articles, audio)
- After generating an article, proactively offer social adaptations
- After social adaptations, offer to publish or schedule
- For autopilot sessions, confirm interval and categories with the user before creating

---

## Want More?

This skill covers the full content writing pipeline. Citedy also offers:

- **Video Shorts** — AI UGC viral video generation with voice and subtitles for TikTok, Reels, and YouTube Shorts
- **Trend Scouting** — Daily trending topic discovery from Hacker News, Reddit, and social signals
- **Content Ingestion** — Convert any YouTube video, podcast, or long-form document into a blog article
- **SEO Intelligence** — Competitor gap analysis, keyword tracking, and SERP monitoring

Explore the full suite: [https://www.citedy.com/tools](https://www.citedy.com/tools)
