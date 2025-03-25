import React, { useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { AlertCircle } from 'lucide-react';

// Placeholder admin credentials for testing
const ADMIN_CREDENTIALS = {
  email: 'admin@teepremium.com',
  password: 'TeeP@2024#SecureAdmin',
  securityCode: '123456'
};

// Password validation function
const isPasswordSecure = (password: string): boolean => {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    securityCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials
      if (
        formData.email !== ADMIN_CREDENTIALS.email ||
        formData.password !== ADMIN_CREDENTIALS.password ||
        formData.securityCode !== ADMIN_CREDENTIALS.securityCode
      ) {
        throw new Error('Invalid admin credentials');
      }

      // Store admin session
      localStorage.setItem('adminAuthenticated', 'true');
      
      // Navigate to the intended page or admin dashboard
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      // Clear any existing authentication
      localStorage.removeItem('adminAuthenticated');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <AuthLayout
      title="Admin Login"
      subtitle={
        <div>
          <p>Secure access for administrators only</p>
          <p className="mt-2 text-sm text-gray-500">
            Test credentials: {ADMIN_CREDENTIALS.email} / {ADMIN_CREDENTIALS.password} / {ADMIN_CREDENTIALS.securityCode}
          </p>
        </div>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Admin Email
          </label>
          <div className="mt-1">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full"
              placeholder="admin@teepremium.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div>
          <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700">
            Security Code
          </label>
          <div className="mt-1">
            <Input
              id="securityCode"
              name="securityCode"
              type="text"
              required
              value={formData.securityCode}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter your admin security code"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Sign in to Admin Panel'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
} 