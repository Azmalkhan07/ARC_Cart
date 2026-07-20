# ARC CART — Enterprise E-Commerce Platform

> **The Future of Smart Shopping**
> A production-ready, full-stack enterprise e-commerce marketplace built with Spring Boot 3.2 + React 18.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Quick Start (Local)](#quick-start-local)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Reference](#api-reference)
- [Deployment (Railway)](#deployment-railway)

---

## Overview

ARC CART is a three-tier enterprise e-commerce application:
- **Customers** browse, search, wishlist, and purchase products through a premium storefront.
- **Sellers** manage their product catalogue, view incoming orders, and track sales analytics.
- **Admins** oversee the entire platform — users, sellers, orders, coupons, and banners.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Recharts |
| **Backend** | Spring Boot 3.2, Java 21, Spring Data JPA |
| **Database** | MySQL 8.0 (Railway hosted) |
| **ORM** | Hibernate 6, HikariCP connection pool |
| **Styling** | Vanilla CSS with CSS custom properties (design tokens) |
| **Icons** | Lucide React |
| **Charts** | Recharts 3.9 |
| **Build** | Maven Wrapper (`./mvnw`) |

---

## Project Structure

```
ARC_e_commerce/
├── backend/                         # Spring Boot application
│   ├── src/main/java/com/arccart/
│   │   ├── entity/                  # JPA entities (27 tables)
│   │   ├── repository/              # Spring Data JPA repos
│   │   ├── service/                 # Business logic
│   │   ├── controller/              # REST controllers
│   │   ├── dto/                     # Request/Response DTOs
│   │   └── exception/               # Global error handling
│   └── src/main/resources/
│       └── application.properties   # Configuration
├── frontend/                        # React + Vite application
│   └── src/
│       ├── components/
│       │   ├── layout/              # PublicLayout, DashboardLayout
│       │   └── ui/                  # Shared UI components
│       ├── hooks/                   # Custom React hooks
│       └── pages/
│           ├── public/              # Customer-facing pages
│           ├── admin/               # Admin dashboard pages
│           └── seller/              # Seller dashboard pages
└── database/
    └── schema.sql                   # Full MySQL DDL + seed data
```

---

## Features

### 🛒 Customer Storefront
- **Homepage** — Hero banners carousel, categories grid, featured products
- **Product Listing** — Filter by category, price range, sort options
- **Product Detail** — Multi-image gallery, variant selection (Size/Color), trust badges
- **Global Search** — Debounced autocomplete with trending suggestions
- **Cart** — Add/remove items, quantity control, Save for Later
- **Wishlist** — Save products, in-stock indicator, move to cart
- **Compare** — Side-by-side product attribute comparison table
- **Checkout Flow** — 3-step: Address → Review + Coupon → Payment
- **Coupon Engine** — PERCENTAGE, FIXED, category-based, expiry-based
- **Orders** — History with expandable cards, colour-coded statuses, cancel
- **Invoice Download** — Text-based invoice (PDF-ready architecture)

### 🏪 Seller Dashboard (`/seller/dashboard`)
- Revenue and orders bar/line charts (Recharts)
- Low-stock inventory alerts
- Order management table with inline status update
- Product manager (CRUD)

### 🔧 Admin Dashboard (`/admin/dashboard`)
- Platform KPIs — Revenue, Users, Orders, Products
- Revenue bar chart + Orders pie chart
- Top sellers leaderboard

### 🔔 Smart Features
- **Notification Center** — Bell icon with unread badge, typed notifications
- **Dark / Light Mode** — Toggle persisted in `localStorage`
- **Recently Viewed** — `useRecentlyViewed` hook backed by `localStorage`
- **Product Recommendations** — Reusable component (rule-based, any data source)
- **Product Sharing** — WhatsApp, Twitter/X, clipboard copy

---

## Quick Start (Local)

### Prerequisites

| Tool | Version |
|---|---|
| Java (JDK) | 21+ |
| Maven | 3.9+ (or use `./mvnw`) |
| Node.js | 18+ |
| MySQL | 8.0+ |

---

## Environment Variables

Create a `.env` file in `backend/src/main/resources/` **or** set them as system environment variables:

```env
# MySQL
DATABASE_URL=jdbc:mysql://localhost:3306/arccart_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password

# Email (Gmail SMTP — generate an App Password)
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=your-app-password

# Frontend origin (for CORS)
FRONTEND_URL=http://localhost:5173
```

---

## Database Setup

```sql
-- Run once in MySQL
mysql -u root -p < database/schema.sql
```

This creates:
- `arccart_db` database with full schema (27 tables)
- Seed data for Categories, Banners, and Coupons

> **Note:** `spring.jpa.hibernate.ddl-auto=update` will auto-maintain schema during development.

---

## Running the Application

### Backend (Spring Boot)

```powershell
cd backend

# Windows
.\mvnw.cmd spring-boot:run

# Mac / Linux
./mvnw spring-boot:run
```

Backend runs at → `http://localhost:8080`

### Frontend (React + Vite)

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## API Reference

| Module | Base Path | Description |
|---|---|---|
| Categories | `GET /api/categories` | All categories |
| Products | `GET /api/products` | List / search products |
| Banners | `GET /api/banners/active` | Active storefront banners |
| Cart | `GET/POST/PUT/DELETE /api/cart` | Cart CRUD |
| Wishlist | `GET/POST/DELETE /api/wishlist` | Wishlist management |
| Addresses | `GET/POST/PUT/DELETE /api/addresses` | Address book |
| Coupons | `POST /api/coupons/validate` | Coupon validation |
| Orders | `POST /api/orders/checkout` | Place order |
| My Orders | `GET /api/my-orders` | Customer order history |
| Invoice | `GET /api/my-orders/{num}/invoice` | Download invoice |
| Notifications | `GET /api/notifications` | User notifications |
| Seller Stats | `GET /api/seller/stats` | Seller KPIs |
| Admin Stats | `GET /api/admin/stats` | Platform KPIs |
| Search | `GET /api/search?q=` | Global product search |
| Autocomplete | `GET /api/search/autocomplete?q=` | Autocomplete suggestions |

---

## Deployment (Railway)

### Backend on Railway

1. Push the repo to GitHub.
2. Create a new **Railway** project → **Deploy from GitHub repo**.
3. Set the **Root Directory** to `backend/`.
4. Add the following **environment variables** in Railway dashboard:
   - `DATABASE_URL` — Railway MySQL connection string
   - `DATABASE_USERNAME` / `DATABASE_PASSWORD`
   - `MAIL_USERNAME` / `MAIL_PASSWORD`
5. Railway will auto-detect Spring Boot and build using Maven.

### Frontend on Vercel / Netlify

```bash
cd frontend
npm run build      # Creates dist/
```

Upload `dist/` to **Vercel** or **Netlify**, and set the environment variable:

```env
VITE_API_BASE_URL=https://your-railway-backend.up.railway.app
```

---

## Design System

The UI is built on a custom **CSS Design Token** system in `frontend/src/index.css`:
- **Brand Colors** — Indigo (`#4F46E5`) / Cyan (`#06B6D4`)
- **Typography** — Inter (body), Outfit (headings)
- **Spacing** — 8px grid (`--space-1` to `--space-24`)
- **Dark Mode** — Full token overrides under `[data-theme="dark"]`
- **Shadows**, **Radius**, **Animation** — All tokenised

---

## License

This project is proprietary software developed for ARC CART Technologies Pvt. Ltd.

---

*Built with ❤️ in India*
