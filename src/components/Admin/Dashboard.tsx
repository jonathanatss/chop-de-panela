import React from 'react';
import { 
  Gift, 
  MessageSquare, 
  Settings, 
  Package, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Users
} from 'lucide-react';
import { WishlistItem, Message } from '../../types';

interface DashboardProps {
  wishlist: WishlistItem[];
  messages: Message[];
  eventInfo: any;
  onNavigate: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ wishlist, messages, eventInfo, onNavigate }) => {
  const totalItems = wishlist.length;
  const purchasedItems = wishlist.filter(item => item.purchased).length;
  const pendingItems = totalItems - purchasedItems;
  const unreadMessages = messages.filter(msg => !msg.read).length;
  const completionRate = totalItems > 0 ? (purchasedItems / totalItems) * 100 : 0;

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);
  const purchasedValue = wishlist
    .filter(item => item.purchased)
    .reduce((sum, item) => sum + item.price, 0);

  const stats = [
    {
      title: 'Itens Presenteados',
      value: purchasedItems,
      total: totalItems,
      icon: Gift,
      color: 'text-green-600 bg-green-100',
      onClick: () => onNavigate('wishlist')
    },
    {
      title: 'Mensagens Não Lidas',
      value: unreadMessages,
      total: messages.length,
      icon: MessageSquare,
      color: 'text-blue-600 bg-blue-100',
      onClick: () => onNavigate('messages')
    },
    {
      title: 'Taxa de Conclusão',
      value: `${completionRate.toFixed(0)}%`,
      total: '100%',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-100',
      onClick: () => onNavigate('wishlist')
    },
    {
      title: 'Valor Arrecadado',
      value: purchasedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      total: totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      icon: Users,
      color: 'text-orange-600 bg-orange-100',
      onClick: () => onNavigate('wishlist')
    }
  ];

  const quickActions = [
    {
      title: 'Gerenciar Lista',
      description: 'Adicionar, editar ou remover itens da lista de desejos',
      icon: Package,
      color: 'bg-gradient-to-r from-pink-500 to-rose-500',
      onClick: () => onNavigate('wishlist')
    },
    {
      title: 'Ver Mensagens',
      description: 'Ler mensagens de felicitações dos convidados',
      icon: MessageSquare,
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      onClick: () => onNavigate('messages')
    },
    {
      title: 'Configurações',
      description: 'Alterar informações do evento e configurações do PIX',
      icon: Settings,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      onClick: () => onNavigate('settings')
    }
  ];

  const recentMessages = messages
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const recentPurchases = wishlist
    .filter(item => item.purchased && item.purchaseDate)
    .sort((a, b) => new Date(b.purchaseDate!).getTime() - new Date(a.purchaseDate!).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Painel do Chá de Panela - {eventInfo.brideNames}
        </h1>
        <p className="text-gray-600">
          Acompanhe o progresso e gerencie seu evento
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={stat.onClick}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              {stat.title}
            </h3>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold text-gray-800">
                {stat.value}
              </p>
              {stat.total && (
                <p className="text-sm text-gray-500">
                  de {stat.total}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Ações Rápidas
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.onClick}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {action.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Mensagens Recentes
          </h3>
          {recentMessages.length > 0 ? (
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-800">
                        {message.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {message.message}
                      </p>
                    </div>
                    {!message.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(message.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
              <button
                onClick={() => onNavigate('messages')}
                className="text-pink-500 hover:text-pink-600 text-sm font-medium"
              >
                Ver todas as mensagens →
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Nenhuma mensagem recente
            </p>
          )}
        </div>

        {/* Recent Purchases */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Presentes Recentes
          </h3>
          {recentPurchases.length > 0 ? (
            <div className="space-y-4">
              {recentPurchases.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Presenteado por {item.purchasedBy}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.purchaseDate!).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => onNavigate('wishlist')}
                className="text-pink-500 hover:text-pink-600 text-sm font-medium"
              >
                Ver lista completa →
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Nenhum presente recente
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;