export const APP_CONFIG = {
  name: 'Tee Premium',
  description: 'Your trusted partner in premium real estate solutions',
  contact: {
    phone: '+1 (234) 567-8900',
    email: 'contact@teepremium.com',
    address: '123 Premium Street, City, State 12345'
  },
  social: {
    facebook: 'https://facebook.com/teepremium',
    twitter: 'https://twitter.com/teepremium',
    instagram: 'https://instagram.com/teepremium',
    linkedin: 'https://linkedin.com/company/teepremium'
  }
} as const;

export const PROPERTY_TYPES = {
  STUDIO: 'Studio',
  ONE_BEDROOM: 'One Bedroom',
  TWO_BEDROOM: 'Two Bedroom',
  THREE_BEDROOM: 'Three Bedroom',
  VILLA: 'Villa'
} as const;

export const AMENITIES = {
  BASIC: [
    { id: 'wifi', name: 'WiFi', icon: 'wifi' },
    { id: 'kitchen', name: 'Kitchen', icon: 'utensils' },
    { id: 'ac', name: 'Air Conditioning', icon: 'fan' },
    { id: 'tv', name: 'TV', icon: 'tv' },
    { id: 'washer', name: 'Washer', icon: 'washer' }
  ],
  SAFETY: [
    { id: 'smoke_alarm', name: 'Smoke Alarm', icon: 'alert-circle' },
    { id: 'fire_extinguisher', name: 'Fire Extinguisher', icon: 'flame' },
    { id: 'first_aid', name: 'First Aid Kit', icon: 'heart' }
  ],
  ACCESSIBILITY: [
    { id: 'elevator', name: 'Elevator', icon: 'arrow-up-down' },
    { id: 'ground_floor', name: 'Ground Floor', icon: 'home' }
  ],
  LUXURY: [
    { id: 'pool', name: 'Pool', icon: 'droplet' },
    { id: 'gym', name: 'Gym', icon: 'dumbbell' },
    { id: 'parking', name: 'Parking', icon: 'car' }
  ]
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  PROPERTIES: {
    LIST: '/api/properties',
    DETAIL: (id: string) => `/api/properties/${id}`,
    SEARCH: '/api/properties/search',
    BOOKINGS: (id: string) => `/api/properties/${id}/bookings`
  },
  BOOKINGS: {
    CREATE: '/api/bookings',
    LIST: '/api/bookings',
    DETAIL: (id: string) => `/api/bookings/${id}`,
    CANCEL: (id: string) => `/api/bookings/${id}/cancel`
  },
  ADMIN: {
    DASHBOARD: '/api/admin/dashboard',
    PROPERTIES: '/api/admin/properties',
    BOOKINGS: '/api/admin/bookings',
    USERS: '/api/admin/users'
  }
} as const;

export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: (id: string) => `/properties/${id}`,
  SERVICES: '/services',
  ABOUT: '/about',
  CONTACT: '/contact',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/signup',
    ADMIN_LOGIN: '/admin/login'
  },
  ADMIN: {
    DASHBOARD: '/admin',
    PROPERTIES: '/admin/properties',
    BOOKINGS: '/admin/bookings',
    USERS: '/admin/users',
    SETTINGS: '/admin/settings'
  }
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

export const ANIMATIONS = {
  fadeIn: 'animate-fade-in',
  fadeInDelay: 'animate-fade-in-delay',
  fadeInDelay2: 'animate-fade-in-delay-2',
  slideIn: 'animate-slide-in',
  scaleIn: 'animate-scale-in'
} as const; 