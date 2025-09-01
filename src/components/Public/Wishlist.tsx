import React, { useState } from 'react';
import { Package, Heart, CheckCircle, Gift, CreditCard } from 'lucide-react';
import { WishlistItem } from '../../types';

interface WishlistProps {
  wishlist: WishlistItem[];
  onPurchaseItem: (itemId: string, buyerName: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlist, onPurchaseItem }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [buyerName, setBuyerName] = useState('');

  const categories = ['Todos', ...new Set(wishlist.map(item => item.category))];
  const filteredWishlist = selectedCategory === 'Todos' 
    ? wishlist 
    : wishlist.filter(item => item.category === selectedCategory);

  const handlePurchase = () => {
    if (selectedItem && buyerName.trim()) {
      onPurchaseItem(selectedItem.id, buyerName);
      setSelectedItem(null);
      setBuyerName('');
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const totalItems = wishlist.length;
  const purchasedItems = wishlist.filter(item => item.purchased).length;
  const progress = (purchasedItems / totalItems) * 100;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Lista de Desejos
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Escolha um presente especial para nos ajudar a começar nossa nova vida
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progresso</span>
              <span>{purchasedItems} de {totalItems}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Wishlist Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWishlist.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                item.purchased ? 'opacity-75' : 'hover:transform hover:-translate-y-2'
              }`}
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                {item.purchased && (
                  <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                    <div className="text-center text-white">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-semibold">Presenteado</p>
                      <p className="text-sm">por {item.purchasedBy}</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-500">
                    {formatPrice(item.price)}
                  </span>
                  {!item.purchased && (
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all flex items-center space-x-2"
                    >
                      <Gift className="h-4 w-4" />
                      <span>Presentear</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWishlist.length === 0 && (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">
              Nenhum item encontrado nesta categoria
            </p>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Confirmar Presente
              </h3>
              <p className="text-gray-600">
                Você está presenteando: <strong>{selectedItem.name}</strong>
              </p>
              <p className="text-pink-500 font-bold text-xl mt-2">
                {formatPrice(selectedItem.price)}
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu nome:
              </label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Digite seu nome completo"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handlePurchase}
                disabled={!buyerName.trim()}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Confirmar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Wishlist;