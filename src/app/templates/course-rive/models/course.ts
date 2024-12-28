
export const coursesList: News[] = [
  {
    title: "Summer Sale Extravaganza",
    time: new Date('2023-06-15T09:00:00'),
    topics: ["Sale", "Summer", "Discounts"],
    color: "#FF5733",
    caption: "Up to 50% off on all items!",
    image: "assets/course_rive/topic_1.svg",
    idx: 0,
    likes: 0,
  }
];


export interface News extends Likeable {
  title: string;
  time: Date;
  topics: string[];
  idx: number;
  color: string;
  caption: string;
  subtitle?: string;
  image: string;
  store?: number;
  storeNavigation?: Store;
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
  phone: string;
  email: string;
  website: string;
  logo: string;
  description: string;
}
