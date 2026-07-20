import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

const ContactPage = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Your message has been sent successfully!');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem 1.5rem', background: '#060d18', color: '#e2e8f0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '3rem', fontWeight: '900', color: 'white', margin: 0 }}>
          Contact <span className="text-arc-gradient">ARC CART</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.125rem', marginTop: '12px' }}>
          Have any questions? We would love to hear from you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
        {/* Left Side: Contact Form */}
        <div style={{
          background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.1)',
          borderRadius: '24px', padding: '2.5rem'
        }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: 'white', marginBottom: '1.5rem' }}>
            Send Us a Message
          </h2>
          
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
                <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.25rem', margin: '0 0 8px 0' }}>Thank You!</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>We've received your query and will get back to you shortly.</p>
              </motion.div>
            ) : (
              <motion.form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>NAME</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your Name" className="input-arc" />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>EMAIL</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Your Email" className="input-arc" />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>MESSAGE</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={4} placeholder="How can we help you?" className="input-arc" style={{ resize: 'none' }} />
                </div>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #1e90ff, #1565c0)', color: 'white',
                    border: 'none', borderRadius: '12px', padding: '0.875rem', fontWeight: '700',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 4px 15px rgba(30,144,255,0.3)', marginTop: '0.5rem'
                  }}
                >
                  <FiSend /> Send Message
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
          {[
            { label: 'Primary Headquarters', text: '100, Outer Ring Road, Manyata Tech Park, Bangalore, Karnataka, 560045', icon: <FiMapPin /> },
            { label: 'Customer Helpline', text: '+91 80 4567 8900 (Mon-Sat, 9AM-6PM)', icon: <FiPhone /> },
            { label: 'Email Support', text: 'support@arccart.in', icon: <FiMail /> },
          ].map(info => (
            <div key={info.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(30,144,255,0.08)', border: '1px solid rgba(30,144,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e90ff', fontSize: '18px', flexShrink: 0
              }}>
                {info.icon}
              </div>
              <div>
                <h4 style={{ color: 'white', fontWeight: '700', fontSize: '0.9375rem', margin: '0 0 4px 0' }}>{info.label}</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0, lineHeight: 1.6 }}>{info.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
