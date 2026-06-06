# InternetOstrava.cz Project

Use the project skill at `.agents/skills/build-internetostrava-site/SKILL.md` for every website change.

Also read `docs/CODEX-CONTEXT.md` at the start of a new Codex session. It
contains the preserved context from the earlier project chats, owner
preferences, recent commits, and current lead/SEO/design direction.

## Working Principles

Prefer careful, simple work over fast but noisy changes. For trivial tasks, use
common sense, but keep these rules in mind:

- State assumptions and uncertainties before implementation. If a request has
  multiple plausible interpretations, name the tradeoff before choosing.
- Prefer the smallest solution that solves the actual request. Do not add
  speculative features, abstractions, or configurability that were not asked for.
- Touch only files and lines that are needed for the user request. Do not
  refactor, reformat, or clean unrelated code; only remove dead code created by
  your own change.
- Define how success will be checked, then verify it. For multi-step work, keep
  each step tied to a concrete check such as `npm run check`, a targeted search,
  or a focused browser/manual verification.

Run:

```powershell
npm run check
```

before handing off changes.

After website content, design, asset, or code changes are approved and `npm run check` passes, commit the changes and push `main` so Vercel deploys the current version.

When CSS or assets change, update the affected page's cache-busting query string so Vercel/CDN and browser cache cannot keep showing the old design.

Any new important image or video added to the desktop design must also have explicit tablet and mobile behavior. Do not hide key visual assets on smaller screens; adapt their size, crop, position, aspect ratio, overlay, and readable text treatment for desktop, tablet, and mobile.
