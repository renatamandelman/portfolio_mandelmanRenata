/**
 * profile.ts — Fuente de datos del portfolio (datos del CV).
 * Separar datos de componentes permite agregar o editar experiencias
 * sin tocar el markup (y es un cambio típico para la modificación en vivo).
 */

export type Side = 'content' | 'code';

/**
 * Un video del portfolio UGC.
 *   - local     → src es la ruta del .mp4 en /public (y poster la imagen de portada)
 *   - tiktok    → src es el id del video (el número largo de la URL)
 *   - instagram → src es el código del reel (lo que va después de /reel/)
 */
export interface Video {
  brand: string;
  title: string;
  platform: 'local' | 'tiktok' | 'instagram';
  src: string;
  poster?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  side: Side;
  tasks: string[];
  stack: string[];
  videos?: Video[]; // opcional: solo las experiencias que tienen videos
}

export const profile = {
  name: 'Renata Mandelman',
  location: 'CABA, Buenos Aires, Argentina',
  tagline: 'Diseñadora multimedial & desarrolladora web',
  github: 'renatamandelman', // lo usa también DynamicApiWidget para la API de GitHub
  heroVideo: '7612772716013243656', // id del video del celular del hero (tiene que estar en algún videos[])
  // Texto de la sección "Sobre mí" (tomado del CV). Cada string es un párrafo.
  about: [
    'Diseñadora multimedial con formación en tecnología, diseño visual y comunicación digital. Experiencia en creación de contenido para redes sociales, desarrollo web front-end y diseño gráfico para marcas.',
    'Manejo avanzado de Adobe Creative Suite, Figma y herramientas de edición de video, así como conocimientos en HTML, CSS, JavaScript y Node.js. Me adapto rápido a entornos dinámicos, con capacidad para trabajar tanto en equipo como de forma autónoma, siempre buscando aportar soluciones creativas y funcionales.',
  ],
};

/** Redes del footer: agregar o sacar una red es solo editar esta lista. */
export const socials = [
  { label: 'GitHub', href: `https://github.com/${profile.github}` },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/renata-mandelman' },
  { label: 'Behance', href: 'https://www.behance.net/renatamandelman' },
];

/** Proyectos web del lado code: cada uno es un link al sitio publicado. */
export interface Project {
  title: string;
  type: string;
  url: string;
  image?: string; // opcional: portada en /public (si no hay, se ve un degradé)
}

export const projects: Project[] = [
  { title: 'Mentes Brillantes', type: 'Landing page', url: 'https://www.mentesbrillantes.com.ar/' },
  { title: 'Estudio de diseño', type: 'Trabajo práctico', url: 'https://prog3-tp4-ecommerce.vercel.app/' },
];

/**
 * Trabajos del modo Design. `category` agrupa las tarjetas en el panel;
 * una categoría sin trabajos no se muestra.
 * `featured`: el trabajo que se muestra en la columna Design de la vista inicial
 * (si hay más de uno marcado, se usa el primero).
 */
export interface DesignWork extends Project {
  category: 'Gráfico' | 'UX/UI' | 'Motion';
  featured?: boolean;
}

// El orden de esta lista es el orden de las secciones en el panel Design
export const designCategories: DesignWork['category'][] = ['Gráfico', 'UX/UI', 'Motion'];

// Trabajos de Behance (behance.net/renatamandelman)
export const designWork: DesignWork[] = [
  {
    title: 'Loopies | Brand Identity',
    type: 'Identidad de marca · Behance',
    category: 'Gráfico',
    url: 'https://www.behance.net/gallery/219041233/Loopies-Brand-Identity',
    image: '/design/loopies-brand-identity.jpg',
    featured: true,
  },
  {
    title: 'Flyer Evento Artista',
    type: 'Pieza gráfica · Behance',
    category: 'Gráfico',
    url: 'https://www.behance.net/gallery/200724391/Flyer-Evento-Artista',
    image: '/design/flyer-evento-artista.jpg',
  },
  {
    title: 'Loopies',
    type: 'Diseño web · Behance',
    category: 'UX/UI',
    url: 'https://www.behance.net/gallery/216006653/Loopies-Disfruta-el-viaje-saborea-el-loop',
  },
  {
    title: 'Expo Desfiles',
    type: 'Landing page · Behance',
    category: 'UX/UI',
    url: 'https://www.behance.net/gallery/195508341/EXPO-DESFILES-Landing',
    image: '/design/expo-desfiles.jpg',
  },
  {
    title: 'LockIt',
    type: 'Prototipo mobile · Behance',
    category: 'UX/UI',
    url: 'https://www.behance.net/gallery/184633719/LockIt-Prototipo-Mobile',
    image: '/design/lockit.jpg',
  },
  {
    title: 'Discurso Falso',
    type: 'Video · Behance',
    category: 'Motion',
    url: 'https://www.behance.net/gallery/224491013/Discurso-Falso',
    image: '/design/discurso-falso.jpg',
  },
  {
    title: 'Un día conmigo',
    type: 'Vlog · Behance',
    category: 'Motion',
    url: 'https://www.behance.net/gallery/222505109/Un-dia-conmigo-Vlog',
    image: '/design/un-dia-conmigo.jpg',
  },
  {
    title: 'Animación Gimnasio',
    type: 'Animación · After Effects',
    category: 'Motion',
    url: 'https://www.behance.net/gallery/225289859/Animacion-Gimnasio',
    image: '/design/animacion-gimnasio.jpg',
  },
];

