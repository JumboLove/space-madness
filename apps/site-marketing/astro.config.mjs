import { defineConfig } from 'astro/config';
import sanity from "astro-sanity";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true
  }), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), react()]
});