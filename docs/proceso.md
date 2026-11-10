# Bitácora de proceso — Portfolio Renata Mandelman

> Registro honesto de decisiones, pruebas y problemas. Se actualiza al final de cada jornada.
> Formato por entrada: **Qué hice · Por qué · Problemas · Pendiente**.

---

## Problema de comunicación a resolver

Mi perfil tiene dos mitades que en un CV tradicional quedan desconectadas: **creación de contenido / RRSS** y **desarrollo web**.
La propuesta "Dual View" busca que esa dualidad sea la *forma* del sitio y no solo un dato: la persona que visita elige desde qué lado leerme.

## Alternativas exploradas

| Alternativa | Por qué la descarté / elegí |
| --- | --- |
| Portfolio de scroll único con secciones | Funciona, pero no comunica la dualidad; parece un CV largo. |
| Dos páginas separadas (/content y /code) | Rompe la idea de "ver los dos mundos a la vez". |
| **Split screen + toggle de modo de lectura** ✅ | La interacción principal cambia la lectura de toda la experiencia. Cumple "interacción significativa". |

---

## Día 1 — 10/11/2026

**Qué hice**
- Setup de Astro 7 + Tailwind v4 (plugin de Vite) + fuentes autoalojadas (Inter Variable, JetBrains Mono).
- Design tokens en `src/styles/global.css` con `@theme`.
- `BaseLayout`, `SplitLayout` y primer componente propio: `ViewToggle`.
- Datos del CV separados en `src/data/profile.ts`.

**Decisiones**
- **Estado en `<html data-view>`**: una sola fuente de verdad que el CSS lee. El toggle escribe, el layout reacciona.
- **Radios nativos** para el toggle en vez de botones con JS: accesibles por defecto (Tab + flechas, anunciados por lectores de pantalla).
- **3 estados** (`content` · `split` · `code`) en lugar de 2: el modo dual es el punto de partida del concepto.
- En desktop el panel que pierde foco **no desaparece**, queda como riel vertical clickeable para volver.
- **Contraste**: el salmón `#E09F93` sobre crema da 2.1:1 (no pasa WCAG). Lo uso solo para fondos/decoración y agregué `#9A4E42` (5.6:1) para texto.

**Problemas**
- En 390px la navegación del header se partía en dos líneas y generaba scroll horizontal → header en columna en mobile + `whitespace-nowrap`.

**Pruebas de pantalla**
- [x] 1440px split / code
- [x] 390px split
- [ ] 390px content / code
- [ ] 768px (tablet)

**Pendiente**
- ProjectCard + modal "Case Study" (Días 3-4).

---

## Uso de IA

| Tarea | Herramienta | Qué revisé / cambié / descarté |
| --- | --- | --- |
| Estructura inicial, config y layout split | Claude | _completar: qué entendí, qué modifiqué_ |
