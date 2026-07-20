import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicLayout from './components/layout/PublicLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import ProductListingPage from './pages/public/ProductListingPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import CartPage from './pages/public/CartPage';
import WishlistPage from './pages/public/WishlistPage';
import CheckoutAddressPage from './pages/public/CheckoutAddressPage';
import CheckoutReviewPage from './pages/public/CheckoutReviewPage';
import CheckoutPaymentPage from './pages/public/CheckoutPaymentPage';
import OrderHistoryPage from './pages/public/OrderHistoryPage';
import OrderDetailPage from './pages/public/OrderDetailPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import ProfilePage from './pages/public/ProfilePage';
import SettingsPage from './pages/public/SettingsPage';
import NotificationsPage from './pages/public/NotificationsPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import NotFoundPage from './pages/public/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public Storefront Layout */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductListingPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    
                    {/* Checkout Pages */}
                    <Route path="/checkout/address" element={<CheckoutAddressPage />} />
                    <Route path="/checkout/review" element={<CheckoutReviewPage />} />
                    <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />

                    {/* Order Tracking */}
                    <Route path="/orders" element={<OrderHistoryPage />} />
                    <Route path="/order/:id" element={<OrderDetailPage />} />

                    {/* User Pages */}
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                  </Route>

                  {/* Auth Pages (standalone layouts) */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  {/* 404 Catch-All */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