export const experiences: Experience[] = [
  {
    id: 'mentes-brillantes',
    company: 'Mentes Brillantes',
    role: 'Community Manager y Diseñadora Multimedial',
    period: '2026 — Presente',
    side: 'content',
    tasks: [
      'Gestión integral de redes sociales de la marca',
      'Diseño de piezas gráficas y edición de video',
      'Calendarización y planificación de publicaciones',
    ],
    stack: ['Adobe CC', 'CapCut', 'Figma'],
  },
  {
    id: 'cocinargcom',
    company: 'Cocinargcom',
    role: 'Community Manager y Creadora de Contenido',
    period: '2023 — Presente',
    side: 'content',
    tasks: [
      'Diseño y producción de piezas para Instagram y otras redes',
      'Edición de reels con enfoque en tendencias',
      'Coordinación con marcas y cocinas locales',
    ],
    stack: ['Instagram', 'CapCut', 'Canva'],
    videos: [
      { brand: 'Cocinarg', title: 'Recetas argentinas', platform: 'instagram', src: 'DXNBl4nh0HQ' },
      { brand: 'Cocinarg', title: 'Legumbres y más', platform: 'instagram', src: 'DXsDpdvEcET' },
      { brand: 'Muydinnette', title: 'Recetas y contenido', platform: 'instagram', src: 'DVHPz5akRxy' },
      { brand: 'Funga', title: 'Contenido de recetas', platform: 'instagram', src: 'DUoufEVEYMu' },
    ],
  },
  {
    id: 'gaia',
    company: 'Gaia Social Group',
    role: 'Diseñadora Multimedial',
    period: 'Sep 2025 — Presente',
    side: 'content',
    tasks: [
      'Creación de placas para redes sociales',
      'Administración de la base de datos de creadores UGC',
      'Coordinación con creadores seleccionados para acciones',
    ],
    stack: ['Figma', 'Adobe CC'],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Creadora de contenido UGC',
    period: 'Freelance', // ← completar con el período real (ej: '2024 — Presente')
    side: 'content',
    tasks: [
      'Videos UGC para marcas de skincare y maquillaje',
      'Contenido para marcas de hogar y deco',
    ],
    stack: ['CapCut', 'Premiere Pro', 'TikTok'],
    videos: [
      { brand: 'La Roche-Posay', title: 'Anthelios DermoPediátrico SPF50+', platform: 'tiktok', src: '7627963069204843796' },
      { brand: 'Vichy', title: 'Liftactiv Collagen Specialist 16', platform: 'tiktok', src: '7614635631154613522' },
      { brand: 'Vichy', title: 'Protector solar', platform: 'tiktok', src: '7612772716013243656', poster: '/videos/vichy-protector-solar.jpg' }, // ← video del hero (el poster es la portada del celular)
      { brand: 'CeraVe', title: 'Limpiador + Loción Humectante', platform: 'tiktok', src: '7611574593475693842' },
      { brand: 'Maybelline', title: 'Tattoo Liner 48H', platform: 'tiktok', src: '7530338466295516434' },
      { brand: 'Hogar & Deco', title: 'Antes y después con almohadones', platform: 'local', src: '/videos/hogar-antes-y-despues.mp4', poster: '/videos/hogar-antes-y-despues.jpg' },
      { brand: 'Hogar & Deco', title: 'Cubresillas', platform: 'local', src: '/videos/hogar-cubresillas.mp4', poster: '/videos/hogar-cubresillas.jpg' },
      { brand: 'Hogar & Deco', title: 'Tu almohadón según tu personalidad', platform: 'local', src: '/videos/hogar-almohadon-personalidad.mp4', poster: '/videos/hogar-almohadon-personalidad.jpg' },
      { brand: 'Hogar & Deco', title: 'Errores al decorar con almohadones', platform: 'local', src: '/videos/hogar-errores-almohadones.mp4', poster: '/videos/hogar-errores-almohadones.jpg' },
    ],
  },
  {
    id: 'softtek',
    company: 'Softtek',
    role: 'Pasantía en Desarrollo Digital',
    period: 'Oct 2022 — Dic 2022',
    side: 'code',
    tasks: [
      'Sitio institucional con Power Pages',
      'Chatbot y automatización con Power Automate',
      'Trabajo en equipo orientado a resolver problemas',
    ],
    stack: ['Power Pages', 'Power Automate', 'REST APIs'],
  },
  {
    id: 'keipana',
    company: 'Keipana Accesorios',
    role: 'Desarrollo web — proyecto personal',
    period: 'Proyecto',
    side: 'code',
    tasks: ['E-commerce con frontend en React/Next.js y API en Node + Express'],
    stack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB'],
  },
];

export const stack = {
  code: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Astro', 'Tailwind', 'Node.js', 'Express', 'Git'],
  content: ['Figma', 'Adobe CC', 'After Effects', 'CapCut', 'Canva'],
};

/**
 * Métricas del lado Content (tarjetas chicas del hero).
 * ⚠️ Los valores marcados como provisorios hay que reemplazarlos por números reales.
 */
export const contentStats = [
  { value: '3', label: 'Marcas' }, // Mentes Brillantes, Cocinargcom, Gaia
  { value: '2023', label: 'Desde' },
  { value: '+100', label: 'Reels' }, // ← provisorio
  { value: '+300', label: 'Piezas' }, // ← provisorio
];

/** Tarjeta de engagement: `bars` son alturas en % para el mini gráfico. */
export const engagement = {
  value: '4.2K', // ← provisorio
  delta: '+14%', // ← provisorio
  bars: [35, 60, 45, 95, 75],
};
