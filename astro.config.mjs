// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import htmx from 'astro-htmx';


// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      // Remove preserveSymlinks as it's not a valid option
    },
  },
  integrations: [tailwind(), icon(), htmx()]
});
