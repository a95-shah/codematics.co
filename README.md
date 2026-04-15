<div align="center">

# 🚀 Codematics Services Pvt Ltd

### _For A Better, Safe And Peaceful World_

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

A modern, high-performance corporate website for **Codematics** — a global trusted partner for guaranteed software engineering excellence, quality, and transparency.

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Admin Dashboard](#-admin-dashboard)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Dynamic Theming** | Light/dark mode with smooth transitions and CSS custom properties |
| 🖼️ **Image Management** | Cloudinary-powered image uploads with signed URL security |
| 📊 **Admin Dashboard** | Full CMS to manage services, products, team, and news |
| 🧩 **Modular Components** | Reusable, animated UI components (ServiceCard, ProductCard, NewsCard, TeamCard) |
| 🎬 **Rich Animations** | Framer Motion powered scroll reveals, counters, and particle effects |
| 📱 **Fully Responsive** | Mobile-first design with adaptive layouts for all screen sizes |
| 📧 **Contact System** | Integrated contact form with API-backed email handling |
| 🔐 **Authentication** | NextAuth.js based admin authentication |
| ⚡ **Optimized Performance** | Next.js Image optimization, lazy loading, and code splitting |

---

## 🛠️ Tech Stack

**Frontend:**
- [Next.js 16](https://nextjs.org/) — React framework with App Router & Turbopack
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 4](https://tailwindcss.com/) — Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) — Animation library

**Backend:**
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) — Serverless API endpoints
- [MongoDB Atlas](https://www.mongodb.com/atlas) + [Mongoose](https://mongoosejs.com/) — Database & ODM
- [NextAuth.js](https://next-auth.js.org/) — Authentication

**Media & Hosting:**
- [Cloudinary](https://cloudinary.com/) — Image upload, storage & CDN
- [Vercel](https://vercel.com/) — Recommended deployment platform

---

## 📁 Project Structure

```
codematics.co/
├── public/                  # Static assets (images, favicon)
├── src/
│   ├── app/
│   │   ├── api/             # API routes (services, products, team, news, contact, auth)
│   │   ├── admin/           # Admin dashboard pages
│   │   ├── about/           # About page
│   │   ├── services/        # Services listing & detail pages
│   │   ├── products/        # Products listing & detail pages
│   │   ├── team/            # Team listing page
│   │   ├── news/            # News/blog listing & detail pages
│   │   ├── contact/         # Contact page
│   │   ├── remote-resources/# Remote resources page
│   │   ├── layout.tsx       # Root layout with theme & navigation
│   │   ├── page.jsx         # Homepage
│   │   └── globals.css      # Global styles & CSS variables
│   ├── components/          # Reusable UI components
│   │   ├── AnimatedSection  # Scroll-triggered animation wrapper
│   │   ├── ContactForm      # Contact form with validation
│   │   ├── Counter          # Animated number counter
│   │   ├── Footer           # Site footer
│   │   ├── Navbar           # Navigation bar with mobile menu
│   │   ├── NewsCard         # News article card
│   │   ├── ParticleBackground # Canvas-based particle animation
│   │   ├── ProductCard      # Product showcase card
│   │   ├── SectionHeading   # Animated section title
│   │   ├── ServiceCard      # Service showcase card
│   │   ├── TeamCard         # Team member card
│   │   ├── TechMarquee      # Scrolling tech stack marquee
│   │   └── ThemeProvider    # Dark/light mode context
│   ├── lib/                 # Database connection & Mongoose models
│   ├── utils/               # Utility functions (icon mapping)
│   └── middleware.js        # Route middleware
├── .env.example             # Environment variable template
├── .gitignore               # Git ignore rules
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies & scripts
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shahahsan235/codematics.co.git
cd codematics.co

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual credentials (see section below)

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**

---

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Description | Required |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | ✅ |
| `NEXTAUTH_SECRET` | Random secret for NextAuth.js sessions | ✅ |
| `NEXTAUTH_URL` | Base URL of the app | ✅ |
| `ADMIN_EMAIL` | Admin login email | ✅ |
| `ADMIN_PASSWORD` | Admin login password | ✅ |
| `NEXT_PUBLIC_BASE_URL` | Public-facing base URL | ✅ |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (client-side) | ✅ |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | Cloudinary API key (client-side) | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (server-side) | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key (server-side) | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (server-side) | ✅ |
| `CLOUDINARY_URL` | Full Cloudinary connection URL | ✅ |

> ⚠️ **Never commit `.env.local` to version control.** It is already in `.gitignore`.

---

## 🔑 Admin Dashboard

Access the admin panel at `/admin` to manage:

- **Services** — Add, edit, toggle, and delete services
- **Products** — Manage product listings with images
- **Team** — Manage team member profiles
- **News** — Publish and manage blog posts / news articles

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect the repository on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy — Vercel auto-detects Next.js

```bash
# Or deploy via CLI
npx vercel --prod
```

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software of **Codematics Services Pvt Ltd**.  
All rights reserved © 2026 Codematics.

---

<div align="center">

**Built with ❤️ by [Codematics](https://codematics.co)**

</div>
