---
name: Design subagent output verification
description: Why a design subagent's success message is not sufficient proof of a working build
---

A design subagent reported full completion of a multi-file feature batch (new modal component + edits across several pages), but the new component file it referenced from an import was never actually created, breaking the dev server and typecheck immediately.

**Why:** Subagent completion text is not a reliable signal that all referenced files exist or that the build compiles. This has now happened across more than one job in this project.

**How to apply:** After any subagent/design job that touches multiple files, always run typecheck and restart the affected workflow yourself before reporting success to the user — do not rely solely on the subagent's own summary text.
