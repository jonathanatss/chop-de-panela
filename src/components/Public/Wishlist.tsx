import React, { useState } from 'react';
import { Heart, CheckCircle, Gift, CreditCard } from 'lucide-react';
import { WishlistItem } from '../../types';

// O onContribute não é mais passado como prop
interface WishlistProps {
  wishlist: WishlistItem[];
}

const Wishlist: React.FC<WishlistProps> = ({ wishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [contributorName, setContributorName] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [modalError, setModalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!Array.isArray(wishlist)) {
    return (
      <section className="py-20 bg-light-foam" id="wishlist">
        <div className="text-center">A carregar lista de presentes...</div>
      </section>
    );
  }

  const categories = ['Todos', ...new Set(wishlist.filter(item => item && item.category).map(item => item.category))];
  
  const filteredWishlist = selectedCategory === 'Todos' 
    ? wishlist 
    : wishlist.filter(item => item && item.category === selectedCategory);

  const handleOpenModal = (item: WishlistItem) => {
    setSelectedItem(item);
    setContributionAmount('');
    setModalError('');
    setContributorName('');
    setIsSubmitting(false);
  };
  
  const handleCloseModal = () => {
    setSelectedItem(null);
  }

  const handlePayment = async () => {
    if (selectedItem && contributorName.trim() && contributionAmount) {
      setIsSubmitting(true);
      setModalError('');
      try {
        const response = await fetch('http://localhost:5000/api/payment/create-preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            itemId: selectedItem.id,
            amount: parseFloat(contributionAmount),
            contributorName: contributorName,
          }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.msg || 'Falha ao criar preferência de pagamento.');
        }

        const data = await response.json();
        window.location.href = data.init_point;

      } catch (error: any) {
        setModalError(error.message);
        setIsSubmitting(false);
      }
    }
  };
  
  const formatPrice = (price: number) => price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
  const totalItems = wishlist.length;
  const fundedItems = wishlist.filter(item => item && item.isFullyFunded).length;
  const progress = totalItems > 0 ? (fundedItems / totalItems) * 100 : 0;

  let effectiveMin = 0;
  if (selectedItem) {
    const minContribution = parseFloat((selectedItem.price * 0.10).toFixed(2));
    effectiveMin = Math.min(minContribution, selectedItem.amountRemaining);
  }

  return (
    <section className="py-20 bg-light-foam" id="wishlist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-dark-wood mb-4 font-display uppercase">A nossa Lista de Presentes</h2>
          <p className="text-lg text-gray-600 mb-8">Contribua com um valor ou compre o item inteiro. Toda a ajuda é bem-vinda!</p>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{fundedItems} de {totalItems} itens completados</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-beer-amber to-amber-400 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-3 rounded-full transition-all font-semibold ${selectedCategory === category ? 'bg-dark-wood text-white shadow-lg' : 'bg-white text-dark-wood hover:bg-amber-100'}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWishlist.map((item) => {
            if (!item) return null;
            const contributionProgress = (item.amountContributed / item.price) * 100;
            return (
              <div key={item.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col ${item.isFullyFunded ? 'opacity-75' : 'hover:shadow-xl hover:transform hover:-translate-y-2'}`}>
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
                  {item.isFullyFunded && (<div className="absolute inset-0 bg-green-600/80 flex flex-col items-center justify-center text-center text-white p-4"><CheckCircle className="h-12 w-12 mx-auto mb-2" /><p className="font-semibold">Presente Completo!</p><p className="text-sm mt-1">Obrigado a todos!</p></div>)}
                  <div className="absolute top-4 right-4"><span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-dark-wood">{item.category}</span></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-dark-wood mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow h-12 overflow-hidden">{item.description}</p>
                  <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{formatPrice(item.amountContributed)} / {formatPrice(item.price)}</span>
                          <span>{contributionProgress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-beer-amber h-2.5 rounded-full" style={{ width: `${contributionProgress}%` }}></div></div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-dark-wood">{formatPrice(item.price)}</span>
                    {!item.isFullyFunded && (<button onClick={() => handleOpenModal(item)} className="bg-dark-wood text-white px-6 py-2 rounded-lg hover:bg-black transition-all flex items-center space-x-2 font-semibold"><Gift className="h-4 w-4" /><span>Oferecer</span></button>)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 transition-all duration-300">
            <div>
              <div className="text-center mb-6"><Heart className="h-12 w-12 text-beer-amber mx-auto mb-4" /><h3 className="text-2xl font-bold text-dark-wood mb-2">Contribuir para {selectedItem.name}</h3><p className="text-gray-600">Faltam <strong>{formatPrice(selectedItem.amountRemaining)}</strong> para completar.</p></div>
              <div className="space-y-4 mb-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">O seu nome:</label><input type="text" value={contributorName} onChange={(e) => setContributorName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beer-amber" placeholder="Digite o seu nome completo"/></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor da contribuição (R$):</label>
                  <input 
                    type="number" 
                    value={contributionAmount} 
                    onChange={(e) => setContributionAmount(e.target.value)} 
                    min={effectiveMin.toFixed(2)} 
                    max={selectedItem.amountRemaining.toFixed(2)} 
                    step="0.01" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beer-amber" 
                    placeholder={`Mínimo ${formatPrice(effectiveMin)}`}
                  />
                </div>
              </div>
              {modalError && <p className="text-red-600 text-sm text-center mb-4">{modalError}</p>}
              <div className="flex space-x-4">
                <button onClick={handleCloseModal} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">Cancelar</button>
                <button onClick={handlePayment} disabled={!contributorName.trim() || !contributionAmount || isSubmitting} className="flex-1 px-4 py-3 bg-dark-wood text-white rounded-lg hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold">
                  {isSubmitting ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> : <CreditCard className="h-4 w-4" />}<span>{isSubmitting ? 'Aguarde...' : 'Pagar Agora'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Wishlist;