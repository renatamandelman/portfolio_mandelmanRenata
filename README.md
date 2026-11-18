# Renata Mandelman — Portfolio "Split View"

Portfolio personal e interactivo para el Examen Final de **Programación Multimedial IV**.
Hago videos para redes, diseño y páginas web. El sitio es una pantalla dividida en esas tres partes, y quien entra elige por dónde empezar desde el hero ("¿Qué querés ver?"). Cada área le cambia a toda la página la forma de mirar: como un feed, como un archivo de Figma o como un plano técnico.

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
    ├── components/         # Componentes propios (Hero, ViewToggle, ProjectCard, BrowserCard, DynamicApiWidget, ProjectLink)
    ├── data/profile.ts     # Todos los datos: textos, áreas, videos, diseños, proyectos, herramientas
    ├── layouts/            # BaseLayout (head/SEO) y SplitLayout (las tres columnas)
    ├── pages/index.astro   # Página principal
    └── styles/global.css   # Design tokens y estilos base
```

## Componentes propios

**`ViewToggle.astro`**: guarda qué área se está viendo (Redes sociales, Diseño o Programación) en `<html data-view>`, y el CSS cambia la pantalla según eso. Son radios en vez de botones porque así funciona con teclado y con lectores de pantalla sin programarlo aparte. Se acuerda de la última vista (con `localStorage`). Después del testeo escondí la barra: se navega con las pastillas del hero, los botones "Ver mis…" y los rieles, que "clickean" estos radios. Los radios siguen en la página y la barra aparece si alguien llega con Tab, así nunca hay un foco invisible.

**`Hero.astro`**: es la presentación de arriba de todo. Muestra "PORTFOLIO" gigante, mi nombre, un abanico con tres trabajos reales (uno de cada área), una tarjeta con lo que hago y otra con las tres áreas como botones, y abajo un dock con mis herramientas. Recibe todo por props desde `profile.ts` y no guarda estado: los botones de las áreas usan `data-go`, el mismo mecanismo que los rieles, que "clickea" el radio del toggle. Lo separé en un componente porque tiene una responsabilidad clara (presentarme) y mucho CSS propio.

**`ProjectCard.astro`**: es la tarjeta de cada video que elegí mostrar en Redes sociales (los marcados con `featured: true`). Muestra la portada vertical con la marca y el título, y al tocarla abre un modal con el video y para quién lo hice (empresa, puesto y tareas). Usé `<dialog>` porque ya trae el cierre con Esc y el manejo del foco. El reproductor de TikTok o Instagram se carga recién al abrir el modal, para que la página no tarde más de lo necesario.

**`BrowserCard.astro`**: muestra la captura de un sitio mío dentro de una "ventana de navegador", y toda la ventana es un link al sitio. La uso en la portada (inclinada) y en Programación (cuadrados): por eso la separé, para no repetir el mismo markup.

**`DynamicApiWidget.astro`**: trae mis proyectos de programación desde la API de GitHub. Muestra solo los repos que tienen el topic `portfolio`, así para sumar un proyecto nuevo no tengo que tocar el código. Recibe `exclude` con los sitios que ya muestro en los cuadrados, para no repetirlos. Tiene cuatro estados: cargando, con datos, vacío ("Por ahora no hay más proyectos para mostrar") y error con un botón para reintentar.

**`ProjectLink.astro`**: es el diseño de cada proyecto de la lista. Lo separé en un componente para que los proyectos que escribí yo y los que llegan de GitHub se vean exactamente iguales.

Además, los layouts tienen su propia lógica: `SplitLayout.astro` arma las tres columnas y decide cuál se agranda según la vista elegida (todo con CSS), y `BaseLayout.astro` carga la vista guardada antes de que se dibuje la página, para que no se vea un "salto" al entrar.

## Tecnologías y decisiones

**Astro** era obligatorio, pero además le queda bien a mi portfolio: casi todo el sitio es contenido que no cambia, así que Astro lo arma como HTML plano y la página carga rápido. El JavaScript lo usé solo donde hace falta: el toggle, los modales y el pedido a GitHub.

**Tailwind CSS (v4)** lo usé porque ya lo conocía y me deja maquetar rápido. No tiene archivo de configuración: mis colores, tipografías y espacios están definidos como *tokens* en `src/styles/global.css`, así si quiero cambiar un color lo cambio en un solo lugar. Para las partes más complejas, como las columnas que cambian según la vista, escribí CSS común dentro de cada componente porque se entiende mejor.

**Tipografías:** Bricolage Grotesque para mi nombre y los títulos, porque es amable y con personalidad; Inter para los textos y JetBrains Mono para los detalles "de código" (las direcciones de los sitios, las etiquetas y los títulos de la lente de Programación). Las instalé con Fontsource para que se sirvan desde mi sitio y no dependan de Google Fonts.

**No usé React ni otro framework.** Las interacciones son simples y con TypeScript dentro de los `<script>` de Astro alcanzaba. Sumar un framework hubiera sido más código para explicar sin que la experiencia mejore.

Otras decisiones importantes:
- **Una sola fuente de verdad para la vista:** la vista elegida vive solo en `<html data-view>`. El toggle la escribe y el CSS la lee. Así no hay dos cosas que se puedan desincronizar.
- **Los datos separados del diseño:** mi experiencia, las marcas, los proyectos y los textos están en `src/data/profile.ts`. Los componentes reciben esos datos y los muestran, así para sumar algo no toco el HTML.
- **Elementos nativos primero:** radios para el toggle, `<dialog>` para los modales y `<button>` para todo lo que se toca. Ya vienen accesibles y me ahorran código.
- **Deploy en Vercel:** como el sitio es estático, Vercel detecta Astro solo y no tuve que configurar nada.

## API / fuente dinámica

Uso la **API pública de GitHub**, sin token:

```
GET https://api.github.com/users/renatamandelman/repos?per_page=100&sort=updated
```

**Qué información obtengo:** la lista de mis repositorios. De cada uno uso el nombre, la descripción, la URL del sitio publicado (el campo "Website") y los *topics*. Muestro solo los repos que tienen el topic `portfolio` y una URL publicada. Así, para sumar un proyecto al portfolio no toco el código: en GitHub le pongo el topic y el link de Vercel, y aparece solo.

**Cómo se integra:** en Programación muestro primero tres sitios que elegí, en cuadrados con su captura (`profile.ts`). Debajo, "Más proyectos, desde mi GitHub" lista los repos de la API, sin repetir los de arriba (`exclude`).

**Estados y qué pasa si algo falla:**
- **Cargando:** mientras espera la respuesta, debajo de la lista aparece "Cargando más proyectos…".
- **Con datos:** se agregan los proyectos y el aviso desaparece.
- **Vacío:** si GitHub responde pero no queda ningún repo para mostrar, aparece "Por ahora no hay más proyectos para mostrar" en vez de un hueco.
- **Error:** distingo tres casos con mensajes distintos: sin conexión, límite de pedidos (GitHub responde 403) y cualquier otro error de GitHub. En los tres casos los tres sitios de arriba se siguen viendo (no dependen de la API) y aparece un botón **"Reintentar"**.

**Límites:** sin token, GitHub permite **60 pedidos por hora por IP**. Para un portfolio alcanza, porque cada visita hace un solo pedido. Si se pasa, aviso que hay que probar en un rato. No usé token porque en un sitio estático quedaría visible en el código del navegador.

Los cambios de estado también se anuncian a lectores de pantalla (`aria-live`) y la lista se marca como "ocupada" mientras carga (`aria-busy`).

**Proyectos de diseño (Behance):** quise traerlos de Behance, pero su API pública está cerrada. Por eso los cargué en `profile.ts`, con las imágenes guardadas en `public/design/`, y cada tarjeta lleva a su proyecto en Behance.



## Responsive y accesibilidad

**Responsive.** No quise que en el celular el sitio fuera la versión de escritorio achicada, así que cambia la forma de recorrerlo:
- **Desktop (desde 1024px, una notebook chica):** el hero muestra las tarjetas a los costados del abanico, que se achican con `clamp()` para no pisarse en pantallas chicas. Las tres columnas se ven una al lado de la otra y cada una se alinea según su lugar (izquierda, centro, derecha). Al elegir un área, esa columna se agranda y las otras dos quedan como rieles finitos que se pueden tocar para cambiar.
- **Tablet (640 a 1023px):** en el hero el abanico va primero y las dos tarjetas quedan lado a lado debajo. Las columnas se apilan, todas alineadas a la izquierda, que se lee mejor.
- **Mobile:** en el hero, primero el abanico (lo visual) y después las tarjetas, una debajo de la otra; el dock se scrollea de costado. Al elegir un área se ve solo ese panel, con "← Ver las tres áreas" arriba y, al final, botones para ir a las otras áreas sin volver arriba.
- Para las grillas de trabajos usé **container queries** (`@container`): la cantidad de columnas depende del ancho del panel, que cambia según el área elegida, y no del ancho de la pantalla.
- Revisé la portada y las tres áreas a 390, 768, 1024 y 1440 px.

**Accesibilidad.**
- **Elementos nativos:** el toggle son radios, los modales son `<dialog>` y todo lo que se toca es un `<button>` o un link. Así funciona con teclado (Tab, flechas, Esc) sin programarlo aparte.
- **Foco visible:** cuando navegás con teclado, todo lo que tiene foco muestra un borde oscuro.
- **Link "Saltar al contenido":** es lo primero que aparece al tocar Tab y lleva directo al contenido principal.
- **Contraste:** mi verde agua (`#7FCFC3`) es muy claro para usarlo como color de texto, así que lo uso solo de fondo, con texto oscuro encima (9,8:1). Para textos y links uso un verde petróleo (`#1B6B60`, 6:1). Como el fondo es un degradé, oscurecí el gris de los textos secundarios (`#5B5B63`) para que pase el mínimo (4,5:1) también en la parte más oscura.
- **Movimiento reducido:** si la persona tiene activado "reducir movimiento" en su sistema, se cortan las animaciones: el fundido entre áreas, la animación del hero al scrollear y los efectos al pasar el mouse.
- **Toggle escondido pero accesible:** la barra no se ve, pero sus radios siguen en la página. Si alguien navega con Tab, la barra aparece, así nunca hay un foco invisible. Los cambios de área se anuncian a lectores de pantalla.
- **Imágenes:** las imágenes de los proyectos tienen `alt=""` a propósito, porque el link ya tiene el nombre del proyecto en texto y el lector lo diría dos veces. Los videos embebidos tienen un `title` con la marca y el nombre del video.

