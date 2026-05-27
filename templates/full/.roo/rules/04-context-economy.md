# Context Economy

Use the smallest read that preserves correctness.

Prefer `list_files`, `search_files`, or `codebase_search` before full-file reads.

When reading files, prefer targeted line ranges or indentation/block reads when the relevant area is known.

Batch related small reads when useful.

Do not re-read unchanged files unless needed.

For long command output, summarize or search the output instead of dumping everything.
