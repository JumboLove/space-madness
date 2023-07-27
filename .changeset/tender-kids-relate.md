---
"site-space-madness-sanity": major
"site-space-madness-astro": major
---

Migrate resourceContent to resource with parent resource

## Why

Resource Content and Resource are a confusing mental model. It's much easier to create a resource and assign it a parent if it makes sense. You will also have the flexibility of nesting resources in a hierarchy if that makes sense for your project.

## How

Copy over the changes for `resource.ts` and `resourceContent.ts` into your project. Run `turbo dev` to start your Sanity Studio so it can recognize the new definitions.
Once your model definitions are updated, you can start the migration.

Migrations have been provided for you. You can run them in the `apps/site-sanity/` folder
Run these in order:

```bash
npx -y sanity@latest exec migrations/reassignToParentResource.js --with-user-token
```

```bash
npx -y sanity@latest exec migrations/remapResourceContentToResource.js --with-user-token
```

Then you will want to make updates to your site and test that the migrations work as expected.

You will likely need to remap your exising "internal Links" in your bodies to the new resources.

As a final cleanup, delete your `content-models/src/resourceContent.ts` file, remove it from the `index.ts` imports and exports, then run this command:

```bash
npx -y sanity@latest exec migrations/deleteResourceContent.js --with-user-token
```

If you get errors while deleting, your resourceContent is still being referenced in another document. Update those references before attempting to delete.

Once you've deleted all resourceContent, you can test your site to ensure it all works. It may also be wise to run a test `turbo build` to see if any errors crop up for a full site build.

Your last step is to remove the `resourceContent.ts` file from `content-models`.
