---
name: git-guardrails-claude-code
description: Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, branch -D, etc.) before they execute. Use when user wants to prevent destructive git operations, add git safety hooks, or block git push/reset in Claude Code.
---

# Setup Git Guardrails

Block patterns: `git push`, `git reset --hard`, `git clean -f`, `git clean -fd`, `git branch -D`, `git checkout .`, `git restore .`, `push --force`, `reset --hard`.

## Process

1. Ask scope: Project `.claude/settings.json` or Global `~/.claude/settings.json`.
2. Copy `scripts/block-dangerous-git.sh` to `.claude/hooks/block-dangerous-git.sh` in selected scope.
3. Run `chmod +x {script}`.
4. Merge hook into settings; DO NOT overwrite existing settings.

Project settings:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-git.sh"
          }
        ]
      }
    ]
  }
}
```

Global settings:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/block-dangerous-git.sh"
          }
        ]
      }
    ]
  }
}
```

5. Ask pattern customisation.
6. Verify:

```bash
echo '{"tool_input":{"command":"git push origin main"}}' | {path-to-script}
```

Expected: exit 2 + `BLOCKED` stderr.
