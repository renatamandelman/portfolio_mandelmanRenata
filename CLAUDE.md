# Contexto del proyecto (para Claude Code)

Portfolio "Dual View" de Renata Mandelman para el Examen Final de Programación Multimedial IV.
Entrega: 19/11/2026. Defensa individual con modificación de código en vivo: **Renata tiene que poder explicar cada línea**.

## Stack
- Astro 7 (sitio estático), Tailwind v4 vía `@tailwindcss/vite` (sin tailwind.config: tokens en `@theme` de `src/styles/global.css`).
- TypeScript en los `<script>` de los componentes.

## Arquitectura
- Estado de la vista en `<html data-view="content|split|code">`. Lo escribe `ViewToggle.astro`, lo lee el CSS de `SplitLayout.astro`. No crear otra fuente de estado.
- Datos del CV en `src/data/profile.ts`. Los componentes reciben datos por props; no hardcodear contenido en el markup.
- Componentes propios: `ViewToggle` (hecho), `ProjectCard` (modal con `<dialog>`), `DynamicApiWidget` (GitHub API con estados loading / success / error).

## Reglas de trabajo
- Explicar en español qué cambia y por qué antes de editar. Cambios chicos y revisables.
- Comentarios del código en español, simples.
- No agregar dependencias ni frameworks (React, etc.) sin preguntar.
- Colores solo desde los tokens. `accent` (#E09F93) nunca para texto: usar `accent-ink`.
- Accesibilidad: elementos nativos primero (button, dialog, radio), foco visible, alt en imágenes.
- Probar a 390px y 1440px.
- Al cerrar una tarea, proponer una entrada para `docs/proceso.md`.