## Limitaciones y mejoras

Cosas que sé que todavía se pueden mejorar:
- **Los proyectos de diseño se cargan a mano.** Como la API de Behance está cerrada, cada proyecto nuevo lo tengo que sumar en `profile.ts`.
- **Límite de GitHub.** Sin token son 60 pedidos por hora por IP. Si alguna vez no alcanza, la mejora sería traer los repos en el momento del build en vez de en el navegador.
- **La animación del hero al scrollear no anda en Firefox**, que todavía no soporta las scroll-driven animations. Ahí el hero se ve quieto, sin romperse.
- **Las portadas de los videos son capturas fijas** del primer cuadro. Si cambio un video, tengo que volver a sacar su portada.


## Créditos y uso de IA

- **Tipografías:** Bricolage Grotesque, Inter y JetBrains Mono (SIL Open Font License), instaladas con Fontsource.
- **Videos UGC y de redes:** son trabajos míos para cada marca. Los nombres y productos (La Roche-Posay, Vichy, CeraVe, Maybelline, Cocinarg, entre otras) pertenecen a sus marcas y aparecen solo para mostrar mi trabajo.
- **Videos de TikTok e Instagram:** se muestran con los reproductores oficiales de cada plataforma (embeds). Las portadas son capturas del primer cuadro de esos mismos videos.
- **Proyectos de diseño:** son míos; las versiones completas están en mi Behance.
- **Datos de proyectos web:** API pública de GitHub.
- **Maqueta de referencia de la portada:** hecha con Google Stitch (no usé su código).
- **Referencia visual del hero:** `referencias/image.png`, un portfolio de otra diseñadora que usé como inspiración de composición. No usé su foto, sus textos ni sus íconos.
- Uso de IA: ver [Bitácora → Uso de IA](#uso-de-ia).

---

## Bitácora

> Mi registro de cómo fui armando el portfolio: qué hice, por qué, qué probé y descarté, y qué me quedó pendiente.
> Lo voy escribiendo al terminar cada jornada.
> Cada día cuenta cómo era el sitio en ese momento, así se ve cómo fue cambiando (por ejemplo, el toggle `[ CONTENT ⇄ CODE ]` del principio). Cómo es el sitio hoy está en las secciones de arriba.

### El problema que quiero resolver

Mi perfil tiene tres partes que en un CV quedan desconectadas: **creación de contenido / RRSS** , **Diseño** y **desarrollo web** .
La idea de "Split View" es que esa mezcla sea la *forma* del sitio y no solo un dato: la persona que entra elige desde qué lado leerme.

### Alternativas que pensé al principio

- **Portfolio de scroll único con secciones:** funciona, pero no muestra que mis áreas se mezclan; parece un CV largo.
- **Una página por área (/content, /design, /code):** rompe la idea de ver todo junto.
- **Pantalla dividida + toggle de modo de lectura** ✅ (la que elegí): la interacción principal cambia cómo se lee todo el sitio.

---

### Día 1 — 10/11

**De dónde arranqué**

Mi primer diseño tenía dos columnas, **Content | Code**, con mi nombre grande en el centro y un toggle de dos opciones. Todavía no existía la columna de Design (la sumé en los días 2 y 3).

![Primer diseño: dos columnas, Creación de contenido a la izquierda y Desarrollo web a la derecha, con mi nombre grande en el centro y el toggle Content / Code debajo](referencias/hero.png)

**Qué hice**
- Armé el proyecto con Astro 7 + Tailwind v4 (como plugin de Vite) y fuentes autoalojadas (Inter y JetBrains Mono).
- Definí los colores y tipografías como tokens en `src/styles/global.css` con `@theme`.
- Hice `BaseLayout`, `SplitLayout` y mi primer componente: `ViewToggle`.
- Separé los datos del CV en `src/data/profile.ts`.

**Decisiones**
- La vista elegida se guarda en `<html data-view>`: es la única "fuente de verdad". El toggle la escribe y el CSS la lee.
- Usé **radios nativos** para el toggle en vez de botones con JS, porque ya son accesibles (Tab + flechas, y los lectores de pantalla los anuncian).
- En desktop, el panel que no está elegido no desaparece: queda como un **riel** vertical que se puede clickear.

**Problemas**
- A 390px el menú del header se partía en dos líneas y aparecía scroll horizontal. Lo resolví poniendo el header en columna en mobile y `whitespace-nowrap`.

---

### Días 2 y 3 — 11 y 12/11

**Qué hice**
- Hice `ProjectCard`: cada marca con la que trabajé es una tarjeta que abre un modal (`<dialog>`) con mis tareas y los videos.
- Sumé los videos UGC (TikTok, Instagram y videos locales). El reproductor de TikTok recién se carga al tocar play, para que la página no cargue cosas de más.
- El toggle pasó de 2 a 3 opciones: `[ CONTENT ⇄ DESIGN ⇄ CODE ]`, porque el diseño gráfico y UX/UI también es parte de lo que hago.


---

### Día 4 — 13/11

Fue el día de rediseñar la estructura. Probé varias versiones hasta encontrar una que me cerrara.

**Lo que probé y descarté**
1. **Nombre arriba y Design debajo.** Saqué mi nombre del centro y puse los proyectos de diseño abajo. Perdía fuerza: el nombre quedaba como un título más. 
2. **Nombre flotando encima de los proyectos de Design.** Quedaba tapando las imágenes y no se entendía.
3. Volví a la versión del principio (nombre en el centro de Content | Code, como en la captura del Día 1) mientras pensaba otra cosa. Pero ya no me servía: con Design tenía que haber tres columnas.
4. **Tres columnas con "muestras" de proyectos.** Cada columna mostraba algunos proyectos y un botón "Ver todo". Mezclaba la portada con las listas y se veía recargado.

**Lo que quedó**
- Me armé una maqueta en HTML con google Stitch como referencia: tres columnas iguales, **Content | Design | Code** (en el mismo orden que el toggle), con mi nombre y el toggle arriba al centro. La rehice con mis componentes y mis tokens.
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
- [x] 390px: portada, Content, Design, Code
- [ ] 1440px: portada, Content, Design, Code
- [ ] Sitio publicado en el celular

**Pendiente**
- Los links "Proyectos" y "Experiencia" del header apuntan a partes que en la portada están ocultas. _(Experiencia: resuelto el Día 5)_
- ~~La foto del reel pesa 462 KB y se ve chiquita: achicarla.~~ _(resuelto el Día 5: 216 KB)_
- ~~Completar las otras secciones de este README.~~ _(resuelto el Día 5)_

---

### Día 5 — 18/11

**Qué hice**
- Completé partes del README: a quién está dirigido el portfolio, los componentes propios y las tecnologías y decisiones.
- Ordené la bitácora: sumé la captura de mi primer diseño (dos columnas) en el Día 1 para que se vea de dónde arranqué.
- Agregué la sección **Experiencia** debajo de "Sobre mí", con mi CV separado en dos columnas: **Actual** y **Terminado**. Sale de `experiences` en `profile.ts`: si el período dice "Presente", va en Actual.
- Sumé mi **foto en "Sobre mí"**, recortada en círculo y con el texto centrado al lado.
- Saqué las etiquetas del final de cada columna ("Creative Lab", "Diseño UI/UX", "Desarrollo"): repetían lo que ya dice el título de arriba.
- Cambié el título de la pestaña a "Renata Mandelman - Portfolio".
- Cambié los subtítulos de las columnas para que las tres tengan el mismo formato: "Edición · Reels · UGC · Community" en Content (antes decía "Diseño multimedial, desarrollo y RRSS", que eran cosas de las otras columnas) y "Frontend · Astro · React · APIs" en Code.
- **Hice que el toggle se entienda en la portada.** Al entrar no hay ninguna opción marcada y parecía un subtítulo, no algo para tocar. Ahora, solo en la portada:
  - cada opción tiene fondo rosado, como un botón, y se pinta al pasar el mouse;
  - al cargar, las tres se iluminan una tras otra (Content → Design → Code) dos veces y se quedan quietas;
  - debajo aparece la pista "Elegí Content, Design o Code para ver cada área", que antes solo se veía en mobile.
- Completé los créditos del README y el período de mi trabajo freelance (2025 — Presente).
- Sumé reels y placas de **Mentes Brillantes** y **Gaia** a sus modales. Del código de Instagram solo uso el id de cada publicación: mi componente arma el reproductor y lo carga recién al abrir el modal (si pegaba el script de Instagram, cargaba apenas entrabas a la página).
- Cargué mi engagement real (11,55%) en la tarjeta de la portada, en vez del valor de ejemplo.
- Saqué el "N videos" de las tarjetas de cada empresa.
- Agregué la sección **Contacto** al final, con link en el header: un botón para escribirme por mail (`mailto:`), otro para WhatsApp (`wa.me`, con un mensaje ya escrito) y mis redes. El footer quedó solo con el copyright para no repetir las redes. Los datos están en `contact`, en `profile.ts`, y si el número de WhatsApp está vacío, el botón no se muestra.

**Decisiones**
- **Saqué el link "Proyectos" del header.** Apuntaba a los proyectos de Code, que en la portada están ocultos, así que no hacía nada. La forma de llegar a los proyectos es el toggle.
- **Los números de la portada se calculan solos.** Antes eran valores de ejemplo ("+100 reels", "+300 piezas"). Ahora salen de mis datos: cuántas marcas y videos hay en `experiences` y cuántas piezas en `designWork`. Uso un `Set` para no contar dos veces la misma marca. El "+" es porque muestro una selección: hice más trabajos de los que están en el portfolio.
- **El link "Experiencia" del header ahora lleva a algo.** 
- **Le cambié el nombre de "Dual View" a "Split View".** "Dual" venía de cuando eran dos áreas (Content y Code). Al sumar Design dejó de tener sentido. "Split View" describe lo que pasa en pantalla, que está dividida, y coincide con el nombre de mi layout, `SplitLayout`.
- **La animación del toggle es solo CSS** (`@keyframes` y un `animation-delay` distinto por opción) y depende de `data-view="all"`, así que no sumé JavaScript ni otra fuente de estado. Cuando elegís una vista desaparece sola. Si la persona tiene activado "reducir movimiento", no se anima.

---

### Día 5 (tarde) — Testeo con usuarios y cambios

**El testeo**
- Le mostré el portfolio publicado a _(completar: cuántas personas y quiénes, por ejemplo amigos, familia o compañeros)_ sin explicarles nada.
- **Nadie sabía dónde tocar:** no se daban cuenta de que el toggle abría los trabajos.
- **Parecía un CV:** lo que se leía de corrido era "Sobre mí", "Experiencia" y números, y casi no se veía trabajo.
- Me di cuenta de que mi portfolio está pensado para marcas y emprendimientos, y muchos no saben qué es "UGC", "frontend" o "engagement". Tenía que hablar como ellos.

**Qué cambié por el testeo**
- **Textos que entienda cualquiera:** el toggle ahora dice **Redes sociales · Diseño · Programación** (antes Content · Design · Code). Debajo de mi nombre hay una frase que dice qué hago, y las columnas tienen subtítulos en lenguaje simple ("Videos para que más gente conozca tu marca").
- **Un botón para cada área:** cada columna de la portada termina con "Ver mis videos →", "Ver mis diseños →" o "Ver mis páginas web →". Reusan los mismos `data-go` que los rieles, que "clickean" el radio del toggle, así no sumé otra fuente de estado.
- **Trabajo real en la portada:** saqué las maquetas (el frame de Figma con la paleta y el editor con código de ejemplo). Ahora Diseño muestra un collage con 3 trabajos de Behance y Programación una captura de un sitio que hice (Mentes Brillantes), y cada uno lleva al proyecto real.
- **Menos CV:** saqué la sección Experiencia y reescribí "Sobre mí" en primera persona y sin jerga.
- **Refresh visual:** el bloque del nombre tapa las líneas entre columnas, los subtítulos se leen como frases y los botones van en mi salmón con texto oscuro. La portada entra en una pantalla de 1440×900.
- **Saqué las tarjetas de números de Redes sociales** (marcas, videos, interacción): eran más "datos de CV" que trabajo. Ahora esa columna muestra solo mi reel.
- **Tipografía nueva para mi nombre y los títulos: Bricolage Grotesque.** Inter en mayúsculas se veía seca. Bricolage es más amable y tiene más personalidad, y la escribo en minúsculas para que se sienta más cercana. La sumé como token (`--font-display` en `global.css`), así Tailwind genera la clase `font-display` y cambiarla es tocar una sola línea.
- **Saqué la barra de navegación de arriba.** Tenía solo dos links (Sobre mí y Contacto) y competía con el toggle, que es la navegación real del sitio. El nombre chico de la barra era la forma de volver a la portada, así que pasé esa función a mi nombre grande: es un link a "/" con el mismo `data-home` de antes. Debajo del nombre sumé "Diseñadora multimedial".
- **Hero nuevo inspirado en una referencia** (`referencias/image.png`, un portfolio con estética de estudio fotográfico). Tomé la composición: la palabra "PORTFOLIO" gigante, el nombre fino con el año, tarjetas tipo vidrio a los costados y un dock de herramientas abajo. La adapté a mi portfolio: sin foto mía (en el centro va un abanico con tres trabajos reales), con mis colores y con las tres áreas como botones en la tarjeta de la derecha. Los íconos del dock son tiles con iniciales y mis colores, no los logos de las marcas.
- Con el hero como sección propia arriba, saqué el CSS que hacía flotar el nombre encima de las columnas: `SplitLayout` quedó más simple.
- La lista de áreas (id, texto y botón) pasó a `profile.ts` (`areas`), así el hero y `SplitLayout` usan la misma y no hay que cambiarla en dos lugares.
- **Paleta verde agua.** Cambié el salmón por tonos verde agua. Como los colores son tokens en `global.css`, cambiar los valores de `accent`, `accent-soft` y `accent-ink` alcanzó para cambiar todo el sitio. Antes de elegirlos medí el contraste: el verde agua va solo de fondo y para texto uso un verde petróleo.
- **El fondo del hero ahora está en toda la página.** Lo saqué del `Hero` y lo puse en `body::before`, una capa con `position: fixed` detrás de todo: no se estira cuando la página es larga y se ve igual al scrollear. Por eso oscurecí un poco el gris de los textos secundarios.
- **Mostrar menos, elegido por mí.** A la gente no le interesa ver todo. En Redes sociales quedaron 4 videos (CeraVe, Vichy, Muydinnette y Gaia), marcados con `featured: true`; `ProjectCard` pasó de "una tarjeta por marca" a "una tarjeta por video". En Diseño, como mucho 2 trabajos por categoría y más chicos. En Programación, 3 sitios en cuadrados con su captura, y el widget de GitHub abajo como "Más proyectos".
- **Portadas de los videos:** solo Vichy tenía portada y los otros se veían como cajas vacías. Saqué una captura del primer cuadro desde el reproductor oficial de cada uno y las guardé en `public/videos/`.
- **Escondí la barra del toggle** porque ya había tres formas de elegir área (pastillas del hero, "Ver mis…" y rieles). No la borré: sus radios son los que guardan la vista.
- **Lentes: cada área cambia la mirada de toda la página.** Con el mismo `data-view` y solo CSS:
  - **Redes sociales:** fondo más vivo y un aro de color en cada video, como las historias.
  - **Diseño:** una grilla de 12 columnas de fondo y un marco de selección tipo Figma al pasar el mouse.
  - **Programación:** fondo de puntos, títulos en tipografía mono y bordes punteados, como un plano técnico.

  El cambio se anima solo porque `ViewToggle` ya usaba la View Transitions API.
- **Dentro de un área, solo lo que elegí.** La imagen de portada de cada columna (el celular, el collage, la captura grande) era un "ejemplo" que se repetía con los trabajos. Ahora tiene la clase `.pane-cover` y solo se ve en la portada.
- **Botón "← Ver las tres áreas"** arriba de cada área. Antes la única forma de volver era tocar mi nombre, que recargaba la página. Para no crear otra fuente de estado, el botón solo tiene `data-show-all`, y el que lo atiende es `ViewToggle`: desmarca los radios, escribe `data-view="all"` y borra la vista guardada.
- **El hero "se abre" al scrollear** (scroll-driven animations): con `animation-timeline: scroll()` la animación avanza con el scroll y no con el tiempo. Las letras de PORTFOLIO se separan, el abanico se abre y las tarjetas se van hacia los costados. Está adentro de `@supports`: en Firefox, que todavía no lo soporta, el hero se ve quieto y no se rompe. También respeta "reducir movimiento".
- **Sumé el video de Hogar & Deco** a Redes sociales y saqué de `profile.ts` los tres que borré.

**Problemas**
- **Probando el botón de volver con Chrome sin pantalla (headless)**, la vista quedaba "un paso atrasada". Era la animación: `startViewTransition` cambia la vista recién cuando el navegador dibuja un cuadro, y sin pantalla casi no dibuja. Con "reducir movimiento" (sin animación) anduvo perfecto, así que la lógica estaba bien. En el navegador normal funciona.

**Responsive (revisión completa)**
- Revisé la página en 390, 768, 1024 y 1440 px, en la portada y dentro de cada área. Arreglé:
  - **Tablet y notebook chica:** las columnas recién se ponían lado a lado desde 1100px, así que en 1024 la página quedaba larguísima. Bajé el corte a 1024px.
  - **Columnas apiladas:** cada título se alineaba distinto (izquierda, centro, derecha), lo que solo tiene sentido lado a lado. Apiladas, ahora van todas a la izquierda.
  - **Hero a 1024px:** el abanico se pisaba con las tarjetas. Lo achiqué con `clamp()`.
  - **Hero en celular y tablet:** arrancaba con la tarjeta de texto; ahora va primero el abanico, y en tablet las dos tarjetas quedan lado a lado.
  - **Programación a 1024px:** el tercer sitio quedaba solo en otra fila; ahora entran los tres.
  - **Contacto:** todavía decía "Contenido UGC". Lo cambié por palabras simples.
- **Favicon nuevo:** la estrella de las pastillas del hero, en mi verde petróleo. El viejo eran dos rectángulos con el salmón de antes. Es un SVG con `@media (prefers-color-scheme: dark)` adentro: en modo oscuro la estrella pasa a verde agua para que se vea sobre la pestaña oscura.

**Decisiones**
- **Cambié solo los textos, no los nombres internos.** Los estados siguen siendo `content`, `design` y `code` en el código. Así no tuve que tocar el CSS ni lo que ya estaba guardado en `localStorage`.
- **En celular el toggle esconde los corchetes y las flechas.** Con palabras más largas no entraba en 390px, y esos signos son decorativos.

**Pruebas**
- Revisé la portada y la vista Programación a 1440×900 y la portada a 390px.

---

### Uso de IA

Usé dos herramientas, cada una para algo distinto:
- **Google Stitch:** para armar una maqueta visual de referencia de la portada en tres columnas. Use su codigo como referencia, la tomé como guía y la rehice con mis componentes y mis tokens.
- **Claude Code** (dentro de VS Code): como asistente mientras programaba.

**Para qué usé Claude Code**
- Ayudarme a programar con Astro, ya que nunca lo habia utilizado.
- Resolver dudas y que me explicara partes del código, por ejemplo cómo funcionan las container queries o la API de GitHub.
- Encontrar la causa de errores, como el `@container` que quedaba en 0px.
- Ayudarme con las partes más complejas, como el widget de GitHub, el estado `all` de la portada y la animación del toggle.
- Ordenar y redactar la bitácora y el README a partir de lo que yo iba haciendo y decidiendo.

**Cómo trabajé con ella**
- En `CLAUDE.md` le dejé reglas fijas: explicarme en español qué cambia antes de editar, hacer cambios chicos, comentar el código en español, no sumar frameworks ni dependencias sin preguntar y usar solo mis colores (tokens).
- Le pedí que escribiera el README de a una sección, con mi voz de estudiante y no como IA. Revisé cada parte antes de hacer cada commit.
- Hice commits chicos para poder revisar cada cambio por separado.

**Qué decidí yo**
- El concepto: una pantalla dividida que se lee desde Content, Design o Code.
- Las versiones de la portada que probé y descarté, y la maqueta de referencia que armé con Google Stitch.
- Sumar la columna Design y cambiar el nombre de "Dual View" a "Split View".
- Que el toggle tenía que entenderse mejor, y cuáles de las propuestas hacer.

**Qué revisé, cambié o descarté**
- Cada vez que escribia en el Readme, me ocupaba de revisarlo y cambiarlo


**Problemas y límites que encontré**
- **La IA no sabe lo que no le cuento.** A veces escribía cosas que no podía saber, como cómo está configurado el deploy. Por eso revisé todo lo que escribía antes de hacer cada commit.
- **Detecté errores que la IA no vio,** como que los proyectos de Design desaparecían. Lo vi yo mirando el sitio, y después buscamos juntos la causa.
- **La IA no puede probar todo por mí.** Las pruebas en mobile las hice yo.
