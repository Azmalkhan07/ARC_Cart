// ARC CART – Utility Formatters

/**
 * Format price in Indian Rupee format
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined) return '';
  return `₹${Number(price).toLocaleString('en-IN')}`;
};

/**
 * Calculate discount percentage
 */
export const calcDiscount = (basePrice, sellingPrice) => {
  if (!basePrice || !sellingPrice || basePrice <= sellingPrice) return 0;
  return Math.round(((basePrice - sellingPrice) / basePrice) * 100);
};

/**
 * Format date in readable format
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Format compact number (1.2k, 1.4M etc.)
 */
export const formatCompact = (num) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
  return String(num);
};

/**
 * Clamp text to a max length
 */
export const truncate = (str, maxLen = 50) => {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
};

/**
 * Get order status color/label
 */
export const getOrderStatus = (status) => {
  const map = {
    PENDING: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
    PROCESSING: { label: 'Processing', color: '#1e90ff', bg: 'rgba(30,144,255,0.15)' },
    SHIPPED: { label: 'Shipped', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
    DELIVERED: { label: 'Delivered', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
    CANCELLED: { label: 'Cancelled', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
    RETURNED: { label: 'Returned', color: '#64748b', bg: 'rgba(100,116,139,0.15)' },
  };
  return map[status] || { label: status, color: '#94a3b8', bg: 'rgba(148,163,184,0.15)' };
};

/**
 * Generate star array for rating display
 */
export const getStars = (rating) => {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push('full');
    else if (i === full && half) stars.push('half');
    else stars.push('empty');
  }
  return stars;
};
