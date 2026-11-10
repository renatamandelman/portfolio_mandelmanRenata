# Renata Mandelman — Portfolio "Dual View"

Portfolio personal e interactivo para el Examen Final de **Programación Multimedial IV**.
Una pantalla dividida entre **Creación de Contenido / RRSS** y **Desarrollo Web**: quien visita elige el modo de lectura con el toggle `[ CONTENT ⇄ CODE ]`.

🔗 **Deploy:** _pendiente_ · 📁 **Bitácora:** [`docs/proceso.md`](docs/proceso.md)

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
├── docs/proceso.md         # Bitácora de proceso
├── public/                 # Archivos estáticos (favicon, imágenes, videos)
└── src/
    ├── components/         # Componentes propios (ViewToggle, ProjectCard, DynamicApiWidget)
    ├── data/profile.ts     # Datos del CV (experiencias, stack)
    ├── layouts/            # BaseLayout (head/SEO) y SplitLayout (vista dual)
    ├── pages/index.astro   # Página principal
    └── styles/global.css   # Design tokens y estilos base
```

## Componentes propios

| Componente | Responsabilidad | Estado |
| --- | --- | --- |
| `ViewToggle.astro` | Define el modo de lectura (`content` / `split` / `code`), lo guarda y lo anuncia a lectores de pantalla. | ✅ |
| `ProjectCard.astro` | Ficha bento que abre un "Case Study" con métricas, media y stack. | ⏳ |
| `DynamicApiWidget.astro` | Repos de GitHub en vivo con estados loading / success / error. | ⏳ |

## Tecnologías y decisiones

_Completar al cierre (ver bitácora)._

## API / fuente dinámica

_Completar en Días 7-8._

## Responsive y accesibilidad

_Completar en Días 9-10._

## Limitaciones y mejoras

_Completar._

## Créditos y uso de IA

- Tipografías: Inter y JetBrains Mono (SIL Open Font License), vía Fontsource.
- Uso de IA: ver sección al final de `docs/proceso.md`.
# portfolio_mandelmanRenata
