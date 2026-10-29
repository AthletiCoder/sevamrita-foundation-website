const SIZE_VARIANTS = ['sm', 'md', 'lg', 'md', 'tall', 'md'];

/**
 * Map gallery images to marquee slots with slight size variety.
 *
 * @param {{ src: string, alt: string, file?: string }[]} images
 * @returns {{ src: string, alt: string, file?: string, key: string, size: string }[]}
 */
export function buildHallSlots(images) {
  if (!images?.length) return [];

  return images.map((image, index) => ({
    ...image,
    key: image.src,
    size: SIZE_VARIANTS[index % SIZE_VARIANTS.length],
  }));
}
