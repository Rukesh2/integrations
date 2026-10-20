# Nova Store — Wingify / GA4 test site

Static HTML/CSS/JS demo with three pages:
- `index.html` — landing page
- `product.html` — product detail and add-to-cart interaction
- `payments.html` — demo checkout form

## Run locally
Open `index.html` in a browser, or use VS Code Live Server for a local server.

## Current tracking behavior
No Wingify SmartCode or GA4 tag is included yet. `app.js` only logs demo click, hover, field-change and form-submit activity to the browser console. It does not send analytics requests.

Open DevTools → Console to see logs. Use DevTools → Network later to inspect requests once SmartCode and GA4 are installed.

## Safety
Use fake values only. The form is a UI simulation; it has no backend and does not process payments. The script intentionally avoids logging entered name, email, or test reference values.

## Deployment
All three HTML files and `styles.css` / `app.js` are in the same folder. Deploy the folder to any static host such as GitHub Pages. Keep the links as relative file paths for simple static hosting.
