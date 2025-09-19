# ONTIME Courier Tracking System

A comprehensive courier tracking and logistics management system built with Next.js 14, featuring real-time package tracking, admin dashboard, invoice generation, and interactive maps.

## 🚀 Features

### Public Features
- **Package Tracking**: Real-time tracking with interactive maps using Leaflet
- **Invoice Download**: Professional PDF invoice generation with QR codes
- **Responsive Design**: Mobile-first design with modern UI components
- **Multi-language Support**: Ready for internationalization

### Admin Dashboard
- **Secure Authentication**: 2FA login system with session management
- **Shipment Management**: Create, update, and track shipments
- **Invoice Generation**: Professional invoice creation with PDF export
- **Analytics Dashboard**: Real-time statistics and reporting
- **User Management**: Role-based access control

### Technical Features
- **Next.js 14**: App Router with server-side rendering
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern styling with shadcn/ui components
- **Interactive Maps**: Leaflet integration for route visualization
- **PDF Generation**: Custom invoice templates with QR codes
- **Responsive Design**: Mobile-first approach

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Maps**: Leaflet
- **Authentication**: Custom JWT-based auth
- **PDF Generation**: Custom HTML-to-PDF conversion
- **Icons**: Lucide React
- **State Management**: React hooks + Context API

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ontime-courier-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings (auto-detected)
   - Deploy

3. **Environment Variables** (if needed)
   \`\`\`bash
   # Add in Vercel dashboard under Settings > Environment Variables
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   \`\`\`

### Deploy to Other Platforms

#### Netlify
1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`
2. Deploy the `out` folder to Netlify

#### Railway
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`

## 🔧 Configuration

### Admin Access
- **URL**: `/admin/login`
- **Demo Credentials**:
  - Email: `admin@ontime-delivery.com`
  - Password: `admin123`
  - 2FA Code: `123456`

### Tracking Demo
Use these sample tracking numbers:
- `RMF123456789` - In Transit (Air Freight)
- `RCP987654321` - Delivered (Ocean Freight)

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── track/             # Package tracking
│   ├── services/          # Services page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── tracking-map.tsx  # Interactive map component
│   ├── invoice-generator.tsx # PDF invoice generation
│   └── shipment-management.tsx # Admin shipment tools
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication utilities
│   └── utils.ts         # General utilities
├── public/              # Static assets
│   └── images/          # Image assets
└── middleware.ts        # Route protection
\`\`\`

## 🎨 Customization

### Branding
- Update logo in `/public/ontime-logo.jpg`
- Modify colors in `app/globals.css`
- Update company information in components

### Features
- Add new tracking statuses in tracking components
- Extend admin dashboard with new metrics
- Customize invoice templates in `invoice-generator.tsx`

## 🔒 Security Features

- **Authentication**: Secure admin login with 2FA
- **Route Protection**: Middleware-based access control
- **Session Management**: Secure token handling
- **Input Validation**: Form validation throughout
- **CORS Protection**: Secure API endpoints

## 📱 Mobile Support

- Fully responsive design
- Touch-friendly interface
- Mobile-optimized maps
- Progressive Web App ready

## 🌍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: support@ontime-delivery.com
- **Documentation**: Check this README and inline code comments
- **Issues**: Create a GitHub issue for bugs or feature requests

## 🔄 Updates

### Version 2.1.0
- ✅ Complete rebrand to ONTIME
- ✅ Interactive maps integration
- ✅ Enhanced invoice generation with QR codes
- ✅ Admin dashboard with 2FA
- ✅ Mobile-responsive design
- ✅ Professional PDF exports

---

**Built with ❤️ using Next.js and modern web technologies**


## Refactor additions
- Prisma schema and seed added
- API routes under app/api/admin and app/api/track
- Components: shipment-management, invoice-generator, tracking-map
- Run `npm install` then `npx prisma generate` and `npx prisma migrate dev --name init` then `npx ts-node prisma/seed.ts`
