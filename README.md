# Africhique

Africhique is now a Next.js storefront (converted from PHP templates). Use this repository for a professional African fashion site with a shared brand config and image placeholders.

## Setup

```bash
npm install
npm run dev
```

## Where to put your logo and product images

Place your assets in `public/assets/images/`:

- `logo2.svg` (brand logo)
- `hero-image.jpg` (hero background)
- `placeholder.jpg` (fallback product image)
- product photos (e.g., `dress_ankara.jpg`, `suit_kente.jpg`, `bag_mudcloth.jpg`)

Then update `app/lib/siteData.ts` with matching file names in `featuredProducts` and `products` to see the new images in product cards.

Useful: keep the same data keys (`id`, `title`, `price`, `img`, `desc`, `cat`) and add more entries to `products` for a larger catalog.


## Built pages

- `/` (home)
- `/about`
- `/products`
- `/order`
- `/contact`

## Notes

- Old PHP pages and `includes/` were removed as requested and replaced with Next.js pages.
- If `next`, `react`, or `react-dom` are unavailable, run `npm install` first.

