import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060d18', color: '#e2e8f0', padding: '1.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <motion.h1
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '8rem', fontWeight: '900', margin: 0,
            background: 'linear-gradient(135deg, #1e90ff 0%, #00b4ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}
        >
          404
        </motion.h1>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: 'white', marginTop: '-10px', marginBottom: '12px' }}>
          Lost in Space?
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" style={{
          display: 'inline-block', background: 'linear-gradient(135deg, #1e90ff, #1565c0)',
          color: 'white', fontWeight: '700', padding: '0.875rem 2rem', borderRadius: '12px',
          textDecoration: 'none', fontSize: '0.9375rem', boxShadow: '0 4px 15px rgba(30,144,255,0.3)'
        }}>
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
