---
name: build-internetostrava-site
description: Build and maintain the InternetOstrava.cz static website, its Ostrava landing pages, lead forms, Vercel deployment, SEO metadata, structured data, crawl files, and beginner deployment documentation. Use for any content, design, SEO, GEO, offer, contact, or deployment change in the internetostrava.cz repository.
---

# Build InternetOstrava.cz

## Workflow

1. Read `references/publishing-rules.md` before changing copy, pricing, contact details, structured data, or landing pages.
2. Keep the site static, fast, and mobile-first. Preserve a visible phone and e-mail fallback.
3. Publish a new location page only when it adds unique local value. Do not generate thin keyword variants.
4. Keep one clear primary CTA: verify availability at the exact address.
5. Preserve the visible representative disclaimer. Do not imply that this is the official corporate website of PODA a.s.
6. Update `sitemap.xml` whenever an indexable URL is added or removed.
7. Run `npm run check` after changes.

## Content Rules

- Use Czech for public website copy.
- State that availability and the final offer depend on the exact address.
- Do not promise Google rankings.
- Do not invent coverage percentages, response times, review ratings, installation dates, or physical addresses.
- Ask the owner to confirm changed prices and legal details before production publishing.
- Keep city and district pages genuinely distinct. Prefer practical local guidance over repeated keyword blocks.

## Files

- Use `index.html` for the main Ostrava search intent.
- Use `dostupnost/`, `tarify/`, `kontakt/`, and district directories for focused intent pages.
- Use `assets/styles.css` and `assets/main.js` for shared presentation and behavior.
- Use `docs/START-HERE.md` for the owner handoff.
- Read `references/publishing-rules.md` for verified facts and launch blockers.
