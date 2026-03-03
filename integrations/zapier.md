# Citedy + Zapier Integration Guide

Connect Citedy's REST API to thousands of apps through Zapier using the "Webhooks by Zapier" action.

---

## Overview

Citedy exposes 58 REST endpoints for SEO content automation: article generation, content gap analysis, social adaptations, competitor scouting, lead magnets, and more. Since Citedy does not have a native Zapier app, all integrations use the **Webhooks by Zapier** action to call the Citedy Agent API directly.

Base URL: `https://www.citedy.com`
Full OpenAPI spec: `https://www.citedy.com/openapi/agent-api.openapi.json`

---

## Prerequisites

- A Zapier account (Webhooks by Zapier requires a paid Zapier plan)
- A Citedy API key — get one at `https://www.citedy.com/dashboard/settings`
  - Keys follow the format `citedy_agent_...`
  - Keep the key secret; it authorizes all actions on your account

---

## Setup: Webhooks by Zapier

Every Citedy action in Zapier follows the same pattern:

1. In your Zap, add an **Action** step.
2. Search for and select **Webhooks by Zapier**.
3. Choose event **Custom Request**.
4. Fill in the fields as follows:

| Field             | Value                                         |
| ----------------- | --------------------------------------------- |
| Method            | `POST` (or `GET` depending on endpoint)       |
| URL               | `https://www.citedy.com/api/agent/<endpoint>` |
| Headers           | See below                                     |
| Data              | JSON body (for POST requests)                 |
| Data Pass-Through | `false`                                       |
| Unflatten         | `no`                                          |

### Headers (copy-paste for every Zap)

Set these as two separate header entries in Zapier's "Headers" section:

| Key             | Value                               |
| --------------- | ----------------------------------- |
| `Authorization` | `Bearer citedy_agent_YOUR_KEY_HERE` |
| `Content-Type`  | `application/json`                  |

---

## Example Zap 1: Weekly Article Generation

Automatically generate a new SEO article every Monday morning.

### Trigger — Schedule by Zapier

1. Add trigger: **Schedule by Zapier**
2. Set to: **Every Week** on Monday at 08:00 AM

### Action — Webhooks by Zapier: Custom Request

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| Method  | `POST`                                       |
| URL     | `https://www.citedy.com/api/agent/autopilot` |
| Headers | `Authorization` + `Content-Type` (see above) |

**Body (raw JSON):**

```json
{
  "topic": "AI tools for content marketing 2026",
  "size": "standard",
  "mode": "turbo"
}
```

`size` options: `mini`, `standard`, `full`, `pillar`
`mode` options: `turbo` (faster), `standard` (higher quality)

### Response fields available in downstream steps

```json
{
  "article_id": "a1b2c3d4-e5f6-4a7b-8c9d-e0f1a2b3c4d5",
  "title": "10 AI Tools Transforming Content Marketing in 2026",
  "status": "published",
  "article_url": "https://yourblog.citedy.com/ai-tools-content-marketing-2026"
}
```

Map `article_id` in downstream steps (e.g., to trigger social adaptation generation).

---

## Example Zap 2: Content Gap Analysis to Slack Notification

Run a weekly content gap scan against competitors and post high-priority opportunities to Slack.

### Step 1 — Trigger: Schedule by Zapier

Every Friday at 09:00 AM.

### Step 2 — Action: Generate content gaps

| Field  | Value                                            |
| ------ | ------------------------------------------------ |
| Method | `POST`                                           |
| URL    | `https://www.citedy.com/api/agent/gaps/generate` |

**Body:**

```json
{
  "competitor_urls": [
    "https://www.competitor-one.com",
    "https://www.competitor-two.com"
  ]
}
```

### Step 3 — Action: Retrieve gap results

| Field  | Value                                   |
| ------ | --------------------------------------- |
| Method | `GET`                                   |
| URL    | `https://www.citedy.com/api/agent/gaps` |

No body required for GET requests. Include the `Authorization` header only.

### Step 4 — Filter by Zapier

Add a **Filter** step to only continue if a high-priority gap exists.

