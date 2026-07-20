import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg, duration) => addToast(msg, 'success', duration),
    error: (msg, duration) => addToast(msg, 'error', duration),
    info: (msg, duration) => addToast(msg, 'info', duration),
    warning: (msg, duration) => addToast(msg, 'warning', duration),
  };

  const typeStyles = {
    success: { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)', color: '#34d399', icon: '✓' },
    error: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', color: '#f87171', icon: '✕' },
    info: { bg: 'rgba(30,144,255,0.15)', border: 'rgba(30,144,255,0.4)', color: '#60a5fa', icon: 'ℹ' },
    warning: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)', color: '#fbbf24', icon: '⚠' },
  };

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 99999, display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '360px', width: '100%' }}>
        <AnimatePresence>
          {toasts.map(t => {
            const style = typeStyles[t.type] || typeStyles.info;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  background: `rgba(6,13,24,0.95)`,
                  border: `1px solid ${style.border}`,
                  borderRadius: '0.75rem',
                  padding: '0.875rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backdropFilter: 'blur(20px)',
                  boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
                  cursor: 'pointer',
                }}
                onClick={() => removeToast(t.id)}
              >
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: style.bg, border: `1px solid ${style.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: style.color, fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>
                  {style.icon}
                </span>
                <span style={{ color: '#e2e8f0', fontSize: '0.875rem', fontWeight: '500', lineHeight: 1.4 }}>{t.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export default ToastContext;
