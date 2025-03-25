import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.svg';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Tee Premium Homes & Services" className="h-12 w-auto" />
                <span className="text-lg font-semibold text-white">Tee Premium</span>
              </div>
            </Link>
            <p className="text-gray-400">
              Your luxury home away from home. Experience the finest properties and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand hover:text-brand-light transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-brand hover:text-brand-light transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-brand hover:text-brand-light transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-brand transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-brand transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-brand transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-brand transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand transition-colors">
                  Property Management
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand transition-colors">
                  BnB Consulting
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand transition-colors">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand transition-colors">
                  Guest Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-5 w-5 text-brand" />
                <span>info@teepremium.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-5 w-5 text-brand" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-5 w-5 text-brand" />
                <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Tee Premium Homes & Services. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-brand text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-brand text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 