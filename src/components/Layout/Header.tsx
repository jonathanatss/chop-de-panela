import React from 'react';
import { Heart, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  currentView: 'public' | 'admin';
  onViewChange: (view: 'public' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-pink-500 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">Chá de Panela</h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => onViewChange('public')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'public'
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  Site
                </button>
                <button
                  onClick={() => onViewChange('admin')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'admin'
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  Painel
                </button>
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Sair"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onViewChange('admin')}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Admin</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;