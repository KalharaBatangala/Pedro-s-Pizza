# Vito's Pizza House 🍕

A wood-fired pizzeria website with online ordering, built with React and Vite.

## Features

- **Full menu** with categories, search, and vegetarian / vegan / spicy filters
- **Pizza builder**: choose a size and add extra toppings, with live pricing
- **Cart drawer** with quantity controls, a free-delivery progress bar and add-on suggestions
- **Checkout** for delivery or pickup, promo codes (`FIRSTSLICE`, `VITO10`), delivery fee and tax
- **Order confirmation** page with an order tracker and receipt
- The cart is saved in the browser, so it survives a page refresh
- Orders and contact messages are captured with **Netlify Forms** (no backend needed)
- Responsive layout that respects reduced-motion settings

## Getting started

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # build for production into dist/
npm run preview   # serve the production build locally
```

Requires Node.js 20.19+ or 22.12+.

## Customising

| What                                     | Where                     |
| ---------------------------------------- | ------------------------- |
| Address, phone, hours, socials           | `src/data/site.js`        |
| Delivery fee, tax, currency, promo codes | `src/data/site.js`        |
| Menu items, sizes, extra toppings        | `src/data/menu.js`        |
| Colours and fonts                        | `src/styles/global.css` (`:root`) |

## Deploying to Netlify

`netlify.toml` already configures the build command, publish folder, Node version and SPA redirects.

1. Push this repo to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and pick the repo.
3. Deploy. Netlify reads all settings from `netlify.toml`.
4. Under **Site configuration → Forms**, enable form detection, then redeploy. Orders show up under the
   `order` form and messages under `contact`. You can add email notifications there too.

Or deploy from your terminal with the Netlify CLI:

```bash
npx netlify-cli login
npx netlify-cli deploy --build --prod
```

## Photo credits

Food and restaurant photography from [Unsplash](https://unsplash.com), used under the Unsplash License.

---

Designed & built by Kalhara Batangala.
