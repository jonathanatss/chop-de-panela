import React from 'react';
import { Beer, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  currentView: 'public' | 'admin';
  onViewChange: (view: 'public' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Beer className="h-8 w-8 text-beer-amber" />
            <h1 className="text-2xl font-bold text-dark-wood font-display tracking-wider">
              Chopp de Panela
            </h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => onViewChange('public')}
                  className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
                    currentView === 'public'
                      ? 'bg-amber-100 text-beer-amber'
                      : 'text-gray-600 hover:text-beer-amber'
                  }`}
                >
                  Site
                </button>
                <button
                  onClick={() => onViewChange('admin')}
                  className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
                    currentView === 'admin'
                      ? 'bg-amber-100 text-beer-amber'
                      : 'text-gray-600 hover:text-beer-amber'
                  }`}
                >
                  Painel
                </button>
                <div className="flex items-center space-x-2 text-dark-wood">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-semibold">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Sair"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onViewChange('admin')}
                className="flex items-center space-x-2 px-4 py-2 bg-dark-wood text-white rounded-lg hover:bg-black transition-colors font-semibold"
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
