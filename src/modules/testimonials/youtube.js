/**
 * YouTube link helpers for the testimonials filmstrip.
 * Accepts watch, youtu.be, shorts, and embed URLs.
 */

export function youtubeVideoId(url) {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      return parsed.pathname.split('/').filter(Boolean)[0] || '';
    }

    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const fromQuery = parsed.searchParams.get('v');
      if (fromQuery) return fromQuery;

      const parts = parsed.pathname.split('/').filter(Boolean);
      const marker = parts.findIndex((part) => part === 'embed' || part === 'shorts');
      if (marker >= 0 && parts[marker + 1]) return parts[marker + 1];
    }
  } catch {
    return '';
  }

  return '';
}

export function youtubeThumbnailUrl(url) {
  const id = youtubeVideoId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}

export function youtubeEmbedUrl(url) {
  const id = youtubeVideoId(url);
  if (!id) return '';

  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
  });

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}
