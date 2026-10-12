# CODERAID — Digital Solutions Website

A responsive, single-page agency website built with semantic HTML5, CSS3 and vanilla JavaScript. It follows the supplied CODERAID design reference with a navy/blue palette, editorial typography, service cards, project concepts, pricing, FAQ and conversion-focused CTAs.

## Run locally
1. Extract the ZIP.
2. Open the `CODERAID` folder in VS Code.
3. Install the **Live Server** extension if needed.
4. Right-click `index.html` → **Open with Live Server**.

You can also open `index.html` directly in a browser; Live Server is recommended for local development.

## Project structure
- `index.html` — homepage markup, metadata and structured data
- `css/style.css` — base styles and desktop layout
- `css/responsive.css` — tablet and mobile layouts
- `css/animations.css` — reveal animations and reduced-motion support
- `js/navigation.js` — accessible mobile menu
- `js/animations.js` — Intersection Observer reveals
- `js/form.js` — plan links, newsletter demo handling and notices
- `js/main.js` — FAQ, pricing display, scroll progress and back-to-top
- `assets/images/` — original SVG website mockup illustrations

## Customize before launch
1. Replace `https://www.example.com/` in the canonical URL, sitemap and structured data with your real domain.
2. Replace `hello@example.com` with your real business email.
3. Add your real WhatsApp link, social profiles, business address (if you want it public), and any verified testimonials.
4. Update prices, deliverables, project timings and support terms to match your actual offers.
5. Replace the illustrative portfolio concepts with genuine projects when available.
6. Add a real privacy policy and terms page; the current links are placeholders.
7. Connect newsletter and enquiry forms to a backend or trusted form service before promising message delivery. The newsletter currently validates the email and displays a demo confirmation only.
8. Review the canonical URL and Open Graph image, then test every link on mobile and desktop.

## SEO checklist
- One primary H1 and logical heading structure
- Descriptive title and meta description
- Open Graph tags
- Basic ProfessionalService JSON-LD (review/update before production)
- `robots.txt` and `sitemap.xml` templates
- Meaningful alt text for content images

The structured data is a starting point and should be updated to reflect accurate business details. SEO rankings are never guaranteed.

## Deploy
Upload the folder contents to your static hosting provider (for example GitHub Pages, Netlify, Cloudflare Pages or your web host's public web directory). Configure your custom domain and HTTPS in the provider dashboard. Update the canonical URL and sitemap to the final live domain. Submit the sitemap in Google Search Console after launch.

## Image assets
All mockup visuals in `assets/images/` are custom SVG illustrations created for this template, so no third-party image licensing is required for those assets. Google Fonts are loaded from Google Fonts; replace with locally hosted fonts if you need a fully self-contained/offline site.


## Frontend audit and QA notes

The latest audit pass includes:
- Added a keyboard-visible skip link and stronger `:focus-visible` styling.
- Added viewport-safe box sizing, image constraints, overflow safeguards and small-screen typography/layout rules.
- Improved mobile navigation dismissal (Escape, outside click, selecting a link, and desktop resize).
- Added explicit image dimensions and async decoding hints to reduce layout shifts.
- Made the pricing display toggle functional and preserved original displayed prices when switching back.
- Updated package CTAs to prepare a `mailto:` enquiry with the selected package.
- Kept newsletter behaviour explicit: it validates input but does not subscribe until connected to a real service.
- Removed dead privacy/terms fragment targets; these remain clearly marked placeholders until real pages are published.
- Added image, anchor, duplicate-ID and JavaScript syntax checks.

### Before production
- Replace `example.com` and `hello@example.com` in metadata, `robots.txt`, `sitemap.xml`, JSON-LD and email links.
- Add the real privacy and terms URLs.
- Connect newsletter collection to a provider; no subscriber data is sent by this static demo.
- Test the final deployed site on actual iOS/Android devices and run Lighthouse/PageSpeed Insights after replacing placeholders.
- The supplied portfolio graphics and performance score are illustrative mockups; do not present them as verified client work or measured results.


## Motion system

The premium animation system is implemented in `css/animations.css` and `js/animations.js`, with no added animation libraries.

### Adjust animation feel
Edit the CSS custom properties near the top of `css/animations.css`:
- `--motion-fast`: button press and quick feedback.
- `--motion-base`: card, link and navbar transitions.
- `--motion-slow`: longer decorative transitions.
- `--motion-reveal`: scroll reveal duration.
- `--ease-standard` and `--ease-enter`: the shared easing curves.
- `--motion-distance`: how far scroll-reveal elements travel.
- `--motion-stagger`: default stagger reference (individual cards can override `--reveal-delay`).

For a calmer effect, reduce `--motion-distance` to `14px`, set `--motion-reveal` to `600ms`, and reduce the floating card travel in `@keyframes softFloat` from `-5px` to `-3px`. For a more expressive reveal, raise the reveal duration to `820ms` and increase the distance to `26px` carefully.

The motion system honours `prefers-reduced-motion`, disables pointer parallax on touch/coarse-pointer devices, and keeps content visible by default if JavaScript is unavailable. The preloader remains brief and is removed on load or its existing timeout.
