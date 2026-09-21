/**
 * Events page — photo gallery + social presence.
 *
 * Gallery: drop files as 1.jpeg, 2.jpeg, … under
 * public/images/gallery/<Folder>/ and set `count` below.
 *
 * Social posts: add platform, title, href, and embed src (or tweet fields).
 * Posts rotate every SOCIAL_ROTATE_MS.
 */

/** Build numbered gallery images: 1.jpeg … count.jpeg */
const gallery = (folder, count) =>
  Array.from({ length: count }, (_, i) => ({
    src: `/images/gallery/${folder}/${i + 1}.jpeg`,
    alt: `${folder} event photo ${i + 1}`,
  }));

export const GALLERY_SECTIONS = [
  {
    key: 'shikshamrita',
    title: 'Shikshamrita',
    icon: 'fas fa-graduation-cap',
    description: 'Education support in underprivileged schools.',
    images: gallery('Shikshamrita', 13),
  },
  {
    key: 'annamrita',
    title: 'Annamrita',
    icon: 'fas fa-utensils',
    description: 'Nourishing communities through food drives and meal support.',
    images: gallery('Annamrita', 8),
  },
  {
    key: 'charitamrita',
    title: 'Charitamrita',
    icon: 'fas fa-hands-helping',
    description: 'Youth empowerment, skills, and character-building programs.',
    images: gallery('Charitamrita', 7),
  },
  {
    key: 'dharamrita',
    title: 'Dharamrita',
    icon: 'fas fa-leaf',
    description: 'Environment protection through plantation and eco-friendly practices.',
    images: gallery('Dharamrita', 10),
  },
  {
    key: 'gramamrita',
    title: 'Gramamrita',
    icon: 'fas fa-home',
    description: 'Rural and tribal empowerment through education and community support.',
    images: gallery('Gramamrita', 16),
  },
  {
    key: 'arogyamrita',
    title: 'Arogyamrita',
    icon: 'fas fa-heartbeat',
    description: 'Healthcare, hygiene, and community wellbeing.',
    images: gallery('Arogyamrita', 6),
  },
];

/**
 * Social embed list — edit this to add/remove posts.
 *
 * Required:
 *   platform, title, href
 * Plus either:
 *   src (+ optional width/height) for iframe embeds
 *   type: 'tweet' for X
 *   type: 'instagram' for Instagram (uses href as permalink)
 */
