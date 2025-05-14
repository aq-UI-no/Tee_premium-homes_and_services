import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToasterProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const ToastContext = React.createContext<{
  showToast: (message: string, type?: Toast['type'], duration?: number) => void;
  hideToast: (id: string) => void;
}>({
  showToast: () => {},
  hideToast: () => {},
});

export const useToast = () => React.useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const showToast = React.useCallback((message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  }, []);

  const hideToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toaster position="bottom-right" />
    </ToastContext.Provider>
  );
}

export function Toaster({ position = 'bottom-right' }: ToasterProps) {
  const { hideToast } = useToast();
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return createPortal(
    <div
      className={cn(
        'fixed z-50 w-full max-w-sm space-y-2 p-4',
        positionClasses[position]
      )}
      role="alert"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'relative rounded-lg p-4 shadow-lg animate-slide-in',
            {
              'bg-green-50 text-green-900': toast.type === 'success',
              'bg-red-50 text-red-900': toast.type === 'error',
              'bg-blue-50 text-blue-900': toast.type === 'info',
            }
          )}
        >
          <button
            onClick={() => hideToast(toast.id)}
            className="absolute right-2 top-2 rounded-full p-1 hover:bg-black/5"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
          <p>{toast.message}</p>
        </div>
      ))}
    </div>,
    document.body
  );
} 