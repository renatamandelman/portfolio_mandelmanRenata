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
- **Desktop:** el hero muestra las tarjetas a los costados del abanico, que se achican con `clamp()` para no pisarse en pantallas chicas. Las tres columnas se ven una al lado de la otra y cada una se alinea según su lugar (izquierda, centro, derecha). Al elegir un área, esa columna se agranda y las otras dos quedan como rieles finitos que se pueden tocar para cambiar.
- **Tablet:** en el hero el abanico va primero y las dos tarjetas quedan lado a lado debajo. Las columnas se apilan, todas alineadas a la izquierda, que se lee mejor.
- **Mobile:** en el hero, primero el abanico (lo visual) y después las tarjetas, una debajo de la otra; el dock se scrollea de costado. Al elegir un área se ve solo ese panel, con "← Ver las tres áreas" arriba y, al final, botones para ir a las otras áreas sin volver arriba.
- Para las grillas de trabajos usé **container queries** (`@container`): la cantidad de columnas depende del ancho del panel, que cambia según el área elegida, y no del ancho de la pantalla.


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

> Acá fui anotando cómo armé el portfolio: qué hice, por qué, qué probé y descarté y qué me quedó pendiente.
> Lo escribía al terminar cada día, así que cada día cuenta cómo era el sitio en ese momento (cómo quedó al final está más arriba en este README).

### El problema que quiero resolver

Hago tres cosas distintas: contenido para redes, diseño y páginas web. En un CV eso queda como tres cosas sueltas.
Con "Split View" quería que esa mezcla se viera en el sitio mismo, y que cada persona eligiera desde qué lado mirarme.

### Alternativas que pensé al principio

- Una sola página larga con secciones. Funcionaba, pero parecía un CV largo y no se veía que mis áreas se mezclan.
- Una página por área (/content, /design, /code). La descarté porque se perdía lo de ver todo junto.
- Pantalla dividida con un toggle para elegir qué mirar ✅. Es la que elegí, porque tocar el toggle cambia cómo se ve todo el sitio. Ademas me servia para pensar en la animación que iba a llevar.

---

### Día 1 — 10/11

**De dónde arranqué**

Mi primer diseño tenía dos columnas, Content y Code, con mi nombre grande en el medio y un toggle de dos opciones. La columna de Design todavía no existía, la sumé en los días 2 y 3.

![Primer diseño: dos columnas, Creación de contenido a la izquierda y Desarrollo web a la derecha, con mi nombre grande en el centro y el toggle Content / Code debajo](referencias/hero.png)

**Qué hice**
- Creé el proyecto con Astro 7 y Tailwind v4. Las fuentes (Inter y JetBrains Mono) están guardadas en el proyecto.
- Puse los colores y las tipografías como tokens en `src/styles/global.css`, con `@theme`.
- Hice `BaseLayout`, `SplitLayout` y mi primer componente, `ViewToggle`.
- Pasé los datos del CV a `src/data/profile.ts` para no tenerlos mezclados con el HTML.

**Decisiones**
- La vista que elegís queda guardada en un solo lugar, el atributo `data-view` de `<html>`. El toggle lo cambia y el CSS lo lee.
- Para el toggle usé inputs de tipo radio y no botones con JS. Los radios ya funcionan con el teclado (Tab y flechas) y los lectores de pantalla los leen bien, así que eso no lo tuve que programar.
- En compu, la columna que no está elegida no desaparece: queda finita al costado (le digo "riel") y se puede tocar para abrirla.

---

### Días 2 y 3 — 11 y 12/11

**Qué hice**
- Hice `ProjectCard`. Cada marca con la que trabajé es una tarjeta, y al tocarla se abre un modal (`<dialog>`) con lo que hice y los videos.
- Sumé los videos UGC de TikTok, de Instagram y algunos guardados en el proyecto. El reproductor de TikTok se carga recién cuando tocás play, para que la página no cargue de más.
- El toggle pasó a tener 3 opciones, `[ CONTENT ⇄ DESIGN ⇄ CODE ]`, porque el diseño gráfico y UX/UI también es parte de lo que hago.


---

### Día 4 — 13/11

Este día rehice la estructura. Probé varias versiones hasta que una me cerró.

**Lo que probé y descarté**
1. Mi nombre arriba y los proyectos de Design abajo. El nombre quedaba como un título más y perdía fuerza.
2. Mi nombre flotando encima de los proyectos de Design. Tapaba las imágenes y no se entendía nada.
3. Volví a la primera versión (nombre en el medio de Content y Code, como en la captura del Día 1) mientras pensaba otra cosa. Pero con Design ya necesitaba tres columnas, así que tampoco iba.
4. Tres columnas con algunos proyectos de muestra y un botón "Ver todo". Se mezclaba la portada con las listas y quedaba muy cargado.

