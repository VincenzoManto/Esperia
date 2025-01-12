export const typesIcons = {
  food: 'https://cdn3d.iconscout.com/3d/premium/thumb/groceries-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bag-package-food-container-online-shopping-pack-e-commerce-icons-4936475.png?f=webp',
  fashion:
    'https://cdn3d.iconscout.com/3d/premium/thumb/fashion-3d-icon-download-in-png-blend-fbx-gltf-file-formats--cloth-hanger-clothes-clothing-t-shirt-store-pack-e-commerce-shopping-icons-5600842.png?f=webp',
  tech: 'https://cdn3d.iconscout.com/3d/premium/thumb/laptop-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--notebook-computer-office-electronic-appliance-objects-pack-user-interface-illustrations-3202848.png?f=webp',
  games:
    'https://cdn3d.iconscout.com/3d/premium/thumb/game-console-3d-icon-download-in-png-blend-fbx-gltf-file-formats--controller-gamepad-joystick-video-media-entertainment-pack-multimedia-icons-4756473.png',
  love: 'https://cdn3d.iconscout.com/3d/premium/thumb/love-heart-3d-icon-download-in-png-blend-fbx-gltf-file-formats--valentine-romance-romantic-miscellaneous-pack-icons-5701568.png?f=webp',
  xmas: 'https://cdn3d.iconscout.com/3d/premium/thumb/christmas-tree-3d-icon-download-in-png-blend-fbx-gltf-file-formats--xmas-cute-pack-festival-days-icons-5602726.png?f=webp',
  travel:
    'https://cdn3d.iconscout.com/3d/premium/thumb/travel-destination-3d-icon-download-in-png-blend-fbx-gltf-file-formats--tourist-location-beach-island-pack-holidays-icons-5410375.png?f=webp',
  sport:
    'https://cdn3d.iconscout.com/3d/premium/thumb/sports-equipment-3d-icon-download-in-png-blend-fbx-gltf-file-formats--sport-ball-basketball-rugby-badminton-racket-education-pack-school-icons-3342374.png?f=webp',
  entertainment: 'https://cdn3d.iconscout.com/3d/premium/thumb/art-3d-icon-download-in-png-blend-fbx-gltf-file-formats--drawing-paint-painting-education-pack-e-learning-icons-7322717.png?f=webp',
  job: 'https://cdn3d.iconscout.com/3d/premium/thumb/business-goal-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--target-investment-career-pack-illustrations-3010228.png?f=webp',
  education:
    'https://cdn3d.iconscout.com/3d/premium/thumb/school-chair-3d-icon-download-in-png-blend-fbx-gltf-file-formats--student-seat-furniture-education-pack-icons-4884509.png',
    health: 'https://cdn3d.iconscout.com/3d/premium/thumb/health-care-3d-icon-download-in-png-blend-fbx-gltf-file-formats--heart-hospital-medical-pack-healthcare-icons-6043319.png?f=webp',
};

