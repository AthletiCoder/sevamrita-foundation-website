import {
  GALLERY_SECTIONS,
  SOCIAL_POSTS,
  PLATFORM_META,
  SOCIAL_ROTATE_MS,
  IN_NEWS_IMAGES,
} from './data';

export {
  GALLERY_SECTIONS,
  SOCIAL_POSTS,
  PLATFORM_META,
  SOCIAL_ROTATE_MS,
  IN_NEWS_IMAGES,
};

/** Group social posts by platform, preserving list order. */
export function groupPostsByPlatform(posts = SOCIAL_POSTS) {
  const order = [];
  const map = new Map();

  posts.forEach((post) => {
    const key = post.platform;
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key).push(post);
  });

  return order.map((platform) => ({
    platform,
    meta: PLATFORM_META[platform] || {
      label: platform,
      icon: 'fas fa-share-alt',
      color: 'var(--color-primary)',
    },
    posts: map.get(platform),
  }));
}

/**
 * Round-robin playlist: consecutive items always come from different platforms.
 * Within each platform, posts advance in list order. Shorter platforms are skipped
 * once exhausted until the next full loop.
 */
export function buildCrossPlatformPlaylist(groups = groupPostsByPlatform()) {
  if (!groups.length) return [];

  const maxLen = Math.max(...groups.map((g) => g.posts.length));
  const playlist = [];

  for (let round = 0; round < maxLen; round += 1) {
    groups.forEach((group) => {
      if (round < group.posts.length) {
        playlist.push({
          post: group.posts[round],
          platform: group.platform,
          meta: group.meta,
        });
      }
    });
  }

  return playlist;
}
