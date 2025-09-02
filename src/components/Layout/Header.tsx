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
    <header className="bg-card/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Beer className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-beer-heading tracking-wider">
              Chopp de Panela
            </h1>
          </div>
          
          <nav className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => onViewChange('public')}
                  className={`px-3 py-2 rounded-md transition-colors font-semibold text-sm ${
                    currentView === 'public'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-muted-foreground hover:bg-secondary/80 hover:text-secondary-foreground'
                  }`}
                >
                  Site
                </button>
                <button
                  onClick={() => onViewChange('admin')}
                  className={`px-3 py-2 rounded-md transition-colors font-semibold text-sm ${
                    currentView === 'admin'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-muted-foreground hover:bg-secondary/80 hover:text-secondary-foreground'
                  }`}
                >
                  Painel
                </button>
                <div className="hidden sm:flex items-center space-x-2 text-foreground">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-semibold">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  title="Sair"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onViewChange('admin')}
                className="flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors font-semibold"
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
