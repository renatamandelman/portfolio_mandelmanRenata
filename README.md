# Renata Mandelman — Portfolio "Dual View"

Portfolio personal e interactivo para el Examen Final de **Programación Multimedial IV**.
Una pantalla dividida entre **Creación de Contenido / RRSS**, **Diseño** y **Desarrollo Web**: quien visita elige el modo de lectura con el toggle `[ CONTENT ⇄ DESIGN ⇄ CODE ]`.

**¿Para quién es?** 
Para las personas que me pueden contratar o convocar: marcas y agencias que buscan creadoras UGC, estudios de diseño y equipos de desarrollo web. Cada una puede ir directo a su área sin pasar por las otras, y al mismo tiempo ver que las tres conviven en mi trabajo.

🔗 **Deploy:** https://portfolio-mandelman-renata.vercel.app · 
📓 **Bitácora:** [más abajo](#bitácora)

## Instalación y ejecución

Requisitos: Node.js 22 o superior.

```bash
npm install        # instala dependencias
npm run dev        # servidor local en http://localhost:4321
npm run build      # genera el sitio estático en /dist
npm run preview    # sirve /dist localmente para probar el build
```

## Estructura

```
├── astro.config.mjs        # Config de Astro + Tailwind (plugin Vite)
├── README.md               # Documentación + bitácora de proceso
├── public/                 # Archivos estáticos (favicon, imágenes, videos)
└── src/
    ├── components/         # Componentes propios (ViewToggle, ProjectCard, DynamicApiWidget)
    ├── data/profile.ts     # Datos del CV (experiencias, stack)
    ├── layouts/            # BaseLayout (head/SEO) y SplitLayout (vista dual)
    ├── pages/index.astro   # Página principal
    └── styles/global.css   # Design tokens y estilos base
```

## Componentes propios

**`ViewToggle.astro`**: es el botón `[ CONTENT ⇄ DESIGN ⇄ CODE ]` y el foco del sitio. Cuando elegís una opción, guarda cuál es en `<html data-view>` y el CSS cambia la pantalla según eso. Lo hice con radios en vez de botones porque así ya funciona con teclado y con lectores de pantalla sin que yo tenga que programarlo. También se acuerda de la última vista que elegiste (con `localStorage`). Cuando entrás por primera vez no hay ninguna opción marcada y ves la portada con las tres columnas.

**`ProjectCard.astro`**: es la tarjeta de cada marca con la que trabajé como creadora de contenido. Al tocarla se abre un modal con lo que hice y los videos. Usé `<dialog>` porque ya trae el cierre con Esc y el manejo del foco. Los videos de TikTok se cargan recién cuando tocás play, para que la página no tarde más de lo necesario.

**`DynamicApiWidget.astro`**: trae mis proyectos de programación desde la API de GitHub. Muestra solo los repos que tienen el topic `portfolio`, así para sumar un proyecto nuevo no tengo que tocar el código. Mientras carga muestra un aviso, y si la API falla se siguen viendo los proyectos que tengo cargados a mano, con un botón para reintentar.

**`ProjectLink.astro`**: es el diseño de cada proyecto de la lista. Lo separé en un componente para que los proyectos que escribí yo y los que llegan de GitHub se vean exactamente iguales.

Además, los layouts tienen su propia lógica: `SplitLayout.astro` arma las tres columnas y decide cuál se agranda según la vista elegida (todo con CSS), y `BaseLayout.astro` carga la vista guardada antes de que se dibuje la página, para que no se vea un "salto" al entrar.

## Tecnologías y decisiones



## API / fuente dinámica

Utilice la fuente de Behance para traer los proyectos.

**`DynamicApiWidget.astro`**: trae mis proyectos de programación desde la API de GitHub. Muestra solo los repos que tienen el topic `portfolio`, así para sumar un proyecto nuevo no tengo que tocar el código. Mientras carga muestra un aviso, y si la API falla se siguen viendo los proyectos que tengo cargados a mano, con un botón para reintentar.

## Responsive y accesibilidad

_Completar en Días 9-10._

## Limitaciones y mejoras

_Completar._

## Créditos y uso de IA

- Tipografías: Inter y JetBrains Mono (SIL Open Font License), vía Fontsource.
- Uso de IA: ver [Bitácora → Uso de IA](#uso-de-ia).

---

## Bitácora

> Mi registro de cómo fui armando el portfolio: qué hice, por qué, qué probé y descarté, y qué me quedó pendiente.
> Lo voy escribiendo al terminar cada jornada.

### El problema que quiero resolver

Mi perfil tiene dos mitades que en un CV quedan desconectadas: **creación de contenido / RRSS** y **desarrollo web** (y en el medio, el **diseño**).
La idea de "Dual View" es que esa mezcla sea la *forma* del sitio y no solo un dato: la persona que entra elige desde qué lado leerme.

### Alternativas que pensé al principio

| Alternativa | Por qué la descarté / elegí |
| --- | --- |
| Portfolio de scroll único con secciones | Funciona, pero no muestra la dualidad; parece un CV largo. |
| Dos páginas separadas (/content y /code) | Rompe la idea de ver los dos mundos a la vez. |
| **Pantalla dividida + toggle de modo de lectura** ✅ | La interacción principal cambia cómo se lee todo el sitio. Cumple "interacción significativa". |

---

### Día 1 — 10/11

**Qué hice**
- Armé el proyecto con Astro 7 + Tailwind v4 (como plugin de Vite) y fuentes autoalojadas (Inter y JetBrains Mono).
- Definí los colores y tipografías como tokens en `src/styles/global.css` con `@theme`.
- Hice `BaseLayout`, `SplitLayout` y mi primer componente: `ViewToggle`.
- Separé los datos del CV en `src/data/profile.ts`.

**Decisiones**
- La vista elegida se guarda en `<html data-view>`: es la única "fuente de verdad". El toggle la escribe y el CSS la lee.
- Usé **radios nativos** para el toggle en vez de botones con JS, porque ya son accesibles (Tab + flechas, y los lectores de pantalla los anuncian).
- En desktop, el panel que no está elegido no desaparece: queda como un **riel** vertical que se puede clickear.
- **Contraste:** mi salmón `#E09F93` sobre el fondo crema da 2.1:1 y no pasa WCAG. Lo uso solo para fondos y decoración, y agregué `#9A4E42` (5.6:1) para texto.

**Problemas**
- A 390px el menú del header se partía en dos líneas y aparecía scroll horizontal. Lo resolví poniendo el header en columna en mobile y `whitespace-nowrap`.

---

### Días 2 y 3 — 11 y 12/11

**Qué hice**
- Hice `ProjectCard`: cada marca con la que trabajé es una tarjeta que abre un modal (`<dialog>`) con mis tareas y los videos.
- Sumé los videos UGC (TikTok, Instagram y videos locales). El reproductor de TikTok recién se carga al tocar play, para que la página no cargue cosas de más.
- El toggle pasó de 2 a 3 opciones: `[ CONTENT ⇄ DESIGN ⇄ CODE ]`, porque el diseño gráfico y UX/UI también es parte de lo que hago.
- _(completar: qué más hice y qué problemas tuve estos días)_

---

### Día 4 — 13/11

Fue el día de rediseñar la estructura. Probé varias versiones hasta encontrar una que me cerrara.

**Lo que probé y descarté**
1. **Nombre arriba y Design debajo.** Saqué mi nombre del centro y puse los proyectos de diseño abajo. Perdía fuerza: el nombre quedaba como un título más.
2. **Nombre flotando encima de los proyectos de Design.** Quedaba tapando las imágenes y no se entendía.
3. Volví a la versión original (nombre en el centro de Content | Code) mientras pensaba otra cosa.
4. **Tres columnas con "muestras" de proyectos.** Cada columna mostraba algunos proyectos y un botón "Ver todo". Mezclaba la portada con las listas y se veía recargado.

**Lo que quedó**
- Me armé una maqueta en HTML como referencia: tres columnas iguales, **Content | Design | Code** (en el mismo orden que el toggle), con mi nombre y el toggle arriba al centro. No copié su código (usaba Tailwind por CDN, Font Awesome y colores sueltos); la rehice con mis componentes y mis tokens.
- La pantalla de inicio es una **portada visual**: cada columna es una "imagen" (el celular con el reel, un frame tipo Figma con mi proyecto destacado y la paleta real del sitio, y el editor de código).
- Al tocar un botón, ese panel se agranda y aparecen **sus proyectos** al lado de la imagen. Los otros dos quedan como rieles.
- En mobile se ve un panel a la vez y se cambia con el toggle, que queda fijo arriba al scrollear.

**Cómo lo resolví en código**
- Agregué un cuarto estado, `data-view="all"`, para la portada. Al entrar, el toggle no tiene ninguna opción marcada (con radios nativos eso es válido) y se vuelve al inicio tocando mi nombre en el header.
- Los proyectos de cada panel tienen la clase `.more`, que solo se ve cuando ese panel está elegido. Todo depende de `data-view`, sin JS extra.
- El proyecto destacado de diseño se marca con `featured: true` en `profile.ts`, así no queda escrito a mano en el HTML.
- Para que la imagen y los proyectos se pongan lado a lado usé una **container query** (`@container`): el diseño depende del ancho del panel (que cambia con el toggle), no del de la pantalla.

**API de GitHub**
- Hice `DynamicApiWidget`: trae mis repos públicos de la API de GitHub y muestra los que tienen el topic `portfolio` y una URL de Vercel. Para sumar un proyecto no toco código: le pongo el topic en GitHub.
- Al principio los mostraba en una sección aparte "desde GitHub", pero para quien visita son todos mis proyectos, así que los junté en una sola lista con los de `profile.ts`. Si la API falla, los de `profile.ts` se siguen viendo, con un aviso y un botón "Reintentar".
- Hice `ProjectLink` para que las tarjetas fijas y las que llegan de la API usen el mismo markup (el widget la usa vacía como molde dentro de un `<template>`).
- Marqué 3 repos con el topic: castingFlow, Keipana Academy y UGC Gaia.

**Otras decisiones**
- **Proyectos de diseño:** los datos están en `profile.ts`, las imágenes locales en `public/design/` y cada tarjeta linkea a Behance. No usé base de datos porque no le suma nada a la propuesta, y no tomo las imágenes directo de Behance porque si cambian las URLs se rompen. Behance tampoco me sirve como API porque su API pública está cerrada.
- Moví la "Animación Gimnasio" de Content a **Design → Motion**: es una pieza de motion, no contenido para redes.
- Agregué un **"Sobre mí"** con el texto de mi CV. Lo probé debajo de mi nombre, pero en la portada no entraba, así que quedó debajo de las columnas.
- **Portada del reel:** quise sacar la miniatura de TikTok con su API (oEmbed), pero para este video no la devuelve, y además esas URLs vencen. Usé una captura mía guardada en `public/videos/`.

**Problemas**
- Después de poner imagen y proyectos lado a lado, **los proyectos de Design desaparecieron**. La lista tenía `@container` y `mx-auto` dentro de una grilla: `mx-auto` hace que el elemento tome el ancho de su contenido, pero un container no usa su contenido para calcular su ancho, así que quedaba en 0px. Lo arreglé con `w-full`. Aprendí que un `@container` necesita un ancho que le venga de afuera.

**Deploy**
- Subí el sitio a Vercel: https://portfolio-mandelman-renata.vercel.app. Como es estático, no tuve que configurar nada (Vercel detecta Astro solo). Después actualicé `site` en `astro.config.mjs` con la URL real.

**Pruebas de pantalla**
- [ ] 390px: portada, Content, Design, Code
- [ ] 1440px: portada, Content, Design, Code
- [ ] Sitio publicado en el celular

**Pendiente**
- Los links "Proyectos" y "Experiencia" del header apuntan a partes que en la portada están ocultas.
- La foto del reel pesa 462 KB y se ve chiquita: achicarla.
- Completar las otras secciones de este README.

---

### Uso de IA

| Tarea | Herramienta | Qué decidí yo | Qué revisé / cambié / descarté |
| --- | --- | --- | --- |
| Estructura inicial, config y layout split | Claude | — | _completar: qué entendí, qué modifiqué_ |
| Rediseño a tres columnas, estado `all`, portada visual | Claude Code (en VS Code) | Las versiones que probé y descarté, la maqueta de referencia, que la portada sea solo imagen y que al tocar cada botón se vean los proyectos. | _completar_ |
| `DynamicApiWidget` y `ProjectLink` (API de GitHub) | Claude Code | Usar GitHub con topics en vez de cargar los proyectos a mano; qué repos mostrar; juntar todo en una sola lista. | _completar_ |
| Bug del `@container` en 0px | Claude Code | Lo detecté yo al ver que no aparecían los proyectos de Design. | _completar_ |
| Redacción de esta bitácora | Claude Code | Pedí que la fuera escribiendo a partir de lo que hacíamos; la reviso y la corrijo yo. | _completar_ |