**Lo que quedó**
- Armé una maqueta con Google Stitch para tener una referencia: tres columnas iguales, Content, Design y Code (en el mismo orden que el toggle), con mi nombre y el toggle arriba en el medio. Después la rehice con mis componentes y mis tokens.
- La pantalla de inicio pasó a ser una portada con una imagen por columna: un celular con el reel, un frame tipo Figma con mi proyecto destacado y la paleta del sitio, y un editor de código.
- Cuando tocás un área, esa columna se agranda y aparecen sus proyectos al lado de la imagen. Las otras dos quedan como rieles.
- En el celu se ve una columna a la vez y se cambia con el toggle, que queda fijo arriba cuando scrolleás.


**API de GitHub**
- Hice `DynamicApiWidget`. Trae mis repos públicos de GitHub y muestra los que tienen el topic `portfolio` y un link de Vercel. Si quiero sumar un proyecto no toco el código, le agrego el topic en GitHub y listo.
- Primero los mostraba en una sección aparte que decía "desde GitHub". Después pensé que a quien entra le da igual de dónde salen, así que los junté con los de `profile.ts` en una sola lista. Si la API falla, los de `profile.ts` se siguen viendo, con un aviso y un botón para reintentar.
- Hice `ProjectLink` para que las tarjetas fijas y las que vienen de la API tengan el mismo HTML. El widget usa una vacía, adentro de un `<template>`, como molde.
- Le puse el topic a 3 repos: castingFlow, Keipana Academy y UGC Gaia.

**Otras decisiones**
- Los proyectos de diseño están en `profile.ts`, las imágenes en `public/design/` y cada tarjeta lleva a Behance. No usé una base de datos porque no hacía falta. Tampoco traigo las imágenes directo de Behance: si cambian las URLs se rompen, y su API pública está cerrada.
- Pasé la "Animación Gimnasio" de Content a Design → Motion, porque es una pieza de motion y no contenido para redes.
- Agregué un "Sobre mí" con el texto de mi CV. Lo quise poner debajo de mi nombre pero en la portada no entraba, así que lo dejé debajo de las columnas.
- Para la portada del reel quise sacar la miniatura con la API de TikTok (oEmbed), pero para este video no la devuelve y además esas URLs vencen. Terminé usando una captura que guardé en `public/videos/`.

**Deploy**
- Subí el sitio a Vercel: https://portfolio-mandelman-renata.vercel.app. Como es estático no tuve que configurar nada, Vercel reconoce Astro solo. Después cambié `site` en `astro.config.mjs` por la URL real.
---

### Día 5 — 18/11

**Qué hice**
- Escribí más partes del README y sumé al Día 1 la captura de mi primer diseño.
- Agregué una sección Experiencia debajo de "Sobre mí" (Actual y Terminado, sale de `experiences` en `profile.ts`) y puse mi foto en círculo.
- Emparejé los subtítulos de las columnas y saqué las etiquetas de abajo, que repetían el título.
- Hice que el toggle se entienda en la portada. Como al entrar no hay nada marcado, parecía un subtítulo. Ahora, solo en la portada, cada opción tiene fondo como un botón y al cargar se iluminan una después de la otra, dos veces. Es solo CSS (`@keyframes` con un `animation-delay` distinto en cada una) y depende de `data-view="all"`. Si tenés "reducir movimiento", no se anima.
- Sumé reels. De Instagram solo uso el id de la publicación y mi componente arma el reproductor cuando abrís el modal. Si pegaba su script, se cargaba apenas entrabas a la página.
- Agregué Contacto al final, con un botón de mail (`mailto:`) y otro de WhatsApp (`wa.me`, con un mensaje ya escrito). Los datos están en `contact` en `profile.ts`.

**Decisiones**
- Saqué el link "Proyectos" del header porque llevaba a algo oculto en la portada.
- Cambié el nombre de "Dual View" a "Split View". "Dual" era de cuando tenía dos áreas, y además ahora coincide con mi layout, `SplitLayout`.

**El testeo**
- Le mostré el portfolio publicado a 3 personas sin explicarles nada.
- Nadie sabía dónde tocar, no se daban cuenta de que el toggle abría los trabajos.
- Parecía un CV: se leían "Sobre mí", "Experiencia" y números, y casi no se veían mis trabajos.
- Me di cuenta de que el portfolio es para marcas y emprendimientos, y mucha gente no sabe qué es "UGC", "frontend" o "engagement". Tenía que hablar como ellos.

