---
name: obsidian-vault
description: Search, create, and manage notes in the Obsidian vault with wikilinks and index notes. Use when user wants to find, create, or organize notes in Obsidian.
---

# Obsidian Vault

## Vault path

1. Use `$OBSIDIAN_VAULT_PATH`.
2. If unset, STOP and ask absolute vault path.

## Naming

- Index notes aggregate related topics: `Ralph Wiggum Index.md`.
- Title Case filenames.
- No folders for org; use wikilinks/index notes.

## Linking

- Use `[[wikilinks]]`.
- Add related/dependency links at bottom.
- Index notes = wikilink lists.

## Commands

```bash
find "/mnt/d/Obsidian Vault/AI Research/" -name "*.md" | grep -i "keyword"
grep -rl "keyword" "/mnt/d/Obsidian Vault/AI Research/" --include="*.md"
grep -rl "\\[\\[Note Title\\]\\]" "/mnt/d/Obsidian Vault/AI Research/"
find "/mnt/d/Obsidian Vault/AI Research/" -name "*Index*"
```

## Create note

1. Title Case filename.
2. Write one learning unit.
3. Add related wikilinks at bottom.
4. If numbered sequence, use hierarchy.
