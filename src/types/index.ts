export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  purchased: boolean;
  purchasedBy?: string;
  purchaseDate?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export interface EventInfo {
  brideNames: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventAddress: string;
  pixKey: string;
  pixName: string;
  aboutText: string;
  heroImage: string;
}