/**
 * De-addiction awareness campaign — static content for /de-addiction.
 */

export const CAMPAIGN_ROUTE = '/de-addiction';

export const HERO = {
  brand: 'Sevamrita',
  title: 'Freedom Begins from Within',
  tagline: 'A Pledge for Clarity — A Pledge for Life',
  subtitle: 'A Sevamrita Initiative for De-addiction Awareness',
  image: {
    src: '/images/Sevamrita_Deaddiction_heroimg.webp',
    alt: 'Young person reclaiming clarity — contrast between distraction and a purposeful life',
    width: 1600,
    height: 1067,
  },
  ctaPrimary: {
    label: 'Take the De-addiction Pledge',
    href: '#pledge',
  },
  ctaSecondary: {
    label: 'Explore the campaign',
    href: '#the-need',
  },
};

export const THE_NEED = {
  id: 'the-need',
  title: 'The Need',
  lead: "Our goal isn prohibition — it's liberation.",
  quote:
    'We want young minds to rediscover joy beyond screens, cigarettes, and alcohol. Through creativity, community, and conscious living, we aim to awaken self-control and pride in a clear, addiction-free life.',
  stats: [
    {
      value: '9%',
      label: 'Indian adolescents (ages 13–17) have tried smoking or vaping.',
      icon: 'fas fa-smoking',
    },
    {
      value: '20%',
      label: 'Teens in urban India have been exposed to alcohol before age 18.',
      icon: 'fas fa-wine-bottle',
    },
    {
      value: '6.5 hrs/day',
      label: 'Average screen time among students in India.',
      icon: 'fas fa-mobile-alt',
    },
    {
      value: '60%',
      label:
        'School students report anxiety or restlessness when away from their phones for a few hours.',
      icon: 'fas fa-heartbeat',
    },
  ],
  sourcesNote:
    'Sources as cited in the Sevamrita De-addiction Awareness campaign report.',
};

export const MISSION = {
  id: 'mission',
  headline: 'ONE Mission = Freedom Through Awareness',
  subtitle:
    'Reaching vulnerable communities with awareness, education and meaningful support.',
  pillars: [
    {
      title: '1 Cr+ Pledges',
      body: [
        'Inspire 1 crore+ individuals to take a pledge for an addiction-free life.',
        'Turn awareness into a personal commitment to clarity and self-control.',
      ],
      icon: 'fas fa-handshake',
      image: {
        src: '/images/landing-carousel/02.webp',
        alt: 'Community members taking a de-addiction pledge',
      },
    },
    {
      title: 'Reaching Those in Need',
      body: [
        'Reach needy and impoverished communities through distribution of essential supplies.',
        'Use these interactions as an opportunity to connect, educate and spread de-addiction awareness.',
      ],
      icon: 'fas fa-hand-holding-heart',
      image: {
        src: '/images/food-drive-3.jpg',
        alt: 'Volunteers distributing essential supplies',
      },
    },
    {
      title: 'Schools & Colleges',
      body: [
        'Conduct moral education and career-building seminars in schools and colleges.',
        'Reach young minds with awareness, guidance and positive alternatives.',
      ],
      icon: 'fas fa-graduation-cap',
      image: {
        src: '/images/Sevamrita_Education_heroimg.webp',
        alt: 'Students participating in an awareness seminar',
      },
    },
  ],
};

export const APPROACH = {
  id: 'approach',
  title: 'Our Approach',
  lead: 'Awareness through experience',
  items: [
    {
      title: 'Interactive Workshops',
      body: [
        'Engage students through meaningful conversations.',
        'Run awareness activities that build clarity and self-control.',
      ],
      icon: 'fas fa-chalkboard-teacher',
      image: {
        src: '/images/landing-carousel/03.webp',
        alt: 'Students and volunteers in a workshop setting',
      },
    },
    {
      title: 'Public Pledges',
      body: [
        'Turn awareness into a personal commitment.',
        'Invite communities to stand together for an addiction-free life.',
      ],
      icon: 'fas fa-file-signature',
      image: {
        src: '/images/landing-carousel/05.webp',
        alt: 'Community gathering for a public commitment',
      },
    },
    {
      title: 'De-Addiction Kit',
      body: [
        'Distribution of thoughtfully prepared essentials.',
        'Creating meaningful opportunities for awareness and connection.',
      ],
      icon: 'fas fa-box-open',
      image: {
        src: '/images/landing-carousel/07.webp',
        alt: 'De-addiction kit distribution and awareness connection',
      },
    },
  ],
};

export const AWARENESS_TO_ACTION = {
  id: 'awareness-to-action',
  title: 'From Awareness to Action',
  subtitle:
    'Our corporate wing of De-addiction Awareness — we conduct campus DEAAC in this format.',
  image: {
    src: '/images/landing-carousel/04.webp',
    alt: 'Campus DEAAC awareness session in progress',
    width: 800,
    height: 1000,
  },
  steps: [
    {
      label: 'Learn about the cause',
      icon: 'fas fa-book-open',
    },
    {
      label: 'Create an artwork/message',
      icon: 'fas fa-palette',
    },
    {
      label: 'Inspire others to take the pledge',
      icon: 'fas fa-comments',
    },
    {
      label: 'Take the De-addiction Pledge',
      icon: 'fas fa-hand-holding-heart',
    },
    {
      label: 'Become part of the movement',
      icon: 'fas fa-users',
    },
  ],
};

export const CALL_TO_ACTION = {
  id: 'pledge',
  title: 'Freedom Begins from Within',
  tagline: 'A Pledge for Clarity — A Pledge for Life',
  primary: {
    label: 'Take the De-addiction Pledge',
    href: '/contact',
  },
  secondary: {
    label: 'Bring De-addiction Awareness to Your School / Community',
    href: '/contact',
  },
};

export const CAMPAIGN_FOOTER = {
  brand: 'Sevamrita',
  initiative: 'De-addiction Awareness Initiative',
  tagline: 'Freedom Begins from Within',
  website: {
    label: 'sevamrita.org',
    href: '/',
  },
};
