# Working on this website

This is a customer-owned Next.js website for an ice cream shop. Read [README.md](README.md) for setup, content editing, deployment and the optional Jamstacks contact form.

## Working preferences

- Work in this repository on its current branch unless asked otherwise.
- Preserve existing changes. Leave edits uncommitted; push or deploy only when requested.
- Adapt the website to its owner's requested content and features. Replace the sample business name, flavours, address and contact details with the owner's real details; the fictional examples are starting content.

## Structure and content

- `content/menu.ts` owns scoop sizes/prices (`scoopPrices`), flavours, `counterOrder` (home counter lineup), `seasonalCalendar`, toppings/extras, take-home tubs and allergy/equipment notes. Most owner requests ("add a flavour", "mark pistachio scooped out", "change scoop price") are edits here only.
- `content/creamery.ts` owns the business name, tagline, story, contact details, sample address, directions, opening hours (local times), notice, amenities, FAQs, social links and enquiry copy.
- Keep the business name in `content/creamery.ts` (`creamery.name`) and `site.config.json` (`name`) only, so renaming is a two-line change.
- The address in `content/creamery.ts` drives `#find-us`, Google Maps links/embed and `IceCreamShop` JSON-LD. Maps use keyless Google URLs from `lib/maps.ts`; never add a secret key, and keep the map lazy-loaded.
- The shop's time zone is the IANA `timeZone` in `site.config.json`. Change it there, never in `content/`. Without it, the hours badge and current-month highlight stay neutral.
- Keep item and section ids unique, lowercase and hyphenated; they are page anchors. Use an existing `FlavourTone` and `FlavourPattern` instead of adding image files.
- Keep content separate from `site.config.json`: Jamstacks may rewrite deployment fields there.
- Text is rendered as plain text. Don't invent reviews, certifications or allergy-safe guarantees.

## Styling (Tailwind CSS v4)

- Style components with Tailwind utility classes in the TSX. Don't add global CSS for one-off styles.
- `app/tailwind.input.css` holds everything utilities can't express: the colour tokens (`:root` for light, plus two dark blocks that must stay identical), the `@theme` built from them, base element styles, shared building blocks (`.button`, `.button-ghost`, `.text-link`, `.eyebrow`, `.counter-frame`, `.tub-well`, `.ruled-row`), `.map` and `.enquiry[data-state]`.
- Only this template's palette exists (`bg`, `surface`, `surface-alt`, `ink`, `muted`, `accent`, `accent-ink`, `on-accent`, `mint`, `strawberry`, `vanilla`, `lavender`, `chocolate`, `peach`, `rule`, `control-border`). Tailwind's default colours are switched off. To add a colour, add a variable to `:root` and both dark blocks, then map it in `@theme inline` as `--color-name: var(--variable)`.
- Colours switch with the theme through the tokens, so prefer them to `dark:` variants.
- Reuse shared building blocks and components (`PageHead`, `FlavourTubArt`, `SiteLink`).
- Keep `--jamstacks-*` variables mapped to template tokens. Preserve readable contrast in both themes, responsive layouts from 360px, visible keyboard focus, semantic headings and reduced-motion support.

## Static architecture

- Production is a static export in `out/`. Preserve static-export compatibility; no request-time rendering, API routes, Server Actions, database or production Next.js server.
- Use local content for pages and ordinary client code for browser-only interactions (`OpenBadge`, `PlannedMonthBadge`, `MenuBoard`, `CopyEmail`). Time-dependent text is computed in the browser, never at build time.
- Preserve both custom-domain root URLs and arbitrary GitHub Pages repository paths. Use `lib/paths.ts` and `SiteLink` for links, assets and metadata.
- Read relevant installed Next.js guides in `node_modules/next/dist/docs/` before changing framework behaviour. Keep dependencies modest and `package-lock.json` reproducible.

## Optional Jamstacks form

- Keep the integration documented in `README.md`. The host is `<jamstacks-support-form>` with `data-jamstacks-component="support-form"` and `data-jamstacks-site` attributes.
- `JAMSTACKS_SITE` is a public website ID. Load one configured CDN bootstrap at `/sites/{publicSiteId}/embed.js`; no ID means no script request and an email fallback.
- The shared runtime owns form rendering, validation, spam protection and submission. Never register a replacement element, intercept submission or simulate success.
- Preserve full-document Contact navigation via `SiteLink` until a supported remount contract is available. Keep the email fallback visible in every state.
- The form supports name, email and message only. Don't promise bookings, ordering or extra fields in page copy.
- Configuration and build-time environment values are public. Never put credentials in them.
- Preserve `.github/workflows/pages.yml`, its optional `provisioning_id` input and correlated run name.

## Commands and checks

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run build
npm run check
PAGES_BASE_PATH=/icecream-preview npm run build
```

Run `npm run check` after every change; test failures name the item or day to fix. Browser-check affected routes in light and dark when changing layout, navigation or deployment behaviour. Report local checks separately from any real GitHub deployment or delivered contact message.

## Template publishing assets

- `jamstacks/` contains optional source-template metadata, gallery captures and `jamstacks/config.test.mjs`.
- Customer websites can remove this entire folder. Normal tests, website code, builds and the Pages workflow must not import it.
- Keep `site.config.json`, embed integration and `.github/workflows/pages.yml` outside `jamstacks/`.
