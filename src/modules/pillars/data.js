/**
 * Six Pillars of Service — content and images for the What We Do page.
 * Titles: Sanskrit name + short English label (1–2 words).
 * Body copy, lists, stats, and images are preserved as source of truth.
 */

const IMG = (file) => `/images/6_pillar/${file}`;

export const PAGE = {
  brand: 'Sevamrita Foundation',
  intro: {
    title: 'Six Pillars of Service',
    subtitle:
      'Dedicated initiatives focusing on holistic development and support for the underprivileged.',
  },
  missionBreak: {
    title: 'Six Pillars of Service',
    subtitle:
      'Dedicated initiatives focusing on holistic development and support for the underprivileged.',
  },
};

export const PILLARS = [
  {
    id: 'shikshamrita',
    title: 'Shikshamrita',
    english: 'Education',
    description: [
      `The initiative undertaken by the NGO in underprivileged schools stands as a vital instrument of social upliftment, offering comprehensive support that extends well beyond conventional education. The programme delivers high-quality instruction within a structured, well-rounded curriculum, guided by dedicated educators committed to fostering both the intellectual and emotional development of each child.`,
      `In addressing fundamental needs, the schools provide regular mid-day meals, thereby ensuring that students receive adequate nutrition—an essential component for effective learning and overall well-being. Through Annamrita, our goal is to support these schools in mid-day meals as well.`,
    ],
    imgSrc: IMG('Shikshamrita.jpg'),
    alt: 'Shikshamrita',
  },
  {
    id: 'annamrita',
    title: 'Annamrita',
    english: 'Basic Needs',
    description: [
      `The NGO extends an unwavering commitment to supporting the poor and underprivileged residing in villages, slums, and economically disadvantaged areas. It provides essential aid to help meet their fundamental needs.`,
      `A key aspect of this support is the regular distribution of nutritious meals, and that every person is treated with dignity. In addition to food, the NGO occasionally distributes unused clothing to those in need, offering further relief and comfort.`,
      `Medical assistance, although not yet developed, is a key future focus area of the NGO’s mission. We support health camps and mobile clinics conducted by other NGOs, addressing both immediate medical concerns and long-term healthcare needs.`,
    ],
    imgSrc: IMG('Annamrita.jpg'),
    alt: 'Annamrita',
  },
  {
    id: 'charitamrita',
    title: 'Charitamrita',
    english: 'Youth',
    description: [`Our key focus areas are:`],
    listItems: [
      'Skill development',
      'Personality development training',
      'Internships',
      'Mental wellness',
      'De-addiction',
      'Camps and outings',
      'Support system via food and lodging',
    ],
    descriptionEnd: `A holistic approach to youth empowerment adopted by the NGO addresses not only the immediate challenges faced by young individuals but also promotes their long-term growth and prosperity. By nurturing talent, creating meaningful opportunities, and fostering a supportive and inclusive community, the foundation plays a vital role in transforming the lives of youth in India and guiding them towards a more promising and sustainable future.`,
    imgSrc: IMG('Charitamrita.jpg'),
    alt: 'Charitamrita',
  },
  {
    id: 'dharamrita',
    title: 'Dharamrita',
    english: 'Environment',
    description: [
      `Sevamrita Foundation is deeply committed to the protection and preservation of the environment through a range of proactive and sustainable initiatives. Our environmental programs promote ecological responsibility, enhance the natural beauty of our surroundings, and encourage community participation.`,
      `A central component of our efforts is our tree plantation drives, which are conducted in both urban and rural settings. These initiatives aim to combat deforestation, improve air quality, and create green, breathable spaces that benefit local communities.`,
      `In our commitment to reducing plastic pollution, we actively promote the use of biodegradable plates and metal utensils. By replacing conventional plastic products with eco-friendly alternatives, we seek to minimize the adverse environmental impact of single-use plastics.`,
    ],
    imgSrc: IMG('Dharmamrita.jpg'),
    alt: 'Dharamrita',
  },
  {
    id: 'gramamrita',
    title: 'Gramamrita',
    english: 'Rural Care',
    description: [
      `Gramamrita focuses on empowering rural and tribal communities through education, essential support, and sustained community engagement. We work alongside schools and local groups in underserved areas to expand learning opportunities and strengthen everyday wellbeing.`,
    ],
    listItems: [
      '90+ rural students reached through school support',
      '50+ schools reached through major education initiatives',
    ],
    descriptionEnd:
      'Key activities: Educational support, essential-item distribution, and community engagement in rural and underserved areas.',
    imgSrc: IMG('TribalCare.jpg'),
    alt: 'Gramamrita — rural and tribal empowerment',
  },
  {
    id: 'arogyamrita',
    title: 'Arogyamrita',
    english: 'Health',
    description: [
      `Arogyamrita promotes community health through yoga, hygiene awareness, and everyday wellbeing practices. Through programmes like International Yoga Day, we introduce participants to yoga and pranayama while supporting safe hydration with reusable steel water bottles.`,
    ],
    listItems: [
      '20+ participants in International Yoga Day programme',
      '35 reusable steel water bottles distributed',
    ],
    descriptionEnd:
      'Key activities: Yoga, pranayama, community wellness, hydration support, and wellbeing awareness.',
    imgSrc: IMG('Arogyamrita.jpg'),
    alt: 'Arogyamrita — community yoga and wellness',
  },
];

/** First half of the journey (before MissionBreak). */
export const PILLARS_ACT_ONE = PILLARS.slice(0, 3);

/** Second half of the journey (after MissionBreak). */
export const PILLARS_ACT_TWO = PILLARS.slice(3);
