"""
Citedy LangChain Tools — Approach B: custom @tool wrappers over the Citedy REST API.

Usage:
    from citedy_tools import generate_article, list_articles, analyze_gaps, \
        scout_competitors, generate_lead_magnet, get_account_status

    from langgraph.prebuilt import create_react_agent
    from langchain_openai import ChatOpenAI

    tools = [generate_article, list_articles, analyze_gaps, scout_competitors]
    agent = create_react_agent(ChatOpenAI(model="gpt-4o"), tools)

Authentication:
    Set the CITEDY_API_KEY environment variable before importing.

REST base URL: https://www.citedy.com
Full API reference: public/openapi/agent-api.openapi.json
"""

import os
from typing import Literal

import requests
from langchain_core.tools import tool

_BASE_URL = "https://www.citedy.com"
_TIMEOUT = 120  # seconds — article generation can take up to ~90 s


def _headers() -> dict[str, str]:
    api_key = os.environ.get("CITEDY_API_KEY", "")
    if not api_key:
        raise EnvironmentError(
            "CITEDY_API_KEY environment variable is not set. "
            "Obtain your key from https://www.citedy.com/dashboard/settings"
        )
    return {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}


def _post(path: str, payload: dict) -> dict:
    resp = requests.post(
        f"{_BASE_URL}{path}",
        headers=_headers(),
        json=payload,
        timeout=_TIMEOUT,
    )
    resp.raise_for_status()
    return resp.json()


def _get(path: str, params: dict | None = None) -> dict:
    resp = requests.get(
        f"{_BASE_URL}{path}",
        headers=_headers(),
        params=params,
        timeout=_TIMEOUT,
    )
    resp.raise_for_status()
    return resp.json()


# ---------------------------------------------------------------------------
# Article tools
# ---------------------------------------------------------------------------


@tool
def generate_article(
    topic: str,
    size: Literal["mini", "standard", "full", "pillar"] = "standard",
    enable_search: bool = False,
    language: str = "en",
    mode: Literal["standard", "turbo"] = "standard",
) -> dict:
    """Generate a new SEO-optimised blog article using the Citedy Autopilot.

    Args:
        topic: The subject or title of the article to generate (1–500 characters).
        size: Article length — "mini" (~300 words), "standard" (~800 words),
              "full" (~1 500 words), or "pillar" (~3 000+ words).
              Defaults to "standard".
        enable_search: When True, Citedy enriches the article with live web
              search results for up-to-date facts. Defaults to False.
        language: BCP-47 language code for the output article, e.g. "en", "de",
              "pt". Defaults to "en".
        mode: Generation mode — "standard" for higher quality, "turbo" for
              faster output. Defaults to "standard".

    Returns:
        A dict containing:
            article_id (str | None): UUID of the created article.
            title (str): Generated article title.
            slug (str): URL slug.
            article_url (str): Public URL of the published article.
            status (str): Publication status (e.g. "published").
            word_count (int): Approximate word count.
            credits_used (float): Credits deducted for this generation.
    """
    payload: dict = {
        "topic": topic,
        "size": size,
        "enable_search": enable_search,
        "language": language,
        "mode": mode,
    }
    return _post("/api/agent/autopilot", payload)


@tool
def list_articles(
    status: str = "published",
    limit: int = 10,
    offset: int = 0,
) -> list:
    """List previously generated articles for the current workspace.

    Args:
        status: Filter by article status. Common values: "published", "draft",
              "review". Pass an empty string to retrieve all statuses.
              Defaults to "published".
        limit: Maximum number of articles to return (1–100). Defaults to 10.
        offset: Pagination offset — number of records to skip. Defaults to 0.

    Returns:
        A list of article summary objects, each containing:
            id (str): Article UUID.
            title (str): Article title.
            slug (str): URL slug.
            status (str): Current publication status.
            word_count (int): Approximate word count.
            created_at (str): ISO 8601 creation timestamp.
    """
    params: dict = {"limit": limit, "offset": offset}
    if status:
        params["status"] = status
    data = _get("/api/agent/articles", params=params)
    # The API returns {"articles": [...], "total": int}
    return data.get("articles", data)


# ---------------------------------------------------------------------------
# Content gap tools
# ---------------------------------------------------------------------------


