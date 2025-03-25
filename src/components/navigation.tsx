import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import logo from '../assets/logo.svg';

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Tee Premium Homes & Services" className="h-12 w-auto" />
              <span className="text-xl font-semibold text-secondary">Tee Premium Homes & Services</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-secondary hover:text-brand transition-colors">
              Home
            </Link>
            <Link to="/properties" className="text-secondary hover:text-brand transition-colors">
              Properties
            </Link>
            <Link to="/services" className="text-secondary hover:text-brand transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-secondary hover:text-brand transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-secondary hover:text-brand transition-colors">
              Contact
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-secondary hover:text-brand transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark transition-colors"
              >
                Sign up
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <Link
                to="/admin/login"
                className="flex items-center gap-2 text-secondary hover:text-brand transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-brand"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              to="/"
              className="block px-3 py-2 text-secondary hover:text-brand transition-colors"
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="block px-3 py-2 text-secondary hover:text-brand transition-colors"
            >
              Properties
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 text-secondary hover:text-brand transition-colors"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-secondary hover:text-brand transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-secondary hover:text-brand transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-secondary hover:text-brand transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors"
            >
              Sign up
            </Link>
            <div className="my-2 border-t border-gray-200" />
            <Link
              to="/admin/login"
              className="flex items-center gap-2 px-3 py-2 text-secondary hover:text-brand transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 