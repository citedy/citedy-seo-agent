#!/usr/bin/env bash
set -euo pipefail

SKILL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

require_file() {
  local file_path="$1"
  if [[ ! -f "$file_path" ]]; then
    echo "ERROR: missing required file: $file_path" >&2
    exit 1
  fi
}

require_file "$SKILL_ROOT/SKILL.md"
require_file "$SKILL_ROOT/README.md"
require_file "$SKILL_ROOT/references/orchestration-rules.md"
require_file "$SKILL_ROOT/references/transport-selection.md"
require_file "$SKILL_ROOT/references/prompt-styles.md"
require_file "$SKILL_ROOT/references/avatar-selection.md"
require_file "$SKILL_ROOT/references/publishing-playbooks.md"
require_file "$SKILL_ROOT/references/troubleshooting.md"
require_file "$SKILL_ROOT/state/UGC-BRAND.md"
require_file "$SKILL_ROOT/state/UGC-AVATAR.md"
require_file "$SKILL_ROOT/state/ugc-video-log.jsonl"

node - "$SKILL_ROOT" <<'NODE'
const fs = require('fs');
const path = require('path');

const skillRoot = process.argv[2];
const skillPath = path.join(skillRoot, 'SKILL.md');
const skillText = fs.readFileSync(skillPath, 'utf8');
const frontmatter = skillText.match(/^---\n([\s\S]*?)\n---\n/);

if (!frontmatter) {
  throw new Error('Missing YAML frontmatter');
}

for (const key of ['name:', 'title:', 'description:', 'version:', 'author:']) {
  if (!frontmatter[1].includes(key)) {
    throw new Error(`Missing frontmatter key: ${key}`);
  }
}

const filesToScan = [
  path.join(skillRoot, 'SKILL.md'),
  path.join(skillRoot, 'README.md'),
  path.join(skillRoot, 'references/orchestration-rules.md'),
  path.join(skillRoot, 'references/transport-selection.md'),
  path.join(skillRoot, 'references/prompt-styles.md'),
  path.join(skillRoot, 'references/avatar-selection.md'),
  path.join(skillRoot, 'references/publishing-playbooks.md'),
  path.join(skillRoot, 'references/troubleshooting.md'),
  path.join(skillRoot, 'state/UGC-BRAND.md'),
  path.join(skillRoot, 'state/UGC-AVATAR.md'),
  path.join(skillRoot, 'state/ugc-video-log.jsonl'),
];

const forbidden = [/\/Users\//, /\.claude\//, /\.codex\//, /file:\/\//, /vscode:\/\//];

for (const file of filesToScan) {
  const text = fs.readFileSync(file, 'utf8');
  for (const re of forbidden) {
    if (re.test(text)) {
      throw new Error(`Forbidden public-package reference in ${path.basename(file)}: ${re}`);
    }
  }
}

console.log('citedy-video-shorts package validation passed');
NODE
