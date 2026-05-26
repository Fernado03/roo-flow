# Issue tracker: GitHub

Issues/PRDs: GitHub Issues. Use `gh` in repo; let `gh` infer remote.

## Commands

```bash
gh issue create --title "..." --body "..."
gh issue view {number} --comments
gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'
gh issue comment {number} --body "..."
gh issue edit {number} --add-label "..."
gh issue edit {number} --remove-label "..."
gh issue close {number} --comment "..."
```

## Rules

- Publish = create GitHub issue.
- Fetch = `gh issue view {number} --comments`.
- Use heredoc for multiline bodies.
