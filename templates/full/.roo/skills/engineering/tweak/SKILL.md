---
name: tweak
description: Direct implementation mode for small, known fixes or UI updates. Bypasses heavy diagnosis or PRD creation.
---

# Tweak

Use for small known fixes.

1. Locate target files quickly.
2. Ask only if multiple identical matches.
3. Implement exact requested fix.
4. DO NOT rewrite surrounding logic unless requested.
5. If existing test covers touched area, run it.
6. DO NOT write new tests unless asked.
7. Confirm change.
8. Offer `/commit-and-document` only after user satisfied.
