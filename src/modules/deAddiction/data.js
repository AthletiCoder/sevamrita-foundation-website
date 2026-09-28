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
  lead: "Our goal is liberation.",
  quote:
    'We want young minds to rediscover joy beyond screens, cigarettes, and alcohol. Through creativity, community, and conscious living, we aim to awaken self-control and pride in a clear, addiction-free life.',
  stats: [
    {
      value: '9%',
      title: 'Young Lungs. Old Habits.',
      line: 'of adolescents aged 13–17 have tried smoking or vaping',
      icon: 'fas fa-smoking',
      image: {
        src: '/images/landing-carousel/smoking.jpeg',
        alt: 'Smoking awareness',
      },
    },
    {
      value: '20%',
      title: 'Youth Lost in the Bottle',
      line: 'of urban teens have had alcohol before turning 18',
      icon: 'fas fa-wine-bottle',
      image: {
        src: '/images/landing-carousel/drinking.jpeg',
        alt: 'Alcohol awareness',
      },
    },
    {
      value: '6.5 hrs',
      title: 'Life Shrunk Behind the Screen',
      line: 'a day — average screen time for students in India',
      icon: 'fas fa-mobile-alt',
      image: {
        src: '/images/landing-carousel/high_screen_time.jpg',
        alt: 'Screen time awareness',
      },
    },
    {
      value: '60%',
      title: 'Can not Live Without the Phone',
      line: 'of school students feel anxious without their phones',
      icon: 'fas fa-heartbeat',
      image: {
        src: '/images/landing-carousel/phone_addiction.jpg',
        alt: 'Phone anxiety awareness',
      },
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
        'Reach needy communities through essential supplies.',
        'Connect, educate and spread de-addiction awareness.',
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
        'Conduct moral education and career-building seminars.',
        'Inspire young minds through awareness and guidance.',
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
    'Our corporate wing of De-addiction awareness — we conduct campus De-addiction awareness sessions in this format.',
  image: {
    src: '/images/landing-carousel/04.webp',
    alt: 'Campus de-addiction awareness session in progress',
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
      label: 'Become a part of the movement',
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
