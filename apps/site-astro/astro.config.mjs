import { defineConfig } from 'astro/config';
import sanity from "astro-sanity";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    projectId: '5k9qefjb',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true
  }), tailwind({
    config: {
      applyBaseStyles: false
    }
  })]
});