# LangChain Integration with Citedy

This guide covers two approaches for integrating Citedy's 54 AI tools into LangChain agents and chains.

**MCP Endpoint**: `https://mcp.citedy.com/mcp`
**REST Base URL**: `https://www.citedy.com`
**Authentication**: `Authorization: Bearer <your-api-key>` header on all requests

---

## Approach A: langchain-mcp-adapters (Recommended)

The `langchain-mcp-adapters` package converts MCP tool definitions into native LangChain tools
automatically. This gives you all 54 Citedy tools with zero manual wrapping.

### Installation

```bash
pip install langchain-mcp-adapters langchain-openai langgraph
```

### Connect and Load All Tools

```python
import asyncio
import os
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent


async def build_citedy_agent():
    client = MultiServerMCPClient(
        {
            "citedy": {
                "url": "https://mcp.citedy.com/mcp",
                "transport": "streamable_http",
                "headers": {
                    "Authorization": f"Bearer {os.environ['CITEDY_API_KEY']}",
                },
            }
        }
    )

    tools = await client.get_tools()
    print(f"Loaded {len(tools)} Citedy tools")  # 54 tools

    model = ChatOpenAI(model="gpt-4o")
    agent = create_react_agent(model, tools)
    return agent, client


async def main():
    agent, client = await build_citedy_agent()

    result = await agent.ainvoke({
        "messages": [
            {
                "role": "user",
                "content": (
                    "Scout competitor blog.hubspot.com, find our content gaps, "
                    "then generate an article on the top opportunity."
                ),
            }
        ]
    })
    print(result["messages"][-1].content)


asyncio.run(main())
```

### Available Tool Groups

All 54 tools are auto-loaded and grouped by namespace:

| Namespace       | Tools                                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `article.*`     | `article.generate`, `article.list`                                                                                                                                                                     |
| `gaps.*`        | `gaps.generate`, `gaps.list`                                                                                                                                                                           |
| `competitors.*` | `competitors.discover`, `competitors.scout`                                                                                                                                                            |
| `scout.*`       | `scout.reddit`, `scout.reddit.result`, `scout.x`, `scout.x.result`                                                                                                                                     |
| `leadmagnet.*`  | `leadmagnet.generate`, `leadmagnet.get`, `leadmagnet.archive`, `leadmagnet.publish`                                                                                                                    |
| `ingest.*`      | `ingest.create`, `ingest.get`, `ingest.batch`, `ingest.content.get`                                                                                                                                    |
| `products.*`    | `products.list`, `products.create`, `products.search`, `products.delete`                                                                                                                               |
| `schedule.*`    | `schedule.list`, `schedule.gaps`                                                                                                                                                                       |
| `social.*`      | `social.publish`                                                                                                                                                                                       |
| `shorts.*`      | `shorts.generate`, `shorts.get`, `shorts.script`, `shorts.avatar`, `shorts.merge`                                                                                                                      |
| `webhooks.*`    | `webhooks.list`, `webhooks.register`, `webhooks.deliveries`, `webhooks.delete`                                                                                                                         |
| `agent.*`       | `agent.health`, `agent.me`, `agent.status`                                                                                                                                                             |
| `adapt.*`       | `adapt.generate`                                                                                                                                                                                       |
| `personas.*`    | `personas.list`                                                                                                                                                                                        |
| `session.*`     | `session.create`                                                                                                                                                                                       |
| `settings.*`    | `settings.get`                                                                                                                                                                                         |
| `brand.*`       | `brand.scan`, `brand.scan.get`                                                                                                                                                                         |
| `seo.*`         | `seo.meta_tags.check`, `seo.headings.check`, `seo.links.analyze`, `seo.schema.validate`, `seo.robots.check`, `seo.sitemap.check`, `seo.og.preview`, `seo.og_image.generate`, `seo.internal_links.plan` |

### Async Polling Tools

