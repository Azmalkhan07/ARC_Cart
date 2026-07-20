# 🛒 ARC CART — Premium Smart Shopping Platform

> India's most modern, futuristic e-commerce frontend built with React.js + Supabase.

![ARC CART Banner](https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop)

---

## ✨ Features

- 🎨 **Premium UI** — Deep Navy + Electric Blue brand palette, glassmorphism cards, micro-animations
- 🔐 **Supabase Authentication** — Email/Password login, registration, forgot password
- 🛍️ **Full Shopping Flow** — Browse → Product Detail → Cart → Checkout → Order Tracking
- ❤️ **Wishlist** — Persistent across sessions via localStorage
- 🌙 **Dark Mode** — Smooth theme toggle
- ⚡ **Flash Sale Countdown** — Live real-time timer
- 📦 **16 Pages** — Home, Products, Cart, Wishlist, Checkout (3 steps), Orders, Profile, Settings, and more
- 📱 **Responsive** — Works on mobile, tablet, and desktop

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React.js 18 |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | React Icons |
| Auth | Supabase (Email & Password) |
| HTTP Client | Axios |
| Build Tool | Vite |

---

## 🏃 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Azmalkhan07/ARC_Cart.git
cd ARC_Cart/frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Supabase credentials in .env

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, PublicLayout
│   │   ├── ui/            # Button, ProductCard, Skeleton
│   │   └── auth/          # ProtectedRoute
│   ├── context/           # Auth, Cart, Wishlist, Theme, Toast
│   ├── pages/public/      # All 16 pages
│   ├── services/          # Supabase client
│   └── utils/             # mockData, formatters
├── vercel.json            # Vercel deployment config
└── vite.config.js
```

---

## 🚢 Deployment (Vercel)

This project is configured for Vercel deployment:

1. Import the repository on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Add environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
4. Click **Deploy** ✅

---

## 🎨 Brand Colors

| Color | Hex |
|---|---|
| Deep Navy | `#0D1B2A` |
| Electric Blue | `#1E90FF` |
| Cyan | `#00B4FF` |
| Background | `#060D18` |

---

## 📄 License

MIT © ARC CART Technologies 2026