@tool
def analyze_gaps(competitor_urls: list[str]) -> dict:
    """Generate SEO/GEO content gap opportunities by analysing competitor URLs.

    Citedy compares the competitor's published content against your blog to
    surface topics you are missing or under-serving.

    Args:
        competitor_urls: List of 1–5 competitor page or domain URLs to analyse,
              e.g. ["https://blog.hubspot.com", "https://backlinko.com"].
              Must be valid URIs.

    Returns:
        A dict containing:
            gaps_found (int): Number of content gap opportunities identified.
            gaps (list[dict]): List of gap objects with keyword, difficulty,
                search volume, and suggested angle.
            credits_used (float): Credits deducted for this analysis.
    """
    if not competitor_urls:
        raise ValueError("competitor_urls must contain at least one URL.")
    if len(competitor_urls) > 5:
        raise ValueError("competitor_urls must contain at most 5 URLs.")
    return _post("/api/agent/gaps/generate", {"competitor_urls": competitor_urls})


# ---------------------------------------------------------------------------
# Competitor tools
# ---------------------------------------------------------------------------


@tool
def scout_competitors(
    domain: str,
    mode: Literal["fast", "ultimate"] = "fast",
    topic: str = "",
    language: str = "en",
) -> dict:
    """Analyse a competitor domain to extract content strategy intelligence.

    Returns a SWOT-style analysis of the competitor's content strengths,
    weaknesses, opportunities, and threats relative to your niche.

    Args:
        domain: Full URI of the competitor domain to analyse,
              e.g. "https://blog.hubspot.com". Must be a valid URI.
        mode: Analysis depth — "fast" for a quick overview (lower cost) or
              "ultimate" for deep analysis (higher cost). Defaults to "fast".
        topic: Optional niche or focus topic to narrow the analysis,
              e.g. "email marketing". Leave empty for a general analysis.
        language: BCP-47 language code for the analysis output. Defaults to "en".

    Returns:
        A dict containing competitor intelligence with fields:
            domain (str): Analysed domain.
            strengths (list[str]): Content areas where the competitor excels.
            weaknesses (list[str]): Content gaps or weaknesses found.
            opportunities (list[str]): Topics you can target to outperform them.
            threats (list[str]): Areas where they may outrank you.
            content_strategy (str): Summary of their detected content strategy.
            credits_used (float): Credits deducted for this scout.
    """
    payload: dict = {"domain": domain, "mode": mode, "language": language}
    if topic:
        payload["topic"] = topic
    return _post("/api/agent/competitors/scout", payload)


# ---------------------------------------------------------------------------
# Lead magnet tools
# ---------------------------------------------------------------------------


@tool
def generate_lead_magnet(
    topic: str,
    magnet_type: Literal["checklist", "swipe_file", "framework"] = "checklist",
    niche: str = "",
    language: Literal["en", "pt", "de", "es", "fr", "it"] = "en",
    platform: Literal["twitter", "linkedin"] = "twitter",
) -> dict:
    """Start generation of a lead magnet asset (checklist, swipe file, or framework).

    This is an async operation. The API immediately returns a job ID with status
    "generating". Poll the result using the GET /api/agent/lead-magnets/{id}
    endpoint (or the `leadmagnet.get` MCP tool) until status is "completed".

    Args:
        topic: Subject of the lead magnet (3–200 characters),
              e.g. "SaaS onboarding best practices".
        magnet_type: Lead magnet format:
              - "checklist": Step-by-step action checklist.
              - "swipe_file": Curated examples and templates to copy.
              - "framework": Structured methodology or decision framework.
              Defaults to "checklist".
        niche: Optional industry or audience niche to tailor the content,
              e.g. "B2B SaaS", "e-commerce". Max 100 characters.
        language: Output language code. Supported: "en", "pt", "de", "es",
              "fr", "it". Defaults to "en".
        platform: Target social platform for formatting hints — "twitter" or
              "linkedin". Defaults to "twitter".

    Returns:
        A dict containing:
            id (str): UUID — use this to poll for the completed result.
            status (str): Always "generating" on initial response.
            type (str): The lead magnet type requested.
            topic (str): The topic submitted.
            credits_charged (float): Credits pre-charged for this job.
    """
    payload: dict = {
        "topic": topic,
        "type": magnet_type,
        "language": language,
        "platform": platform,
    }
    if niche:
        payload["niche"] = niche
    return _post("/api/agent/lead-magnets", payload)


# ---------------------------------------------------------------------------
# Account tools
# ---------------------------------------------------------------------------


@tool
def get_account_status() -> dict:
    """Return the current agent's profile, credit balances, and usage limits.

    Use this tool to check available credits before starting expensive operations
    such as article generation, competitor scouting, or lead magnet creation.

    Returns:
        A dict containing agent profile and balance information, including:
            agent_id (str): Unique agent identifier.
            agent_name (str): Agent display name.
            blog_url (str | None): Citedy blog URL.
            total_credits_used (float): Lifetime credits used.
            tenant_balance (dict): Object with 'credits' (float) and 'status' (str: healthy/low/empty).
            rate_limits (dict): Per-operation remaining limits and reset timestamps.
    """
    return _get("/api/agent/me")