Several tools start a background job and require a separate poll call. `create_react_agent`
handles the poll loop automatically, but be aware of these pairs when building custom chains:

| Start tool            | Poll tool             | ID field |
| --------------------- | --------------------- | -------- |
| `leadmagnet.generate` | `leadmagnet.get`      | `id`     |
| `scout.x`             | `scout.x.result`      | `runId`  |
| `scout.reddit`        | `scout.reddit.result` | `runId`  |
| `ingest.create`       | `ingest.get`          | `id`     |
| `ingest.batch`        | `ingest.get`          | `id`     |
| `shorts.generate`     | `shorts.get`          | `id`     |
| `brand.scan`          | `brand.scan.get`      | `id`     |

---

## Approach B: Custom @tool Wrappers

Use `citedy_tools.py` (see the companion file in this directory) when you need:

- Direct control over request and response handling
- Synchronous execution in non-async contexts
- Selective tool import to reduce agent context size
- Custom retry logic or structured error propagation

### Installation

```bash
pip install langchain-core requests
```

### Import Individual Tools

```python
from citedy_tools import (
    generate_article,
    list_articles,
    analyze_gaps,
    scout_competitors,
    generate_lead_magnet,
    get_account_status,
)
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

tools = [generate_article, list_articles, analyze_gaps, scout_competitors]

model = ChatOpenAI(model="gpt-4o")
agent = create_react_agent(model, tools)

result = agent.invoke({
    "messages": [
        {"role": "user", "content": "Generate an article about AI content marketing"}
    ]
})
print(result["messages"][-1].content)
```

### Combine MCP Tools with Custom Wrappers

You can load all 54 MCP tools and then replace specific ones with your own wrappers:

```python
async def build_hybrid_agent():
    mcp_tools = await client.get_tools()

    # Drop the MCP article.generate in favour of our custom wrapper
    # MCP tool names use double underscores when accessed via LangChain
    filtered = [t for t in mcp_tools if t.name != "article__generate"]
    all_tools = filtered + [generate_article]  # custom wrapper with extra logic

    return create_react_agent(model, all_tools)
```

---

## Example: Content Pipeline Agent

An end-to-end agent that scouts a competitor, identifies content gaps, and generates an article
on the top opportunity — all in a single invocation.

```python
import asyncio
import os
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage

SYSTEM_PROMPT = """You are a content marketing strategist using the Citedy platform.

Your workflow for content pipeline tasks:
1. Call agent.status to confirm sufficient credits before starting.
2. Call competitors.scout with the provided domain (mode="fast").
3. Call gaps.generate with competitor_urls set to that domain URL.
4. Pick the highest-impact gap topic from the results.
5. Call article.generate with that topic, size="standard", enable_search=true.
6. Return a concise summary including the published article URL.

Do not skip any step. Always wait for each tool result before proceeding.
"""


async def run_content_pipeline(competitor_domain: str) -> str:
    client = MultiServerMCPClient(
        {
            "citedy": {
                "url": "https://mcp.citedy.com/mcp",
                "transport": "streamable_http",
                "headers": {"Authorization": f"Bearer {os.environ['CITEDY_API_KEY']}"},
            }
        }
    )

    tools = await client.get_tools()
    model = ChatOpenAI(model="gpt-4o", temperature=0)
    agent = create_react_agent(model, tools, state_modifier=SYSTEM_PROMPT)

    result = await agent.ainvoke({
        "messages": [
            HumanMessage(
                content=f"Run the full content pipeline for competitor: {competitor_domain}"
            )
        ]
    })

    return result["messages"][-1].content


if __name__ == "__main__":
    output = asyncio.run(run_content_pipeline("https://blog.hubspot.com"))
    print(output)
```

**Expected agent trace:**

```
> agent.status           # verify credits available
> competitors.scout      # domain="https://blog.hubspot.com", mode="fast"
> gaps.generate          # competitor_urls=["https://blog.hubspot.com"]
> article.generate       # topic="<top gap keyword>", size="standard", enable_search=true
< Article published: https://<your-blog>.citedy.com/<slug>
```