export const coursesList: News[] = [
  {
    title: 'Summer Sale Extravaganza',
    time: new Date('2023-06-15T09:00:00'),
    color: '#FF5733',
    caption: 'Up to 50% off on all items!',
    image: 'assets/course_rive/topic_1.svg',
    idx: 0,
    likes: 0,
    topics: ['fashion'],
  },

  {
    title: 'Gourmet Food Festival',
    time: new Date('2023-07-20T11:00:00'),
    color: '#FFB833',
    caption: 'Taste the best gourmet food!',
    image: 'assets/course_rive/topic_2.svg',
    idx: 1,
    likes: 0,
    topics: ['food'],
  },
  {
    title: 'Tech Expo 2023',
    time: new Date('2023-08-10T10:00:00'),
    color: '#33FF57',
    caption: 'Discover the latest in tech!',
    image: 'assets/course_rive/topic_3.svg',
    idx: 2,
    likes: 0,
    topics: ['tech'],
  },
  {
    title: 'Gaming Convention',
    time: new Date('2023-09-05T12:00:00'),
    color: '#3357FF',
    caption: 'Join the ultimate gaming experience!',
    image: 'assets/course_rive/topic_4.svg',
    idx: 3,
    likes: 0,
    topics: ['games'],
  },
  {
    title: 'Christmas Wonderland',
    time: new Date('2023-12-25T10:00:00'),
    color: '#33FFF5',
    caption: 'Enjoy the festive season with us!',
    image: 'assets/course_rive/topic_6.svg',
    idx: 5,
    likes: 0,
    topics: ['xmas'],
  },
  {
    title: 'Travel Expo 2023',
    time: new Date('2023-04-15T09:00:00'),
    color: '#FF5733',
    caption: 'Explore new travel destinations!',
    image: 'assets/course_rive/topic_7.svg',
    idx: 6,
    likes: 0,
    topics: ['travel'],
  },
  {
    title: 'Sports Gear Sale',
    time: new Date('2023-05-20T11:00:00'),
    color: '#33FFB8',
    caption: 'Get the best deals on sports gear!',
    image: 'assets/course_rive/topic_8.svg',
    idx: 7,
    likes: 0,
    topics: ['sport'],
  },
  {
    title: 'Music Festival',
    time: new Date('2023-06-30T18:00:00'),
    color: '#FF33D4',
    caption: 'Experience live music like never before!',
    image: 'assets/course_rive/topic_9.svg',
    idx: 8,
    likes: 0,
    topics: ['entertainment'],
  },
  {
    title: 'Back to School Sale',
    time: new Date('2023-08-15T09:00:00'),
    color: '#33FF57',
    caption: 'Get ready for the new school year!',
    image: 'assets/course_rive/topic_11.svg',
    idx: 10,
    likes: 0,
    topics: ['education'],
  },
];

export interface News extends Likeable {
  title: string;
  time: Date;
  topics: string[];
  idx: string | number;
  color: string;
  new?: boolean;
  caption: string;
  preview?: any;
  subtitle?: string;
  image: string;
  store?: number;
  storeNavigation?: Store;
  html?: string;
}

export interface Likeable {
  likes: number;
  liked?: boolean;
}

export interface Store extends Likeable {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  country: string;
  cap: string;
  lat: number;
  lng: number;
  new?: boolean;
  phone: string;
  email: string;
  website: string;
  logo: string;
  description: string;
  facebook: string;
  instagram: string;
  x: string;
  threads: string;
}

export const wmo_icons = {
  0: 'https://cdn3d.iconscout.com/3d/premium/thumb/sunny-sun-3d-icon-download-in-png-blend-fbx-gltf-file-formats--day-sky-weather-pack-icons-5122320.png?f=webp',
  1: 'https://cdn3d.iconscout.com/3d/premium/thumb/cloudy-weather-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--sunny-sun-light-pack-nature-illustrations-2754892.png?f=webp',
  2: 'https://cdn3d.iconscout.com/3d/premium/thumb/cloud-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--forecast-weather-cloudy-nature-summer-pack-beach-illustrations-4615385.png?f=webp',
  3: 'https://cdn3d.iconscout.com/3d/premium/thumb/rain-cloud-3d-icon-download-in-png-blend-fbx-gltf-file-formats--rainy-weather-spring-element-vol1-pack-nature-icons-6757336.png?f=webp',
  4: 'https://cdn3d.iconscout.com/3d/premium/thumb/storm-clouds-3d-icon-download-in-png-blend-fbx-gltf-file-formats--thunder-rain-cloud-weather-pack-user-interface-icons-7151191.png?f=webp',
  5: 'https://cdn3d.iconscout.com/3d/premium/thumb/snowy-weather-3d-icon-download-in-png-blend-fbx-gltf-file-formats--snowflake-cloudy-and-snow-rain-forecasts-pack-icons-3527452.png?f=webp',
}
