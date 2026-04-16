export interface Product {
  id: number;
  src: { [key: string]: string };
  title: string;
  review: string;
  price: number;
  old: number;
  color: string[];
  freeDelivery: boolean;
  promo?: boolean;
  fastDelivery?: boolean;
  test?: boolean;
  category: string;
  rating?: number;
}

export interface User {
  email: string;
  password: string;
}
export const user: User[] = [
  { email: "shubhamghimire@gmail.com", password: "shubham123" },
  { email: "sg@gmail.com", password: "sg123456" },
  { email: "shubham@asterdio.com", password: "shubhamasterdio" },
  { email: "user1@asterdio.com", password: "password11" },
  { email: "user2@asterdio.com", password: "mypassword22" },
  { email: "user2@asterdio.com", password: "qwerty123" },
  { email: "user3@asterdio.com", password: "welcome123" },
  { email: "user4@shubham.com", password: "user4" },
  { email: "user5@asterdio.com", password: "user5" },
  { email: "support@shubham.org", password: "support" },
];
export const products: Product[] = [
  {
    id: 1,
    src: { default: "/grinder.jpg", black: "/grinder.jpg" },
    title: "Portable Electric Grinder Maker",
    review: "0",
    price: 777,
    old: 888,
    color: ["black"],
    freeDelivery: false,
    category: "Home Appliances",
    rating: 1,
  },
  {
    id: 2,
    src: { default: "/tm.jpg", black: "/tm.jpg" },
    title: "Indoor Steel Adjustable Silent Treadmill",
    review: "0",
    price: 888,
    old: 999,
    color: ["black"],
    freeDelivery: false,
    category: "Health & Sports",
    rating: 4,
  },
  {
    id: 3,
    src: { default: "/tv.jpg", black: "/tv.jpg", green: "/tvgreen.jpg" },
    title: "Rangs 43 Inch Frameless Android TV",
    review: "0",
    price: 700,
    old: 800,
    color: ["black", "green"],
    freeDelivery: false,
    category: "Televisions",
    rating: 4.5,
  },
  {
    id: 4,
    src: { default: "/hp.jpg", black: "/hp.jpg", blue: "/blhp.jpg" },
    title: "True Wireless Noise Cancelling Headphone",
    review: "0",
    price: 899,
    old: 930,
    color: ["black", "blue"],
    freeDelivery: true,
    promo: true,
    test: true,
    category: "Games & Videos",
    rating: 5,
  },
  {
    id: 5,
    src: { default: "/mac.jpg", lightblue: "/mac.jpg", gray: "/maca.jpg" },
    title: "Macbook Pro M4 Pro - 512/16GB",
    review: "1",
    price: 450,
    old: 500,
    color: ["lightblue", "gray"],
    freeDelivery: true,
    promo: true,
    test: false,
    category: "Mobile & Tablets",
    rating: 4.5,
  },
  {
    id: 6,
    src: {
      default: "/watch.jpg",
      gray: "/watch.jpg",
      orange: "/orangewatch.jpg",
    },
    title: "Apple Watch Ultra",
    review: "0",
    price: 89,
    old: 99,
    color: ["gray", "orange"],
    freeDelivery: true,
    promo: false,
    fastDelivery: true,
    category: "Watches",
    rating: 3,
  },
  {
    id: 7,
    src: { default: "/mac1.jpg", black: "/mac1.jpg" },
    title: "MacBook Air M4 chip, 16/256GB",
    review: "0",
    price: 600,
    old: 699,
    color: ["black"],
    freeDelivery: true,
    promo: true,
    fastDelivery: false,
    category: "Laptop & PC",
    rating: 3.5,
  },
  {
    id: 8,
    src: { default: "/imac.jpg", gray: "/imac.jpg" },
    title: "Apple iMac M4 24-inch 2025",
    review: "4",
    price: 333,
    old: 555,
    color: ["gray"],
    freeDelivery: true,
    promo: true,
    category: "Laptop & PC",
    rating: 2.5,
  },
  {
    id: 9,
    src: { default: "/iphone.jpg", gray: "/iphone.jpg", white: "/iphonea.jpg" },
    title: "iPhone 16 Pro - 8/128GB",
    review: "0",
    price: 600,
    old: 899,
    color: ["gray", "white"],
    freeDelivery: true,
    promo: true,
    category: "Mobile & Tablets",
    rating: 5,
  },
  {
    id: 10,
    src: {
      default: "/controller.jpg",
      gray: "/controller.jpg",
      black: "/controllera.jpg",
    },
    title: "Havit HV-G69 USB Gamepad",
    review: "0",
    price: 26,
    old: 54,
    color: ["gray", "black"],
    freeDelivery: true,
    promo: true,
    category: "Games & Videos",
    rating: 4.5,
  },
];