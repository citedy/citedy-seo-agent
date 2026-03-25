# AutoGPT Marketplace — Submission Guide (copy-paste ready)

All fields below are ready to paste into the Publish Agent form.
1 credit = $0.01 USD | API key: citedy.com → Dashboard → Settings

---

## 1. [x] Topic to Publish by Citedy

**Subheader:** One Topic. Full SEO Article. Done.

**Category:** Writing & Content

**Description:**
Turn any topic into a complete, SEO-optimized article with AI illustrations and voice-over — all in one step (15-48 credits). Citedy handles research, outline, structure, internal linking, and publishing automatically. No drafts, no editing, no manual work. The go-to agent for teams producing consistent long-form content at scale. Supports brand voice, custom tone, and automatic image generation. Every article is optimized for both Google and AI search engines (GEO). Connect your blog and articles publish directly to your site.

**Instructions:**

1. Get your API key at citedy.com → Dashboard → Settings
2. Pass a JSON object as input with your API key and topic:
   {"apiKey": "your-citedy-api-key", "topic": "best project management tools 2026", "mode": "standard"}
3. Optional fields: "tone" (professional/casual/technical), "wordCount" (1500-5000), "generateImages" (true/false), "generateVoice" (true/false)
4. The agent returns a full article with SEO metadata, internal links, and a published URL. Processing takes 2-5 minutes.

---

## 2. [x] URL to Publish by Citedy

**Subheader:** Repurpose Any Content Into Ranked Articles

**Category:** Writing & Content

**Description:**
Feed one or more source URLs — competitor articles, research papers, news — and get a fresh, SEO-optimized article ready to publish. The agent extracts core value from existing content and rewrites it with your brand voice and proper optimization. Stop starting from scratch; repurpose what already works. Supports multiple source URLs for richer, more comprehensive output. Each article includes internal linking, meta tags, and is ready for immediate publishing to your connected blog.

**Instructions:**

1. Get your API key at citedy.com → Dashboard → Settings
2. Pass a JSON object as input:
   {"apiKey": "your-citedy-api-key", "urls": ["https://example.com/article-to-repurpose"], "mode": "standard"}
3. You can pass multiple URLs in the array — the agent combines insights from all sources
4. Optional fields: "tone", "wordCount", "generateImages" (true/false)
5. Returns a fully optimized article with unique content. Processing takes 2-5 minutes.

---

## 3. [x] Turbo Article by Citedy

**Subheader:** SEO Articles in Seconds, Not Hours

**Category:** Writing & Content

**Description:**
Generate a fully optimized SEO article from a single keyword for just 2-4 credits — the fastest, cheapest path from idea to published content. Turbo mode strips the extras and delivers a clean, search-ready article at maximum speed. Ideal for high-volume content operations where cost per article matters. Perfect for building topical authority quickly by covering dozens of keywords in a single session. Articles include H2/H3 structure, meta description, and internal link suggestions.

**Instructions:**

1. Get your API key at citedy.com → Dashboard → Settings
2. Pass a JSON object as input:
   {"apiKey": "your-citedy-api-key", "topic": "how to use AI for email marketing", "mode": "turbo"}
3. Turbo mode produces articles in under 60 seconds at 2-4 credits each
4. Best for: keyword coverage at scale, topical clusters, supporting articles
5. Returns article with title, content, meta description, and slug.

---

## 4. [x] Trend Scan by Citedy

**Subheader:** Multi-Source Trends in One Fast Sweep

**Category:** Marketing & SEO

**Description:**
Run a simultaneous trend scan across X, Reddit, HackerNews, and the open web for 2-8 credits. Get a unified, ranked view of what's gaining momentum right now. Unlike single-source scouts, Trend Scan triangulates signals across platforms so you capture trends with real cross-channel traction. Use it as your daily content intelligence briefing. Each trend includes relevance score, source breakdown, and suggested article angles. Pair results with any Citedy article agent to publish while momentum lasts.

**Instructions:**

1. Get your API key at citedy.com → Dashboard → Settings
2. Pass a JSON object as input:
   {"apiKey": "your-citedy-api-key", "niche": "AI productivity tools", "sources": ["x", "reddit", "hackernews", "web"]}
3. Optional: narrow by "sources" array to scan specific platforms only
4. Returns ranked list of trending topics with scores, sources, and suggested angles
5. Processing is async — results arrive in 1-3 minutes depending on source count.

---

## 5. [x] Trend Scout X by Citedy

**Subheader:** Catch Viral X Trends Before Competitors

**Category:** Marketing & SEO

**Description:**
Monitor X (Twitter) in real time and surface trending discussions most relevant to your niche, returned as a ranked list of publishable topic opportunities. The agent processes live signals across thousands of posts so you can act on momentum while it lasts. Each result includes engagement metrics, trend velocity, and a ready-to-use article angle. Pair with Topic to Publish or Turbo Article to go from social signal to published SEO content in minutes. Runs asynchronously — results delivered when ready.

**Instructions:**

1. Get your API key at citedy.com → Dashboard → Settings
2. Pass a JSON object as input:
   {"apiKey": "your-citedy-api-key", "niche": "SaaS marketing"}
3. The agent scans X for trending conversations matching your niche
4. Returns ranked topic opportunities with engagement data and suggested angles
5. Async processing — typically completes in 1-2 minutes. Poll the returned taskId for results.

