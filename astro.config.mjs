// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Cambiar por la URL real una vez hecho el deploy (sirve para sitemap, OG y URLs absolutas).
  site: 'https://renata-mandelman.vercel.app',

  // Sitio 100% estático: el build genera HTML plano en /dist, que Vercel o Netlify sirven sin configuración extra.
  output: 'static',

  // Tailwind v4 se integra como plugin de Vite (ya no usa tailwind.config.js).
  vite: {
    plugins: [tailwindcss()],
  },

  // Precarga los links internos al pasar el mouse: navegación más rápida sin costo extra.
  prefetch: true,
});
