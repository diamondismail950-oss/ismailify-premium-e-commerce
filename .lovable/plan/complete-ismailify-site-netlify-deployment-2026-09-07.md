# Complete ISMAILIFY site + Netlify deployment

## Goal
Get the ISMAILIFY store to build successfully and deploy on Netlify via the connected GitHub repo.

## Why Netlify is not deploying now
The project is currently configured to build for Lovable Cloud / Cloudflare Workers by default. Netlify needs its own Nitro preset and a `netlify.toml` so it knows the build command and which folder to publish.

## Steps

1. Finish the missing store pages
   - `src/routes/cart.tsx` — full cart review, quantity controls, remove, subtotal, checkout CTA.
   - `src/routes/checkout.tsx` — clean checkout form (shipping + payment placeholders, order summary, place order), no real payment processing.

2. Add the Ismailify logo
   - Use the uploaded `Ismailify_Logo.png` as the header logo via a Lovable asset pointer.
   - Copy the same logo to `public/favicon.ico`.

3. Configure Netlify deployment
   - Update `vite.config.ts`: set `nitro: { preset: "netlify" }` so external builds (Netlify CI) target Netlify Functions. Lovable builds will still use Cloudflare automatically.
   - Add `netlify.toml` with build command `npm run build` and publish directory `dist`.

4. Verify
   - Run `bun run build` locally and confirm it completes.
   - Confirm the dev preview still loads.
