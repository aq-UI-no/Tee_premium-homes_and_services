# Tee Premium Homes & Services

A modern, full-featured property management and booking platform built with React, TypeScript, and Tailwind CSS.

## Features

### For Property Owners
- Property listing and management
- Document upload and verification
- Earnings tracking and analytics
- Booking management
- Property inspection scheduling
- Professional property setup assistance

### For Guests
- Premium property search and booking
- Interactive property viewing
- Secure payment processing
- Guest services and support
- Property reviews and ratings

### Admin Features
- Comprehensive dashboard
- Property owner management
- User management
- Booking oversight
- Payment tracking
- Report generation

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **State Management**: React Hooks
- **Routing**: React Router
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Image Storage**: Cloud storage (configurable)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tee-premium-homes-and-services.git
cd tee-premium-homes-and-services
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
│   ├── layouts/     # Layout components
│   ├── ui/          # Basic UI components
│   └── sections/    # Page sections
├── pages/          # Page components
├── services/       # API and service functions
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── lib/            # Library configurations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@teepremium.com or join our Slack channel.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Supabase](https://supabase.com/)