export const SOCIAL_POSTS = [
  // —— LinkedIn ——
  {
    id: 'li-1',
    platform: 'linkedin',
    title: 'LinkedIn update',
    href: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7506647461369786368',
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7506647461369786368?collapsed=1',
    width: 504,
    height: 842,
  },
  {
    id: 'li-2',
    platform: 'linkedin',
    title: 'LinkedIn update',
    href: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7504466944968937473',
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7504466944968937473?collapsed=1',
    width: 504,
    height: 876,
  },
  {
    id: 'li-3',
    platform: 'linkedin',
    title: 'LinkedIn update',
    href: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7503118947307679744',
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7503118947307679744?collapsed=1',
    width: 504,
    height: 876,
  },
  {
    id: 'li-4',
    platform: 'linkedin',
    title: 'LinkedIn update',
    href: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7500906342438862848',
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7500906342438862848?collapsed=1',
    width: 504,
    height: 876,
  },
  {
    id: 'li-5',
    platform: 'linkedin',
    title: 'LinkedIn update',
    href: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7495365569660067840',
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7495365569660067840?collapsed=1',
    width: 504,
    height: 876,
  },

  // —— X ——
  {
    id: 'x-1',
    platform: 'x',
    type: 'tweet',
    title: '"It Made a Difference" | A Teacher Shares Her Experience with Sevamrita Foundation',
    href: 'https://x.com/sevamrita/status/2087896369273167980',
    text: '"It Made a Difference" | A Teacher Shares Her Experience with Sevamrita Foundation At Primary School, Lakhanawadi',
    author: 'Sevamrita Foundation',
    handle: '@sevamrita',
    date: 'August 13, 2026',
  },
  {
    id: 'x-2',
    platform: 'x',
    type: 'tweet',
    title: 'A quick summary of our activities at Primary school, Lakhanwadi',
    href: 'https://x.com/sevamrita/status/2087892848502865992',
    text: 'A quick summary of our activities at Primary school, Lakhanwadi',
    author: 'Sevamrita Foundation',
    handle: '@sevamrita',
    date: 'August 13, 2026',
  },
  {
    id: 'x-3',
    platform: 'x',
    type: 'tweet',
    title: 'Glimpses of Sevamrita at Lakhanwadi primary school',
    href: 'https://x.com/sevamrita/status/2086026309298201026',
    text: 'Glimpses of Sevamrita at Lakhanwadi primary school',
    author: 'Sevamrita Foundation',
    handle: '@sevamrita',
    date: 'August 8, 2026',
  },

  // —— YouTube ——
  {
    id: 'yt-1',
    platform: 'youtube',
    title: 'Sevamrita YouTube video',
    href: 'https://www.youtube.com/watch?v=hex3ivUmxpo',
    src: 'https://www.youtube.com/embed/hex3ivUmxpo?si=JYVkT_rLnP4OrFRT',
    width: 560,
    height: 315,
  },
  {
    id: 'yt-2',
    platform: 'youtube',
    title: 'Sevamrita YouTube video',
    href: 'https://www.youtube.com/watch?v=qwEbVfeMhBo',
    src: 'https://www.youtube.com/embed/qwEbVfeMhBo?si=U9o3vVJ573qvcUlI',
    width: 560,
    height: 315,
  },
  {
    id: 'yt-3',
    platform: 'youtube',
    title: 'Sevamrita YouTube video',
    href: 'https://www.youtube.com/watch?v=vGmA2qOESfg',
    src: 'https://www.youtube.com/embed/vGmA2qOESfg?si=W-rC5Xxq7reJZzuG',
    width: 560,
    height: 315,
  },
  {
    id: 'yt-4',
    platform: 'youtube',
    title: 'Sevamrita YouTube video',
    href: 'https://www.youtube.com/watch?v=cveIX8eXf7s',
    src: 'https://www.youtube.com/embed/cveIX8eXf7s?si=soolXrMZx1FsseDb',
    width: 560,
    height: 315,
  },
  {
    id: 'yt-5',
    platform: 'youtube',
    title: 'Sevamrita YouTube video',
    href: 'https://www.youtube.com/watch?v=3DqfAN79W2M',
    src: 'https://www.youtube.com/embed/3DqfAN79W2M?si=qEfjptqIoqJJ7NYO',
    width: 560,
    height: 315,
  },

  // —— Facebook ——
  {
    id: 'fb-1',
    platform: 'facebook',
    title: 'Sevamrita Facebook reel',
    href: 'https://www.facebook.com/reel/1463814162468718/',
    src: 'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1463814162468718%2F&show_text=true&width=267&t=0',
    width: 267,
    height: 591,
  },
  {
    id: 'fb-2',
    platform: 'facebook',
    title: 'Sevamrita Facebook reel',
    href: 'https://www.facebook.com/reel/1080866221023939/',
    src: 'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1080866221023939%2F&show_text=true&width=267&t=0',
    width: 267,
    height: 591,
  },
  {
    id: 'fb-3',
    platform: 'facebook',
    title: 'Sevamrita Facebook reel',
    href: 'https://www.facebook.com/reel/1011193915306083/',
    src: 'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1011193915306083%2F&show_text=true&width=267&t=0',
    width: 267,
    height: 591,
  },
  {
    id: 'fb-4',
    platform: 'facebook',
    title: 'Sevamrita Facebook post',
    href: 'https://www.facebook.com/permalink.php?story_fbid=pfbid0smvg4ZPWqSUfdFPF5EoyqmdXvMSx62EHpkrrtkxK3NHQr2nVCMDvgn2Le1brvJUYl&id=61566335922155',
    src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0smvg4ZPWqSUfdFPF5EoyqmdXvMSx62EHpkrrtkxK3NHQr2nVCMDvgn2Le1brvJUYl%26id%3D61566335922155&show_text=true&width=500',
    width: 500,
    height: 664,
  },
  {
    id: 'fb-5',
    platform: 'facebook',
    title: 'Sevamrita Facebook post',
    href: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02adZrA3dNbcfrjsXobZFek1BNqzw1HCe3FygWBwDYyh9kDsahwKWjG8NRXkSpCjEnl&id=61566335922155',
    src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02adZrA3dNbcfrjsXobZFek1BNqzw1HCe3FygWBwDYyh9kDsahwKWjG8NRXkSpCjEnl%26id%3D61566335922155&show_text=true&width=500',
    width: 500,
    height: 250,
  },

  // —— Instagram ——
  {
    id: 'ig-1',
    platform: 'instagram',
    type: 'instagram',
    title: 'Instagram reel — @sevamritafoundation',
    href: 'https://www.instagram.com/reel/DdbHtIlDZqm/',
  },
  {
    id: 'ig-2',
    platform: 'instagram',
    type: 'instagram',
    title: 'Instagram reel — @sevamritafoundation',
    href: 'https://www.instagram.com/reel/DdB6JHxkU3A/',
  },
  {
    id: 'ig-3',
    platform: 'instagram',
    type: 'instagram',
    title: 'Instagram post — @sevamritafoundation',
    href: 'https://www.instagram.com/p/Dc--w0FiIrH/',
  },
  {
    id: 'ig-4',
    platform: 'instagram',
    type: 'instagram',
    title: 'Instagram post — @sevamritafoundation',
    href: 'https://www.instagram.com/p/DcQQg2diKrz/',
  },
  {
    id: 'ig-5',
    platform: 'instagram',
    type: 'instagram',
    title: 'Instagram reel — @sevamritafoundation',
    href: 'https://www.instagram.com/reel/Db73OaWOthm/',
  },
];

export const PLATFORM_META = {
  facebook: { label: 'Facebook', icon: 'fab fa-facebook-f', color: '#1877F2' },
  youtube: { label: 'YouTube', icon: 'fab fa-youtube', color: '#FF0000' },
  x: { label: 'X', icon: 'fab fa-x-twitter', color: '#000000' },
  linkedin: { label: 'LinkedIn', icon: 'fab fa-linkedin-in', color: '#0A66C2' },
  instagram: { label: 'Instagram', icon: 'fab fa-instagram', color: '#E4405F' },
};

/** How long each social post stays before switching platform (ms). */
export const SOCIAL_ROTATE_MS = 8000;

/**
 * Newspaper / press coverage filmstrip.
 * Drop files in public/images/innews/ then list filenames here.
 */
const inNews = (files) =>
  files.map((file, index) => ({
    id: `innews-${index + 1}`,
    src: `/images/innews/${encodeURIComponent(file)}`,
    alt: 'Newspaper coverage of Sevamrita Foundation activities',
  }));

export const IN_NEWS_IMAGES = inNews([
  // 'example-clip.jpg',
'news1.jpeg',
'news2.jpeg',
'news3.jpeg',
'news4.jpeg'
]);