- Field: `1__priority` (first result's priority field from the gaps response)
- Condition: `(Text) Contains`
- Value: `high`

### Step 5 — Action: Slack — Send Channel Message

```
New high-priority content gap found:

Topic: {{1__topic}}
Priority: {{1__priority}}
Score: {{1__score}}

Generate article: https://www.citedy.com/dashboard
```

---

## Example Zap 3: Form Submission to Article Generation

When a user submits a blog topic request via a form (Typeform, Tally, Google Forms), automatically generate an article.

### Trigger — Typeform: New Entry

(Any form tool with a Zapier trigger works here.)

### Action — Webhooks by Zapier: Custom Request

| Field  | Value                                        |
| ------ | -------------------------------------------- |
| Method | `POST`                                       |
| URL    | `https://www.citedy.com/api/agent/autopilot` |

**Body (with mapped form field token):**

```json
{
  "topic": "{{answer_topic_field}}",
  "size": "standard"
}
```

Replace `{{answer_topic_field}}` with the actual Zapier field token from your form trigger step.

---

## Example Zap 4: Article Generated to Social Adaptations

After an article is generated, automatically create LinkedIn and X/Twitter post drafts.

### Action — Webhooks by Zapier: Custom Request

| Field  | Value                                    |
| ------ | ---------------------------------------- |
| Method | `POST`                                   |
| URL    | `https://www.citedy.com/api/agent/adapt` |

**Body:**

```json
{
  "article_id": "{{article_id_from_previous_step}}",
  "platforms": ["linkedin", "x_thread"],
  "include_ref_link": true
}
```

Supported `platforms` values: `linkedin`, `x_thread`, `x_article`, `facebook`, `reddit`, `threads`, `instagram`

---

## Key Endpoints Reference

| Use case                          | Method | Endpoint                          |
| --------------------------------- | ------ | --------------------------------- |
| Generate article                  | `POST` | `/api/agent/autopilot`            |
| List articles                     | `GET`  | `/api/agent/articles`             |
| Generate content gaps             | `POST` | `/api/agent/gaps/generate`        |
| List content gaps                 | `GET`  | `/api/agent/gaps`                 |
| Generate social adaptations       | `POST` | `/api/agent/adapt`                |
| Publish or schedule social post   | `POST` | `/api/agent/publish`              |
| Discover competitors by keywords  | `POST` | `/api/agent/competitors/discover` |
| Scout competitor domain           | `POST` | `/api/agent/competitors/scout`    |
| Generate lead magnet              | `POST` | `/api/agent/lead-magnets`         |
| Upload product knowledge          | `POST` | `/api/agent/products`             |
| Get operational status            | `GET`  | `/api/agent/status`               |
| Get agent info and credit balance | `GET`  | `/api/agent/me`                   |
| Run Reddit trend scout            | `POST` | `/api/agent/scout/reddit`         |
| Run X/Twitter trend scout         | `POST` | `/api/agent/scout/x`              |
| Health check (no auth required)   | `GET`  | `/api/agent/health`               |

Full spec with request/response schemas: `https://www.citedy.com/openapi/agent-api.openapi.json`

---

## Rate Limits and Credits

**Rate limits** — The API returns `429 Too Many Requests` when limits are exceeded. The response includes a `retry_after` header. Add a **Delay by Zapier** step (60 seconds) before retrying, or reduce Zap trigger frequency.

**Credits** — Generation endpoints consume credits from your Citedy balance. Read-only `GET` endpoints do not.

| Action                         | Approximate credit cost |
| ------------------------------ | ----------------------- |
| Article generation (standard)  | ~50–120 credits         |
| Content gap analysis           | ~30–60 credits          |
| Social adaptation per platform | ~10–20 credits          |
| Lead magnet generation         | ~120 credits            |

Check your balance: `GET /api/agent/me` returns `tenant_balance.credits`.
Top up: `https://www.citedy.com/dashboard/billing`

A `402` response means insufficient credits — the Zap step will fail. Set up a Zapier error notification to alert you when this happens.

---

## Error Handling in Zapier

Enable **Auto Replay** on Zap steps to retry on transient failures. For permanent errors, use Zapier's **Paths** or **Filter** steps to branch on the HTTP status code returned in the Webhooks response.

| Status | Meaning                     | Recommended action                                                   |
| ------ | --------------------------- | -------------------------------------------------------------------- |
| `401`  | Invalid or missing API key  | Pause Zap; verify key at `https://www.citedy.com/dashboard/settings` |
| `402`  | Insufficient credits        | Notify via Slack or email; top up balance                            |
| `403`  | Agent paused or key revoked | Stop Zap; restore agent access in dashboard                          |
| `429`  | Rate limited                | Add Delay step (60s) before retry                                    |
| `500`  | Server error                | Retry once with delay; notify if persistent                          |

---

## Testing Your Zap

Before activating, use Zapier's **Test step** feature on each Webhooks action:

1. Click **Test step** on the Webhooks action.
2. Zapier sends a real API request and displays the full response body.
3. Confirm the response returns `HTTP 200` and contains expected fields.
4. Map response fields (e.g., `article_id`) to subsequent steps using the field picker.

To verify connectivity without consuming credits, test against the health endpoint first:

| Field  | Value                                     |
| ------ | ----------------------------------------- |
| Method | `GET`                                     |
| URL    | `https://www.citedy.com/api/agent/health` |

Expected response: `{"status": "ok"}` — no API key required for this endpoint.

---

## Resources

- Dashboard settings (API keys): `https://www.citedy.com/dashboard/settings`
- Full OpenAPI spec: `https://www.citedy.com/openapi/agent-api.openapi.json`
- Dashboard billing: `https://www.citedy.com/dashboard/billing`
- Agent interface reference: `https://www.citedy.com/agents.md`
- MCP tools list: `https://www.citedy.com/mcp-tools.md`
