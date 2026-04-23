import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jediojeh.dev',
  output: 'static',
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
