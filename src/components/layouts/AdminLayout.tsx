import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  Users,
  Handshake,
  Settings,
  LogOut,
  CircleDollarSign,
  FileBarChart,
  Briefcase
} from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.svg';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Home, label: 'Properties', href: '/admin/properties' },
  { icon: CalendarDays, label: 'Bookings', href: '/admin/bookings' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Handshake, label: 'Partners', href: '/admin/partners' },
  { icon: Briefcase, label: 'Services', href: '/admin/services' },
  { icon: CircleDollarSign, label: 'Payments', href: '/admin/payments' },
  { icon: FileBarChart, label: 'Reports', href: '/admin/reports' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    setIsAdmin(isAuthenticated);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-brand text-white">
        <div className="p-6">
          <Link to="/admin" className="flex items-center gap-3">
            <img src={logo} alt="Tee Premium Homes & Services" className="h-8 w-auto" />
            <div className="flex flex-col">
              <span className="text-lg font-bold">Tee Premium</span>
              <span className="text-xs opacity-75">Admin Portal</span>
            </div>
          </Link>
        </div>

        <nav className="mt-6 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                  isActive
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="h-10 w-10 rounded-full bg-white/10" />
            <div className="flex-1">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs opacity-75">admin@teepremium.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">
            {sidebarItems.find(item => item.href === location.pathname)?.label || 'Dashboard'}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 