# Citedy SEO Agent — Windsurf Integration

Windsurf IDE integration for the Citedy SEO Agent via MCP (Model Context Protocol). Gives Cascade access to SEO trend scouting, competitor analysis, article generation, social adaptations, AI video shorts, content ingestion, and lead magnets.

## Setup

### Step 1: Add MCP Server to Windsurf

Add the Citedy MCP server to your Windsurf MCP config file at `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "citedy": {
      "serverUrl": "https://mcp.citedy.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:CITEDY_API_KEY}"
      }
    }
  }
}
```

> **Note**: Windsurf uses `serverUrl` for Streamable HTTP transport (not `url`).
> **Note**: Environment variables use `${env:VAR_NAME}` syntax in Windsurf MCP config.

### Step 2: Copy Windsurf Rules

Copy the rules file to your project's `.windsurf/rules/` directory:

```bash
cp .windsurf/rules/citedy.md /your-project/.windsurf/rules/citedy.md
```

This tells Cascade when and how to use Citedy MCP tools automatically.

### Step 3: Set the API Key

Set the `CITEDY_API_KEY` environment variable in your shell profile or system environment:

```bash
# ~/.zshrc or ~/.bashrc
export CITEDY_API_KEY="your_api_key_here"
```

Then restart Windsurf for the variable to take effect.

## Get an API Key

Register at **https://www.citedy.com** or call the registration endpoint directly:

```bash
curl -X POST https://www.citedy.com/api/agent/register \
  -H "Content-Type: application/json" \
  -d '{"agentName": "My Windsurf Agent", "email": "you@example.com"}'
```

The response includes an `approvalUrl`. Open it to approve the agent and retrieve your API key.

## What You Can Do

Once configured, ask Cascade in natural language:

- "Scout trending topics on Reddit about AI tools"
- "Find content gaps for my competitor example.com"
- "Generate an SEO article about Next.js performance in Spanish"
- "Adapt this article for LinkedIn and X"
- "Create an AI video short from this article"
- "Ingest this YouTube video and summarize it"
- "Generate a lead magnet checklist for SaaS onboarding"

## Links

- **Platform**: https://www.citedy.com
- **MCP endpoint**: https://mcp.citedy.com/mcp
- **Full skill docs**: https://www.citedy.com/public/skill.md
- **Dashboard**: https://www.citedy.com/dashboard
