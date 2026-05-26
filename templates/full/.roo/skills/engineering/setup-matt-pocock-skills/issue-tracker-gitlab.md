# Issue tracker: GitLab

Issues/PRDs: GitLab Issues. Use `glab` in repo; let `glab` infer remote.

## Commands

```bash
glab issue create --title "..." --description "..."
glab issue view {number} --comments
glab issue list -F json
glab issue note {number} --message "..."
glab issue update {number} --label "..."
glab issue update {number} --unlabel "..."
glab issue note {number} --message "..."
glab issue close {number}
```

## Rules

- Publish = create GitLab issue.
- Fetch = `glab issue view {number} --comments`.
- GitLab PRs = merge requests; use `glab mr ...`.
- Post note before `glab issue close`.