**Qué cambié**
- Textos simples. El toggle ahora dice Redes sociales · Diseño · Programación (antes Content · Design · Code) y cada área tiene un botón "Ver mis videos →", "Ver mis diseños →" o "Ver mis páginas web →". Esos botones usan `data-go`, que "clickea" el radio del toggle, así que no hay otro estado.
- Menos CV. Saqué Experiencia y las tarjetas con números, y reescribí "Sobre mí" en primera persona.
- Saqué la barra de navegación, porque competía con el toggle. Para volver a la portada ahora se toca mi nombre grande.
- Hice un hero nuevo mirando una referencia (`referencias/image.png`): "PORTFOLIO" gigante, tarjetas como de vidrio a los costados y un dock de herramientas. Puse un abanico con tres trabajos, y las tres áreas son botones en la tarjeta de la derecha. La lista de áreas está en `profile.ts` (`areas`), así el hero y `SplitLayout` usan la misma.
- Cambié la tipografía de los títulos por Bricolage Grotesque, que tiene más onda que Inter. La agregué como token (`--font-display`).
- Cambié el salmón por verde agua. Como son tokens, alcanzó con cambiar `accent`, `accent-soft` y `accent-ink`. El verde agua va solo de fondo; para texto uso un verde petróleo porque tiene más contraste.
- Muestro menos y lo elijo yo. En Redes sociales dejé 4 videos, en Diseño 2 por categoría y en Programación 3 sitios con el widget de GitHub abajo. A los videos sin portada les saqué una captura del primer cuadro.
- Escondí la barra del toggle porque ya había otras formas de elegir área. No la borré: sus radios son los que guardan la vista.
- Cada área cambia cómo se ve la página, solo con CSS y el mismo `data-view`. Redes sociales tiene un fondo más vivo y aros como las historias, Diseño una grilla tipo Figma y Programación un fondo de puntitos y títulos en mono.
- El hero "se abre" al scrollear con `animation-timeline: scroll()`. Está adentro de `@supports`, así en Firefox (que no lo soporta) se ve quieto pero no se rompe.

**Responsive**
- Revisé todo en tablet y mobile. 
- En el celu el toggle no muestra los corchetes ni las flechas, porque con las palabras nuevas no entraba.
- Cambié el favicon por la estrella del hero. Es un SVG con `@media (prefers-color-scheme: dark)` adentro, así en modo oscuro se pone verde agua.


---

### Día 6 — 19/11

- La palabra PORTFOLIO del hero era blanca y casi no se veía sobre el fondo verde agua. La pasé a verde petróleo (`accent-ink`) y le saqué la sombra, que ya no hacía falta.
- Armé la portada A4 del documento de entrega con la misma estética que la home. Al pasarla a PDF las sombras salían como manchas grises, así que las cambié por bordes finos.

---

### Uso de IA

Usé dos herramientas, cada una para algo distinto:
- Google Stitch, para armar una maqueta visual de referencia de la portada en tres columnas. Use su codigo como referencia, la tomé como guía y la rehice con mis componentes y mis tokens.
- Claude Code (dentro de VS Code), como asistente mientras programaba.

**Para qué usé Claude Code**
- Ayudarme a programar con Astro, ya que nunca lo habia utilizado.
- Resolver dudas y que me explicara partes del código, por ejemplo cómo funcionan las container queries o la API de GitHub.
- Encontrar por qué pasaban algunos errores, como el `@container` que quedaba en 0px.
- Ayudarme con las partes más difíciles, como el widget de GitHub, el estado `all` de la portada y la animación del toggle.
- Ordenar y redactar la bitácora y el README a partir de lo que yo iba haciendo y decidiendo.

**Cómo trabajé con ella**
- En `CLAUDE.md` le dejé reglas: explicarme en español qué iba a cambiar antes de editar, hacer cambios chicos, comentar el código en español, no sumar frameworks ni dependencias sin preguntarme y usar solo mis colores.
- Le pedí que escribiera el README de a una sección y revisé cada parte antes de hacer cada commit.
- Hice commits chicos para poder revisar cada cambio por separado.

**Qué decidí yo**
- El concepto: una pantalla dividida que se lee desde Content, Design o Code.
- Las versiones de la portada que probé y descarté, y la maqueta de referencia que armé con Google Stitch.
- Sumar la columna Design y cambiar el nombre de "Dual View" a "Split View".
- Que el toggle tenía que entenderse mejor, y cuáles de las propuestas hacer.

**Qué revisé, cambié o descarté**
- Cada vez que escribia en el Readme, me ocupaba de revisarlo y cambiarlo.
- Cada cambio que hacia se revisaba y chequeaba.


**Problemas y límites que encontré**
- La IA no sabe lo que no le cuento. A veces escribía cosas que no podía saber, como la configuración del deploy. Por eso revisé todo antes de cada commit.
- Hubo errores que la IA no vio, como que los proyectos de Design desaparecían. Me di cuenta yo mirando el sitio y después buscamos juntas la causa.
- La IA no puede probar todo por mí. Las pruebas en el celular las hice yo.
