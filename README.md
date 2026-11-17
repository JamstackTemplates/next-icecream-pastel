# next-icecream-pastel

A static Next.js website template for independent scoop shops, gelaterias and small creameries, featuring a content-driven chilled flavour counter, scoop price rail, dairy-free ingredient markers, a twelve-month seasonal rotation, opening hours, directions and an optional Jamstacks contact component for party and catering enquiries.

All business details, flavours, prices, hours and the sample address (`20 Times Square, New York, NY 10036`) are fictitious starting content. Replace them with your own details before publishing.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, scoop prices, 8-tub counter preview, Find us & map, seasonal preview, story and FAQs |
| `/menu/` | All 12 flavours with filters, dietary legend, scoop sizes, toppings, take-home tubs and 12-month calendar |
| `/contact/` | Parties & catering enquiries (Jamstacks hosted form when configured, email fallback otherwise) |
| `404` | Friendly missing-page fallback |

## Quick start

Requires Node.js ≥ 24.

```sh
npm ci
npm run dev        # http://localhost:3000
npm run check      # tests + TypeScript + static export (out/)
npm start          # preview static export on http://localhost:3000
```

## Make it yours

Most owner edits happen in two files under `content/` plus `site.config.json`:

| What to change | Where to edit |
| --- | --- |
| Business name | `creamery.name` in `content/creamery.ts` and `name` in `site.config.json` |
| Tagline, story, email, phone, address, directions, hours, FAQs | `content/creamery.ts` |
| Flavours, scoop prices, toppings, take-home tubs, `counterOrder`, `seasonalCalendar` | `content/menu.ts` |
| Domain, time zone, Jamstacks site ID | `site.config.json` |

### Worked example: editing a flavour

Every flavour in `content/menu.ts` follows the `FlavourItem` shape:

```ts
{
  id: 'pistachio-petal',
  name: 'Pistachio Petal',
  description: 'Roasted green pistachio cream studded with lightly salted pistachio pieces.',
  price: scoopPrices,
  diet: ['vegetarian', 'contains-nuts', 'gluten-free-ingredients'],
  available: false, // shows "Scooped out" and a lid motif without deleting the record
  featured: true,
  kind: 'flavour',
  art: 'tub',
  base: 'dairy',
  tone: 'mint',
  pattern: 'pieces',
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
}
```

- **Mark a flavour sold out:** set `available: false` on the flavour record. Remove `available: false` (or set `true`) when it returns.
- **Change the home counter lineup:** reorder or swap IDs in `counterOrder` in `content/menu.ts` (4–8 flavour IDs).
- **Update the seasonal rotation:** edit `months` on seasonal flavours and update `seasonalCalendar` in `content/menu.ts`.
- **Add a menu section:** append a `MenuSection` with a unique lowercase hyphenated `id` to `menu.sections` in `content/menu.ts`.

## Hours, time zone and map

- Opening hours in `content/creamery.ts` use 24-hour local times (`"HH:MM"`). Omit `opens` and `closes` to mark a day closed.
- The shop's IANA time zone (e.g. `America/New_York`) lives in `site.config.json` under `timeZone`. The live open/closed badge and optional "Planned this month" highlight are computed in the visitor's browser. Without JavaScript or a valid `timeZone`, the page displays neutral text.
- Maps and directions use keyless Google Maps URLs in `lib/maps.ts` derived from `creamery.address`. The sample address (`20 Times Square`) is a public landmark used for demonstration only.

## Appearance, fonts and styling

- Styled with **Tailwind CSS v4** (`@tailwindcss/postcss`). Component layout uses utility classes; theme tokens and shared building blocks live in `app/tailwind.input.css`.
- Light mode (**Vanilla daylight**) and dark mode (**Blueberry dusk**) are controlled by CSS variables in `:root`, `@media (prefers-color-scheme: dark)` and `:root.dark`. Keep all three blocks defining the same token names.
- Self-hosted variable fonts:
  - `@fontsource-variable/baloo-2` (headings/wordmark) — SIL Open Font License 1.1
  - `@fontsource-variable/dm-sans` (body, labels, prices) — SIL Open Font License 1.1

## Footer credit

The footer includes a small `jamstacks.net` credit link. It is your website — keep, reword or remove it as you wish.

## Configuration

`site.config.json` holds public deployment settings:

```json
{
  "name": "Cloudpetal Creamery",
  "description": "...",
  "domain": "next-icecream-pastel.jamstacks.net",
  "timeZone": "America/New_York",
  "jamstacks": {
    "siteId": "",
    "cdnUrl": "https://cdn.jamstacks.net"
  }
}
```

Replace `domain` with your own custom domain (or leave blank if deploying under a GitHub Pages repository path).

| Environment variable | Purpose |
| --- | --- |
| `JAMSTACKS_SITE` | Public Jamstacks website ID for the Contact form |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | Override Jamstacks CDN base URL (default `https://cdn.jamstacks.net`) |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Set to `1` locally to allow `http://localhost` CDN URLs |
| `NEXT_PUBLIC_SITE_DOMAIN` | Override `site.config.json` `domain` |
| `SITE_TIME_ZONE` | Override `site.config.json` `timeZone` |
| `PAGES_BASE_PATH` | Subpath prefix for GitHub Pages project sites (e.g. `/icecream-preview`) |
| `PAGES_BASE_URL` | Full deployed URL reported by `actions/configure-pages` |

## Contact and Jamstacks behaviour

When `siteId` / `JAMSTACKS_SITE` is configured, `/contact/` renders `<jamstacks-support-form>` and loads `{cdnUrl}/sites/{siteId}/embed.js`. When unconfigured, no external script is requested and visitors see the email fallback. Contact navigation uses full-document links (`SiteLink`) so the hosted form always mounts cleanly.

## Content Security Policy notes

If you configure a strict CSP on your host, allow:
- `frame-src https://www.google.com` for the lazy-loaded Google Map embed
- `script-src` and `connect-src` for your configured `cdnUrl` if using the Jamstacks contact form

## GitHub Pages deployment

`.github/workflows/pages.yml` builds the static export in `out/` and deploys to GitHub Pages on pushes to `main` or manual dispatch (preserving `provisioning_id` for Jamstacks).

## Project structure

- `app/` — App Router pages, layout, `icon.svg`, `sitemap.ts`, `robots.ts`, `tailwind.input.css`
- `components/` — Header, footer, tub artwork, menu board, open badge, map and Jamstacks form host
- `content/` — `creamery.ts` and `menu.ts`
- `lib/` — Configuration, paths, local time, seasonal selectors, menu filters, maps and JSON-LD
- `tests/` — Unit tests (`node --test`)
- `public/` — Static assets including `og.png`
- `jamstacks/` — Optional template-gallery publishing folder

## Before publishing

1. Replace the sample business name, address, phone, email, flavours, prices and hours.
2. Update `domain` and `timeZone` in `site.config.json`.
3. Regenerate `public/og.png` if you change the hero or branding.
4. Run `npm run check` and verify the built site in light and dark mode.
5. Remove any planning documents (such as `PLAN.md` or `PROMPT_TEMPLATE.md`) if present.

## Optional `jamstacks/` folder

`jamstacks/` is used only by the Jamstacks template gallery. Customer websites can delete the entire folder without affecting `npm run check` or GitHub Pages deployments.
