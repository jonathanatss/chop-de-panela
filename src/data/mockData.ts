import { WishlistItem, Message, EventInfo } from '../types';

export const initialEventInfo: EventInfo = {
  brideNames: 'Ana & Carlos',
  eventDate: '2025-06-15',
  eventTime: '15:00',
  eventLocation: 'Salão de Festas Jardim',
  eventAddress: 'Rua das Flores, 123 - Centro',
  pixKey: '11999999999',
  pixName: 'Ana Silva Santos',
  aboutText: 'Estamos muito felizes em compartilhar este momento especial com vocês! Nosso chá de panela será um momento de celebração e união antes do grande dia.',
  heroImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop'
};

export const initialWishlist: WishlistItem[] = [
  {
    id: '1',
    name: 'Jogo de Panelas Antiaderente',
    description: 'Conjunto com 5 panelas antiaderentes de alta qualidade',
    price: 299.90,
    image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Cozinha',
    purchased: false
  },
  {
    id: '2',
    name: 'Liquidificador Premium',
    description: 'Liquidificador de alta potência com 12 velocidades',
    price: 189.90,
    image: 'https://images.pexels.com/photos/7937472/pexels-photo-7937472.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Eletrodomésticos',
    purchased: true,
    purchasedBy: 'Maria Silva',
    purchaseDate: '2025-01-10'
  },
  {
    id: '3',
    name: 'Jogo de Toalhas de Banho',
    description: 'Kit com 4 toalhas 100% algodão extra macias',
    price: 149.90,
    image: 'https://images.pexels.com/photos/6086473/pexels-photo-6086473.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Casa de Banho',
    purchased: false
  },
  {
    id: '4',
    name: 'Cafeteira Italiana',
    description: 'Cafeteira italiana clássica para 6 xícaras',
    price: 89.90,
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Cozinha',
    purchased: false
  },
  {
    id: '5',
    name: 'Jogo de Lençóis Casal',
    description: 'Lençóis 100% algodão percal 200 fios',
    price: 199.90,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Quarto',
    purchased: false
  },
  {
    id: '6',
    name: 'Aspirador de Pó Robô',
    description: 'Aspirador inteligente com mapeamento automático',
    price: 899.90,
    image: 'https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Eletrodomésticos',
    purchased: false
  }
];

export const initialMessages: Message[] = [
  {
    id: '1',
    name: 'João Santos',
    email: 'joao@email.com',
    message: 'Parabéns pelo casamento! Que Deus abençoe sempre a união de vocês!',
    date: '2025-01-15T10:30:00',
    read: false
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@email.com',
    message: 'Muito feliz por vocês! Desejo toda felicidade do mundo nessa nova etapa.',
    date: '2025-01-14T16:45:00',
    read: true
  },
  {
    id: '3',
    name: 'Pedro Silva',
    email: 'pedro@email.com',
    message: 'Que alegria saber do casamento! Vocês formam um casal lindo!',
    date: '2025-01-13T09:15:00',
    read: false
  }
];