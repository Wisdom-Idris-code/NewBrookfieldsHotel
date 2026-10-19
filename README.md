# New Brookfields Hotel demo

## Build and preview

Install the locked dependencies, create a production build, and preview it locally:

```sh
npm ci
npm run build
npm run preview
```

The deployable static site is generated in `dist/`. Configure your hosting provider to publish that directory and to rewrite requests for app routes such as `/accommodation` and `/contact` to `/index.html`; the app uses React Router.

This is a demo: the page is marked `noindex, nofollow` for search engines, and the contact details are placeholders. Review these before using the site as a live hotel website.