---

## 6. [x] Trend Scout Reddit by Citedy

**Subheader:** Reddit's Hottest Topics, Ready to Publish

**Category:** Marketing & SEO

**Description:**
Scan Reddit communities for rising conversations and extract high-value content opportunities your audience is already searching for. Returns structured, ready-to-act topic suggestions sourced from real organic discussion — not keyword tool guesses. The agent identifies threads gaining traction, extracts core questions and pain points, and packages them as publishable content briefs. Turn community intelligence into SEO content before the trend peaks. Perfect for finding topics with proven audience demand.

**Instructions:**

1. Get your API key at citedy.com → Dashboard → Settings
2. Pass a JSON object as input:
   {"apiKey": "your-citedy-api-key", "niche": "remote work tools", "subreddits": ["productivity", "SaaS"]}
3. Optional: specify "subreddits" array to target specific communities
4. Returns ranked topics with Reddit thread links, upvote velocity, and content angles
5. Async processing — results in 1-2 minutes.

---

## 7. [x] Gap Generator by Citedy

**Subheader:** Rank Where Competitors Already Rank

**Category:** Marketing & SEO

**Description:**
Analyze your competitors and automatically surface content gaps where they earn traffic and you don't — for approximately 40 credits. The agent cross-references competitor domains against your existing content and outputs a prioritized list of topics with genuine ranking potential. Each gap includes estimated search volume, competitor URL, difficulty score, and a suggested article outline. Stop guessing what to write next; close the gaps that cost you traffic today. Works with any number of competitor domains.

**Instructions:**

1. Get your API key at citedy.com → Dashboard → Settings
2. Pass a JSON object as input:
   {"apiKey": "your-citedy-api-key", "competitors": ["competitor1.com", "competitor2.com"], "yourDomain": "yourdomain.com"}
3. Add as many competitor domains as needed in the array
4. Returns prioritized gap list with keywords, search volume, difficulty, and suggested outlines
5. Processing takes 3-5 minutes due to deep competitor analysis.

---

## 8. [x] Viral Micro-Post by Citedy

**Subheader:** Scroll-Stopping Social Copy in One Prompt

**Category:** Marketing & SEO

**Description:**
Generate concise, platform-native social posts from any topic or article in seconds — optimized for engagement on X, LinkedIn, and beyond. Handles voice, hooks, hashtags, and format so your social presence stays active even when your team is focused elsewhere. Each output is tailored to platform conventions: thread-ready for X, professional for LinkedIn, punchy for short-form. Ideal for agencies managing multiple brand accounts who need fast, on-brand output at volume. Just 1-2 credits per post.

**Instructions:**

1. Get your API key at citedy.com → Dashboard → Settings
2. Pass a JSON object as input:
   {"apiKey": "your-citedy-api-key", "topic": "Why AI SEO tools save 10 hours per week", "platforms": ["x", "linkedin"]}
3. Optional: pass "articleUrl" instead of "topic" to generate posts from an existing article
4. Optional: "tone" (professional/casual/bold), "includeHashtags" (true/false)
5. Returns platform-specific posts ready to copy and publish. Instant results.

---

## 9. [x] Lead Magnet Generator by Citedy

**Subheader:** Generate Lead Magnets That Actually Convert

**Category:** Marketing & SEO

**Description:**
Automatically produce downloadable PDF lead magnets — checklists, swipe files, or strategic frameworks — from any topic (30-100 credits). Each output is professionally structured with branded design, clear formatting, and actionable content ready to gate behind a signup form. No manual design work needed. Convert your content traffic into email subscribers with assets that deliver real value. Choose from three lead magnet types, each optimized for different conversion goals and audience segments.

**Instructions:**

1. Get your API key at citedy.com → Dashboard → Settings
2. Pass a JSON object as input:
   {"apiKey": "your-citedy-api-key", "topic": "Complete SEO Audit Checklist", "type": "checklist"}
3. Supported types: "checklist", "swipe-file", "framework"
4. Optional: "brandName", "brandColor" for branded output
5. Returns a download URL for the generated PDF. Processing takes 2-4 minutes.

---

## 10. [x] Content Ingestion by Citedy

**Subheader:** Turn Any URL Into Structured Content

**Category:** Writing & Content

**Description:**
Feed any URL — YouTube video, web article, PDF, or audio file — and receive clean, structured content extracted and ready for repurposing (1-55 credits depending on source type). Eliminates manual transcription and reformatting, giving your entire content library a second life. Output includes structured sections, key takeaways, timestamps (for video/audio), and metadata. The essential first step for any repurposing workflow — ingest once, create articles, social posts, and lead magnets from the same source.

**Instructions:**

1. Get your API key at citedy.com → Dashboard → Settings
2. Pass a JSON object as input:
   {"apiKey": "your-citedy-api-key", "url": "https://youtube.com/watch?v=example"}
3. Supported sources: YouTube videos, web articles, PDF documents, audio files
4. Returns structured content with sections, key points, and metadata
5. Processing time varies: web pages ~30s, YouTube videos 1-3 min, long audio up to 5 min.

---

_Copy-paste ready for AutoGPT Marketplace Publish Agent form._
_Last updated: 2026-03-10_
