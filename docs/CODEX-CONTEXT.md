# Codex Context - InternetOstrava.cz

This file preserves the important working context from the Codex chats for
future sessions. It is intentionally written in plain ASCII to avoid encoding
problems in PowerShell and HTML tooling.

## Source Chats

- `019e8959-b696-7c53-a6ec-46011f4006b0` - `Vytvor novy web internetostrava.cz`
- `019e8bd9-256b-7782-b4ee-0122f8156d0d` - `Obnovit Codex a pokracovat`

## Project Folder

- Workspace: `C:\Users\junke\OneDrive\Dokumenty\web-internetostrava`
- GitHub repo: `ALFONZ113/internetostrava-cz`
- Vercel preview/production project currently uses the Vercel domain first.
  The custom domain will be connected later when the owner is satisfied.

## Required Startup For Every New Codex Session

1. Read `AGENTS.md`.
2. Read `.agents/skills/build-internetostrava-site/SKILL.md`.
3. Read this file, `docs/CODEX-CONTEXT.md`.
4. Check current git status before editing.
5. For website changes, run `npm run check`.
6. For approved website content, design, asset, or code changes, commit and
   push `main` so Vercel deploys.

## Core Goal

Build a strong lead-generation website for InternetOstrava.cz focused on:

- `PODA internet`
- `PODA internet Ostrava`
- `internet PODA Ostrava`
- `internet Ostrava`
- `PODA Poruba`
- `internet Poruba`
- relevant Ostrava district searches

The web should compete with `internet-ostrava.cz` without copying it.
Do not promise rankings. Build a useful, fast, local, conversion-focused site.

## Legal And Copy Guardrails

- Public website copy is Czech.
- Do not imply this is the official corporate website of PODA a.s.
- Preserve the visible disclaimer: this is an independent/representative site
  of a PODA obchodni zastupce, not the corporate PODA website.
- Availability and final technical option depend on the exact address.
- Tariffs are not "orientacni"; they are concrete selectable variants, but
  availability of the selected tariff must still be confirmed by address.
- Do not invent coverage percentages, ratings, installation dates, response
  times, addresses, or official claims.
- Bohumin was explicitly removed from the plan and should not be added unless
  the owner asks again.

## Current Website Shape

Important pages/directories:

- `index.html` - main Ostrava/PODA internet landing page.
- `tarify/` - tariff page.
- `dostupnost/` - availability page.
- `kontakt/` - contact page.
- `poda-internet-ostrava/` - focused PODA internet landing page.
- `internet-ostrava-poruba/`
- `internet-ostrava-jih/`
- `internet-moravska-ostrava/`
- `internet-marianske-hory/`
- `internet-ostrava-vitkovice/`
- `internet-slezska-ostrava/`

Keep district pages unique and practical. Do not create thin keyword clones.

## Design Direction

Current visual direction:

- Industrial Ostrava identity.
- Dark graphite/black, strong white type, electric blue, mustard yellow.
- Main hero uses an industrial Ostrava image style.
- Important desktop images must also be visible and adapted on tablet/mobile.
  Do not hide key visuals on smaller screens.
- Mobile/tablet should adapt the desktop design rather than becoming a plain
  stripped-down site.

Important image/assets notes:

- Main favicon/logo source was user-provided and must not be redesigned unless
  the user explicitly requests it.
- Favicon icon set was created from the user image and committed.
- Concept category hero images were generated and stored under
  `concepts/category-heroes/`; this folder is ignored by git and not deployed.
- Production visual assets live under `assets/`.

## Lead-Generation Direction

The site is primarily for leads, but CTAs should feel natural, not aggressive.

Current lead flow:

- Homepage header has a call button: `Volat 730 431 313`.
- Homepage hero has primary CTA `Overit dostupnost`.
- Homepage hero has a small callback form: phone input + `Zavolejte mi`.
- Clicking homepage `Overit dostupnost` opens a compact modal instead of
  immediately sending the visitor to the full availability page.
- Modal asks for address, phone, optional email, and consent.
- Full `/dostupnost/` page remains available as fallback.
- Forms submit to `/api/leads`.
- Resend will be connected later. Until then, fallback mailto behavior exists.
- Supabase was explicitly skipped.

## Recent Important Commits

- `f75918f` - Clarify PODA internet tariff copy.
- `bc06088` - Add complete favicon icon set.
- `799de5e` - Update homepage logo and hero CTA.
- `850f18a` - Add homepage lead modal and callback CTA.

Check `git log --oneline` for the exact current state before making changes.

## Cache Busting Rule

When CSS or JS changes, update affected HTML query strings, for example:

- `/assets/styles.css?v=...`
- `/assets/main.js?v=...`

This matters because the owner repeatedly saw old design on Vercel/browser due
to cache.

## Deployment Rule

For approved website changes:

1. Run `npm run check`.
2. Commit changes on `main`.
3. Push `main`.
4. Vercel should deploy automatically.

Production verification by `curl` from Codex may sometimes fail even when push
is correct, due to transient Vercel/network behavior. Still verify when possible.

## Owner Preferences

- The owner wants to stay involved visually: first agree on what will be done,
  then implement.
- He prefers seeing changes on Vercel quickly.
- He wants strong SEO/GEO but with real content, not spam pages.
- He wants the web to collect leads efficiently.
- He cares strongly about desktop, tablet, and mobile visual consistency.
- He often uses Slovak/Czech wording in chat; public site copy should remain
  Czech.

## Good Next Tasks

- Visually verify the latest homepage lead modal and callback CTA on Vercel.
- Continue polishing homepage UI/UX after the lead flow is stable.
- Connect Resend environment variables on Vercel when credentials are provided.
- Improve conversion tracking and thank-you page details.
- Build stronger unique content for the most important local pages.
