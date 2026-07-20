import { useState, useEffect } from 'react';

const MAX_ITEMS = 8;
const STORAGE_KEY = 'arc_recently_viewed';

export const useRecentlyViewed = () => {
  const [viewed, setViewed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const recordView = (product) => {
    setViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { viewed, recordView };
};
