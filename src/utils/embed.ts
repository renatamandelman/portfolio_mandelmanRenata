/**
 * embed.ts — Arma la URL del reproductor oficial de TikTok o Instagram.
 * La usan ProjectCard (videos del modal) e index (video del celular del hero).
 */
import type { Video } from '../data/profile';

export function embedUrl(video: Video, autoplay = false) {
  if (video.platform === 'tiktok') {
    // description=0 y music_info=0 ocultan el texto y la música debajo del video
    return `https://www.tiktok.com/player/v1/${video.src}?description=0&music_info=0${autoplay ? '&autoplay=1' : ''}`;
  }
  return `https://www.instagram.com/reel/${video.src}/embed`;
}
