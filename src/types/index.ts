export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Contribution {
  _id: string;
  name: string;
  amount: number;
  date: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  contributors: Contribution[];
  // Campos virtuais que virão do backend
  amountContributed: number;
  amountRemaining: number;
  isFullyFunded: boolean;
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