**Article size options** accepted by `article.generate`:

| Size       | Approx. word count | Use case                       |
| ---------- | ------------------ | ------------------------------ |
| `mini`     | ~300 words         | Quick updates, social snippets |
| `standard` | ~800 words         | Regular blog posts             |
| `full`     | ~1 500 words       | In-depth guides                |
| `pillar`   | ~3 000+ words      | Cornerstone / pillar content   |

---

## Example: RAG with Citedy Knowledge Base

Use the `products.*` tools to build a retrieval-augmented generation pipeline over your product
knowledge documents stored in Citedy.

```python
import asyncio
import os
import requests
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage

RAG_PROMPT = """You are a product expert. When answering questions:
1. Always call products.search first to retrieve relevant knowledge documents.
2. Base your answer strictly on the retrieved content.
3. If no relevant documents are found, say so clearly — do not hallucinate product details.
4. Call products.list when asked what knowledge bases are available.
"""


async def run_knowledge_agent(question: str) -> str:
    client = MultiServerMCPClient(
        {
            "citedy": {
                "url": "https://mcp.citedy.com/mcp",
                "transport": "streamable_http",
                "headers": {"Authorization": f"Bearer {os.environ['CITEDY_API_KEY']}"},
            }
        }
    )

    all_tools = await client.get_tools()

    # Narrow to knowledge-relevant tools to reduce context window usage
    knowledge_tools = [
        t for t in all_tools
        if t.name.startswith("products") or t.name in ("agent__me", "agent__status")
    ]

    model = ChatOpenAI(model="gpt-4o")
    agent = create_react_agent(model, knowledge_tools, state_modifier=RAG_PROMPT)

    result = await agent.ainvoke({
        "messages": [HumanMessage(content=question)]
    })

    return result["messages"][-1].content


def upload_knowledge_document(title: str, content: str) -> dict:
    """Upload a product knowledge document via REST before querying."""
    resp = requests.post(
        "https://www.citedy.com/api/agent/products",
        headers={"Authorization": f"Bearer {os.environ['CITEDY_API_KEY']}"},
        json={"title": title, "content": content},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()


async def setup_and_query():
    # Step 1: upload a knowledge document
    upload_knowledge_document(
        title="Enterprise Feature Specs",
        content="Our platform supports SSO, audit logs, custom roles, and SLA guarantees for enterprise customers...",
    )

    # Step 2: query via agent using retrieved context
    answer = await run_knowledge_agent(
        "What features does our product support for enterprise customers?"
    )
    print(answer)


asyncio.run(setup_and_query())
```

---

## Authentication Reference

All Citedy API calls require the `Authorization: Bearer` header:

```python
import os

api_key = os.environ["CITEDY_API_KEY"]
headers = {"Authorization": f"Bearer {api_key}"}
```

Obtain your API key from the Citedy developer portal: `https://www.citedy.com/dashboard/settings`

---

## Error Codes

| Status | Meaning                | Recommended action                           |
| ------ | ---------------------- | -------------------------------------------- |
| `401`  | Invalid or missing key | Check `CITEDY_API_KEY` environment variable  |
| `402`  | Insufficient credits   | Top up at dashboard or reduce request `size` |
| `429`  | Rate limit exceeded    | Retry with exponential back-off              |
| `500`  | Internal server error  | Retry once; contact support if persistent    |

---

## Related Documentation

- [MCP Tools Reference](https://www.citedy.com/mcp-tools.md) — full 52-tool catalog with endpoint mapping
- [OpenAPI Spec](https://www.citedy.com/openapi/agent-api.openapi.json) — complete REST API contract
- [MCP README](../README.md) — MCP server setup and infrastructure details
- [citedy_tools.py](./citedy_tools.py) — companion Python file with `@tool`-decorated REST wrappers
