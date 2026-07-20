import api from './api';

// ── Products ──────────────────────────────────────────────────────────────────
export const productService = {
  getAll: (params = {}) => api.get('/public/products', { params }),
  getFeatured: () => api.get('/public/products/featured'),
  getById: (id) => api.get(`/public/products/${id}`),
  search: (query, params = {}) => api.get('/public/products/search', { params: { query, ...params } }),
  // Seller
  create: (data) => api.post('/seller/products', data),
  update: (id, data) => api.put(`/seller/products/${id}`, data),
  delete: (id) => api.delete(`/seller/products/${id}`),
  getMyProducts: () => api.get('/seller/products'),
};

// ── Categories ────────────────────────────────────────────────────────────────
export const categoryService = {
  getAll: () => api.get('/public/categories'),
  getById: (id) => api.get(`/public/categories/${id}`),
  create: (data) => api.post('/admin/categories', data),
  update: (id, data) => api.put(`/admin/categories/${id}`, data),
  delete: (id) => api.delete(`/admin/categories/${id}`),
};

// ── Cart ──────────────────────────────────────────────────────────────────────
export const cartService = {
  get: () => api.get('/cart'),
  addItem: (productId, variantId, quantity) => api.post('/cart/items', { productId, variantId, quantity }),
  updateItem: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
};

// ── Orders ────────────────────────────────────────────────────────────────────
export const orderService = {
  create: (orderData) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders/history'),
  getById: (id) => api.get(`/orders/${id}`),
  cancel: (id) => api.post(`/orders/${id}/cancel`),
  // Seller
  getSellerOrders: () => api.get('/seller/orders'),
  updateStatus: (id, status) => api.put(`/seller/orders/${id}/status`, { status }),
  // Admin
  getAllOrders: (params = {}) => api.get('/admin/orders', { params }),
};

// ── Wishlist ──────────────────────────────────────────────────────────────────
export const wishlistService = {
  get: () => api.get('/wishlist'),
  add: (productId) => api.post('/wishlist', { productId }),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
};

// ── Addresses ─────────────────────────────────────────────────────────────────
export const addressService = {
  getAll: () => api.get('/addresses'),
  create: (data) => api.post('/addresses', data),
  update: (id, data) => api.put(`/addresses/${id}`, data),
  delete: (id) => api.delete(`/addresses/${id}`),
  setDefault: (id) => api.put(`/addresses/${id}/default`),
};

// ── Coupons ───────────────────────────────────────────────────────────────────
export const couponService = {
  validate: (code, cartTotal) => api.post('/coupons/validate', { code, cartTotal }),
  getAll: () => api.get('/admin/coupons'),
  create: (data) => api.post('/admin/coupons', data),
  delete: (id) => api.delete(`/admin/coupons/${id}`),
};

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminService = {
  getStats: () => api.get('/admin/dashboard/stats'),
  getUsers: () => api.get('/admin/users'),
  getSellers: () => api.get('/admin/sellers'),
  approveSeller: (id) => api.put(`/admin/sellers/${id}/approve`),
};

// ── Seller ────────────────────────────────────────────────────────────────────
export const sellerService = {
  getStats: () => api.get('/seller/dashboard/stats'),
  getProfile: () => api.get('/seller/profile'),
};

// ── Banners ───────────────────────────────────────────────────────────────────
export const bannerService = {
  getActive: () => api.get('/public/banners'),
  getAll: () => api.get('/admin/banners'),
  create: (data) => api.post('/admin/banners', data),
  delete: (id) => api.delete(`/admin/banners/${id}`),
};

// ── Notifications ─────────────────────────────────────────────────────────────
export const notificationService = {
  getMyNotifications: () => api.get('/notifications'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
};
