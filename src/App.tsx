import React, { useState, useEffect, useCallback } from 'react';
import { WishlistItem, Message, EventInfo } from './types';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Header from './components/Layout/Header';
import Hero from './components/Public/Hero';
import About from './components/Public/About';
import Wishlist from './components/Public/Wishlist';
import Contact from './components/Public/Contact';
import LoginForm from './components/Admin/LoginForm';
import Dashboard from './components/Admin/Dashboard';
import WishlistManager from './components/Admin/WishlistManager';
import MessagesManager from './components/Admin/MessagesManager';
import SettingsManager from './components/Admin/SettingsManager';

const API_URL = 'http://localhost:5000/api';

const AppContent = () => {
  const { user, token } = useAuth();
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [adminSection, setAdminSection] = useState('dashboard');
  
  // CORREÇÃO: Iniciar estados como null para verificação explícita
  const [wishlist, setWishlist] = useState<WishlistItem[] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const authFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const finalHeaders = { ...headers, ...options.headers };
    const response = await fetch(url, { ...options, headers: finalHeaders });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ msg: 'Erro na resposta da API' }));
      throw new Error(errorData.msg || 'Falha na requisição para a API');
    }
    if (response.status === 204) return Promise.resolve();
    return response.json();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        const [eventInfoData, wishlistData] = await Promise.all([
          fetch(`${API_URL}/settings`).then(res => res.json()),
          fetch(`${API_URL}/wishlist`).then(res => res.json())
        ]);
        setEventInfo(eventInfoData);
        setWishlist(wishlistData || []); // Garante que wishlist seja sempre um array
        if (token) {
          const messagesData = await authFetch(`${API_URL}/messages`);
          setMessages(messagesData || []);
        }
      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error);
        setWishlist([]); // Em caso de erro, define como um array vazio para evitar crash
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, [token, authFetch]);
  
  const handleContributeToItem = async (itemId: string, contributorName: string, amount: number): Promise<{success: boolean, error?: string, pixPayload?: string}> => {
    try {
      const response = await authFetch(`${API_URL}/wishlist/${itemId}/contribute`, {
        method: 'POST',
        body: JSON.stringify({ name: contributorName, amount }),
      });
      if (wishlist) {
        setWishlist(prev => prev!.map(item => (item.id === itemId ? response.updatedItem : item)));
      }
      return { success: true, pixPayload: response.pixPayload };
    } catch (error: any) {
      console.error("Erro ao contribuir para o item:", error);
      return { success: false, error: error.message };
    }
  };

  const handleAddItem = async (newItem: Omit<WishlistItem, 'id' | 'contributors' | 'amountContributed' | 'amountRemaining' | 'isFullyFunded'>) => {
    try {
      const addedItem = await authFetch(`${API_URL}/wishlist`, {
        method: 'POST',
        body: JSON.stringify(newItem),
      });
      setWishlist(prev => (prev ? [...prev, addedItem] : [addedItem]));
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  const handleUpdateItem = async (id: string, updates: Partial<WishlistItem>) => {
    try {
      const updatedItem = await authFetch(`${API_URL}/wishlist/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      if(wishlist) {
        setWishlist(prev => prev!.map(item => (item.id === id ? updatedItem : item)));
      }
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await authFetch(`${API_URL}/wishlist/${id}`, { method: 'DELETE' });
      if(wishlist) {
        setWishlist(prev => prev!.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  };

  const handleSubmitMessage = async (name: string, email: string, message: string) => {
    try {
        await authFetch(`${API_URL}/messages`, {
            method: 'POST',
            body: JSON.stringify({ name, email, message })
        });
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
    }
  };

  const handleMarkMessageRead = async (id: string) => {
    try {
      const updatedMessage = await authFetch(`${API_URL}/messages/read/${id}`, { method: 'PATCH' });
      setMessages(prev => prev.map(msg => (msg.id === id ? updatedMessage : msg)));
    } catch (error) {
      console.error("Erro ao marcar mensagem como lida:", error);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await authFetch(`${API_URL}/messages/${id}`, { method: 'DELETE' });
      setMessages(prev => prev.filter(msg => msg.id !== id));
    } catch (error) {
      console.error("Erro ao deletar mensagem:", error);
    }
  };

  const handleUpdateEventInfo = async (updates: Partial<EventInfo>) => {
    const updatedInfo = await authFetch(`${API_URL}/settings`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    setEventInfo(updatedInfo);
  };

  const handleViewChange = (view: 'public' | 'admin') => {
    setCurrentView(view);
    if (view === 'admin' && user) setAdminSection('dashboard');
  };

  const handleAdminNavigate = (section: string) => setAdminSection(section);

  if (isLoadingData) return <div className="min-h-screen flex items-center justify-center bg-light-foam text-dark-wood">A carregar o barril...</div>;
  if (currentView === 'admin' && !user) return <LoginForm />;
  
  if (currentView === 'admin' && user && eventInfo && wishlist) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentView={currentView} onViewChange={handleViewChange} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Dashboard wishlist={wishlist} messages={messages} eventInfo={eventInfo} onNavigate={handleAdminNavigate}/>
          {adminSection === 'wishlist' && <WishlistManager wishlist={wishlist} onAddItem={handleAddItem} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>}
          {adminSection === 'messages' && <MessagesManager messages={messages} onMarkRead={handleMarkMessageRead} onDelete={handleDeleteMessage}/>}
          {adminSection === 'settings' && <SettingsManager eventInfo={eventInfo} onUpdate={handleUpdateEventInfo}/>}
        </main>
      </div>
    );
  }

  // CORREÇÃO: Verificação de segurança mais robusta antes de renderizar
  if (!eventInfo || !wishlist) return <div className="min-h-screen flex items-center justify-center bg-light-foam text-dark-wood">Falha ao carregar. Verifique se o backend está a correr e recarregue.</div>

  return (
    <div className="min-h-screen bg-light-foam">
      <Header currentView={currentView} onViewChange={handleViewChange} />
      <main>
        <Hero eventInfo={eventInfo} />
        <About eventInfo={eventInfo} />
        <Wishlist wishlist={wishlist} onContribute={handleContributeToItem} />
        <Contact eventInfo={eventInfo} onSubmitMessage={handleSubmitMessage} />
      </main>
      <footer className="bg-dark-wood text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <h3 className="text-3xl font-display tracking-wider mb-2">{eventInfo.brideNames}</h3>
            {eventInfo.eventDate && <p className="text-gray-300">{new Date(`${eventInfo.eventDate}T00:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>}
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400">
              © 2025 Chopp de Panela. Um brinde ao amor! 🍻
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (<AuthProvider><AppContent /></AuthProvider>);
}

export default App;