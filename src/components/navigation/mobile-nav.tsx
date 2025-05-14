import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants';
import { useAuth } from '@/contexts/auth-context';

export function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      path: ROUTES.HOME,
    },
    {
      label: 'Search',
      icon: Search,
      path: ROUTES.PROPERTIES,
    },
    {
      label: isAuthenticated ? (isAdmin ? 'Admin' : 'Account') : 'Sign In',
      icon: User,
      path: isAuthenticated ? (isAdmin ? ROUTES.ADMIN.DASHBOARD : '/dashboard') : ROUTES.AUTH.LOGIN,
    },
    {
      label: 'Menu',
      icon: Menu,
      onClick: () => setIsMenuOpen(true),
    },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => item.onClick ? item.onClick() : navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center gap-1',
                'text-gray-600 hover:text-brand transition-colors',
                item.path && isActive(item.path) && 'text-brand'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Full Screen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="py-2">
                {[
                  { label: 'Properties', path: ROUTES.PROPERTIES },
                  { label: 'Services', path: ROUTES.SERVICES },
                  { label: 'About', path: ROUTES.ABOUT },
                  { label: 'Contact', path: ROUTES.CONTACT },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      'w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors',
                      isActive(item.path) && 'text-brand font-medium'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add padding to main content to account for bottom nav */}
      <div className="pb-16 md:pb-0" />
    </>
  );
} 