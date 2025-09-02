import React, { useState } from 'react';
import { Heart, CheckCircle, Gift, CreditCard, Check, Copy, Table } from 'lucide-react';
import { WishlistItem } from '../../types';
import { EventInfo } from '../../types';

interface WishlistProps {
  wishlist: WishlistItem[];
  eventInfo: EventInfo;
}

const Wishlist: React.FC<WishlistProps> = ({ eventInfo, wishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [contributorName, setContributorName] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [modalError, setModalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [thanks, setThanks] = useState(false);

  if (!Array.isArray(wishlist)) {
    return (
      <section className="py-20 bg-background" id="wishlist">
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

  const handleConfirmPayment = async () => {
    const data = {
      'contributorName': contributorName,
      'contributionAmount': contributionAmount,
      'wishListItem': selectedItem
    }

    setIsSubmitting(true);
    setModalError('');

    try {
      // const response = await fetch("http://localhost:5000/api/wishlist/contribution/send-confirm-email", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data)
      // });

      // if (!response.ok) {
      //   const err = await response.json();
      //   throw new Error(err.msg || 'Falha ao confirmar contribuição.');
      // }

      setThanks(true);

    } catch( error : any){
      setModalError(error.message);
      setIsSubmitting(false);
    }
  };
  
  const handleCloseModal = () => {
    setSelectedItem(null);
  }

  const handleCloseContribuitionModal = () => {
    handleCloseModal();
    setThanks(false);
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

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(eventInfo.pixKey);
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar PIX:', err);
    }
  };

  if (thanks) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl text-center">
          <h2 className="text-xl font-bold mb-3">🎉 Obrigado!</h2>
          <p className="mb-3">Sua contribuição foi registrada com sucesso.</p>
          <button className="bg-accent text-accent-foreground px-6 py-2 rounded-md hover:bg-accent/90 transition-all space-x-2 font-semibold" onClick={handleCloseContribuitionModal}>
            Fechar
          </button>
        </div>
      </div>
    );
  }
  
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
    <section className="py-20 bg-background" id="wishlist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-foreground mb-4 font-beer-heading uppercase">A nossa Lista de Presentes</h2>
          <p className="text-lg text-muted-foreground mb-8">Contribua com um valor ou compre o item inteiro. Toda a ajuda é bem-vinda!</p>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{fundedItems} de {totalItems} itens completados</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div className="bg-gradient-beer h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-3 rounded-full transition-all font-semibold ${selectedCategory === category ? 'bg-accent text-accent-foreground shadow-beer' : 'bg-card text-foreground hover:bg-secondary'}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWishlist.map((item) => {
            if (!item) return null;
            const contributionProgress = (item.amountContributed / item.price) * 100;
            return (
              <div key={item.id} className={`bg-card rounded-lg shadow-foam border border-border/50 overflow-hidden transition-all duration-300 flex flex-col ${item.isFullyFunded ? 'opacity-75' : 'hover:shadow-beer hover:-translate-y-2'}`}>
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
                  {item.isFullyFunded && (<div className="absolute inset-0 bg-success/80 backdrop-blur-sm flex flex-col items-center justify-center text-center text-success-foreground p-4"><CheckCircle className="h-12 w-12 mx-auto mb-2" /><p className="font-semibold font-beer-heading">Presente Completo!</p><p className="text-sm mt-1">Obrigado a todos!</p></div>)}
                  <div className="absolute top-4 right-4"><span className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-foreground">{item.category}</span></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-foreground mb-2 font-beer-heading">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow h-12 overflow-hidden">{item.description}</p>
                  <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{formatPrice(item.amountContributed)} / {formatPrice(item.price)}</span>
                          <span>{contributionProgress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5"><div className="bg-gradient-beer h-2.5 rounded-full" style={{ width: `${contributionProgress}%` }}></div></div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-primary">{formatPrice(item.price)}</span>
                    {!item.isFullyFunded && (<button onClick={() => handleOpenModal(item)} className="bg-accent text-accent-foreground px-6 py-2 rounded-md hover:bg-accent/90 transition-all flex items-center space-x-2 font-semibold"><Gift className="h-4 w-4" /><span>Oferecer</span></button>)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-card rounded-lg max-w-md w-full p-8 transition-all duration-300 animate-scale-in border border-border">
            <div>
              <div className="text-center mb-6"><Heart className="h-12 w-12 text-primary mx-auto mb-4 animate-heart-pulse" /><h3 className="text-2xl font-bold text-foreground mb-2 font-beer-heading">Contribuir para {selectedItem.name}</h3><p className="text-muted-foreground">Faltam <strong>{formatPrice(selectedItem.amountRemaining)}</strong> para completar.</p></div>
              <div className="space-y-4 mb-6">
                <div><label className="block text-sm font-medium text-foreground mb-2">O seu nome:</label><input type="text" value={contributorName} onChange={(e) => setContributorName(e.target.value)} className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-ring bg-background" placeholder="Digite o seu nome completo"/></div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Valor da contribuição (R$):</label>
                  <input 
                    type="number" 
                    value={contributionAmount} 
                    onChange={(e) => setContributionAmount(e.target.value)} 
                    min={effectiveMin.toFixed(2)} 
                    max={selectedItem.amountRemaining.toFixed(2)} 
                    step="0.01" 
                    className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-ring bg-background" 
                    placeholder={`Mínimo ${formatPrice(effectiveMin)}`}
                  />
                </div>
              </div>
              {modalError && <p className="text-destructive text-sm text-center mb-4">{modalError}</p>}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Chave PIX
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={eventInfo.pixKey}
                    readOnly
                    className="flex-1 px-4 py-3 border border-input rounded-md bg-background text-muted-foreground"
                  />
                  <button
                    onClick={copyPixKey}
                    className="px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center space-x-2"
                  >
                    {pixCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{pixCopied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                <button onClick={handleCloseModal} className="flex-1 px-4 py-3 border border-border text-foreground rounded-md hover:bg-secondary transition-colors font-semibold">Cancelar</button>
                <button onClick={handleConfirmPayment} disabled={!contributorName.trim() || !contributionAmount || isSubmitting} className="flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold">
                  {isSubmitting ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> : <CreditCard className="h-4 w-4" />}<span>{isSubmitting ? 'Aguarde...' : 'Contribuir'}</span>
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
