# Space Madness

## A content framework that connects ideas so you can build your digital garden

[![Netlify Status](https://api.netlify.com/api/v1/badges/b7b70f89-282d-4a89-97c8-fc97b39565f1/deploy-status)](https://app.netlify.com/sites/space-madness-demo/deploys)

[demo.spacemadness.dev](https://demo.spacemadness.dev/)

A turbo repo that includes everything you need to run your backend in Sanity and your frontend in Astro.

The monorepo is configured with apps as the primary hosted sites.

Packages are code that is shared across the sites.

```bash
.
├── apps
│   ├── site-astro
│   └── site-sanity
└── packages
    ├── content-models
    └── sanity-zod-types
```

Navigate to each folder's `README.md` for more details.

## Getting Started

See the [Space Madness Docs](https://spacemadness.dev/docs/) for detailed instructions on installing and runnig your app.

1. `export SANITY_STUDIO_PROJECT_ID=<sanity-id>`

   or

   `set SANITY_STUDIO_PROJECT_ID=<sanity-id>`

1. `turbo dev`

## Deploying

Deploying is supported for any hosting platform that supports static site hosting.

## Hosting the Astro site

### Build command

`turbo build --filter=site-space-madness-astro`

### Publish directory

`/apps/site-astro/dist/`

## Hosting the Sanity site

Deploying is supported for any hosting platform that supports static site hosting.

### Build command

`turbo build --filter=site-space-madness-sanity`

### Publish directory

`/apps/site-sanity/dist/`

## Contributing

Contributions are welcome.

If your code editor does not support Pretier out of the box, you can run `npm run format` from the `site-astro` directory before committing your changes.

Please make all pull requests to `main`.
