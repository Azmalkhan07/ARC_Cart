import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem 1.5rem', background: '#060d18', color: '#e2e8f0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '3rem', fontWeight: '900', color: 'white', margin: 0 }}>
          About <span className="text-arc-gradient">ARC CART</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.125rem', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0' }}>
          Discover the vision behind India's most modern and futuristic e-commerce marketplace.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: 'white', marginBottom: '1rem' }}>
            Our Mission
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            At ARC CART, we believe in the power of technology to simplify life. We started with a single, clear goal: to create a premium e-commerce ecosystem that matches lightning-fast performance with a beautiful visual experience.
          </p>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>
            No clutter. No compromises. Only authentic, premium products directly sourced from verified sellers and delivered securely to your doorstep.
          </p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(30,144,255,0.08) 0%, rgba(0,180,255,0.05) 100%)',
          border: '1px solid rgba(30,144,255,0.2)', borderRadius: '24px', padding: '2.5rem', textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
          <h3 style={{ color: 'white', fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: '700', margin: '0 0 8px 0' }}>Smart Recommendations</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0, lineHeight: 1.6 }}>
            Our system learns your preferences dynamically to present you with customized product choices without invasive tracking.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', background: 'rgba(13,27,53,0.3)', border: '1px solid rgba(30,144,255,0.12)', borderRadius: '24px', padding: '3rem 2rem' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: 'white', marginBottom: '1rem' }}>
          Crafted for the Future
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto 2rem' }}>
          Built with React.js, Tailwind CSS, Framer Motion, and Supabase security infrastructure. ARC CART offers seamless session persistence and high-performance layouts.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Fast Delivery', val: '2-4 Days' },
            { label: 'Product Range', val: '50,000+' },
            { label: 'Secure Payments', val: '100% Safe' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1e90ff', fontFamily: 'Outfit, sans-serif' }}>{stat.val}</div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
