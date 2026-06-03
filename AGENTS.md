# InternetOstrava.cz Project

Use the project skill at `.agents/skills/build-internetostrava-site/SKILL.md` for every website change.

Run:

```powershell
npm run check
```

before handing off changes.

After website content, design, asset, or code changes are approved and `npm run check` passes, commit the changes and push `main` so Vercel deploys the current version.

When CSS or assets change, update the affected page's cache-busting query string so Vercel/CDN and browser cache cannot keep showing the old design.
