/**
 * Seva Smriti — Gifts of Service
 *
 * Images are auto-discovered from public/images/seva_smriti/<folder>/
 * via the generated smritiManifest.js (run scripts/generate-smriti-manifest.js).
 *
 * To add a gift:
 *  1. Create a folder under public/images/seva_smriti/
 *  2. Drop images inside it
 *  3. Re-run `node scripts/generate-smriti-manifest.js` (or restart pnpm start)
 *  4. Add a matching entry below
 */

import { SMRITI_MANIFEST } from './smritiManifest';

/** Returns images for a given seva_smriti folder. */
const gift = (folder) => SMRITI_MANIFEST[folder] ?? [];

export const SEVA_SMRITI_GIFTS = [
  {
    key: 'seedballs',
    name: 'Seed balls',
    icon: 'fas fa-leaf',
    description:
      'Compact spheres of soil, clay, and native seeds — toss them into open ground and watch nature do the rest. A gift that grows beyond the moment, nurturing the earth with every throw.',
    images: gift('seedballs'),
  },
  {
    key: 'cup_set',
    name: 'Handcrafted ceramic cup set',
    icon: 'fas fa-mug-hot',
    description:
      'This handcrafted ceramic cup, made with care by skilled artisans, brings a touch of warmth and artistry to every sip. Its simple elegance and thoughtful design make it a perfect keepsake that celebrates craftsmanship and meaningful giving.',
    images: gift('cup_set'),
  },
  {
    key: 'jewel_box',
    name: 'Handcrafted jewellery box',
    icon: 'fas fa-gem',
    description:
      'This handcrafted jewellery box, made with skill and attention to detail, offers a beautiful way to store your precious items. Its timeless design and quality craftsmanship make it a meaningful keepsake that reflects care and thoughtfulness.',
    images: gift('jewel_box'),
  },
  {
    key: 'gamla',
    name: 'Coco peat plant kit',
    icon: 'fas fa-seedling',
    description:
      'A complete, eco-friendly plant kit that allows you to grow your own plants with ease. Thoughtfully assembled with care, this kit brings a touch of nature into your home and reminds you of the beauty of growth and renewal.',
    images: gift('gamla'),
  },
  {
    key: 'multipurpose_box',
    name: 'Handcrafted multipurpose boxes',
    icon: 'fas fa-box-open',
    description:
      'These handcrafted multipurpose boxes, made with care by skilled artisans, offer a beautiful and practical way to store your essentials. Their thoughtful design and quality craftsmanship make them a meaningful keepsake that reflects warmth and attention to detail.',
    images: gift('multipurpose_box'),
  },
  {
    key: 'ceramics',
    name: 'Handcrafted metal jar',
    icon: 'fas fa-jar',
    description:
      'This handcrafted metal jar, made by skilled artisans, is a symbol of timeless artistry and dedication. It reflects the care and effort poured into its creation, making it a meaningful gift that honours tradition and craftsmanship.',
    images: gift('ceramics'),
  },
];

export const SEVA_SMRITI_HERO = {
  title: 'Seva Smriti',
  subtitle:
    'A heartfelt keepsake celebrating your seva, preserving the memories you created, the lives you touched, and the difference you made.',
};
