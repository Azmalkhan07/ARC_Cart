import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSubmitted(true);
      toast.success('Password reset link sent to your email!');
    } catch (err) {
      toast.error(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060d18', color: '#e2e8f0', padding: '1.5rem' }}>
      {/* Glow background */}
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(30,144,255,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          maxWidth: '440px', width: '100%',
          background: 'rgba(13,27,53,0.8)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(30,144,255,0.2)', borderRadius: '24px',
          padding: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          position: 'relative', zIndex: 10
        }}
      >
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = '#1e90ff'}
          onMouseLeave={e => e.target.style.color = '#64748b'}
        >
          <FiArrowLeft size={16} /> Back to Login
        </Link>

        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(52,211,153,0.15)', border: '2.5px solid rgba(52,211,153,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#34d399', fontSize: '28px', margin: '0 auto 1.5rem'
            }}>
              <FiCheck />
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: 'white', margin: '0 0 10px 0' }}>Check your email</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              We've sent a password reset link to <span style={{ color: '#1e90ff', fontWeight: '600' }}>{email}</span>. Click the link in the email to reset your password.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                background: 'transparent', border: '1px solid rgba(30,144,255,0.3)',
                color: '#1e90ff', fontWeight: '600', padding: '0.75rem 1.5rem',
                borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(30,144,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Resend Link
            </button>
          </div>
        ) : (
          <div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: 'white', margin: '0 0 6px 0' }}>Forgot Password?</h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5, margin: '0 0 2rem 0' }}>
              No worries! Enter your email address below, and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>EMAIL ADDRESS</label>
                <div style={{ position: 'relative' }}>
                  <FiMail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    style={{
                      width: '100%', background: 'rgba(10,22,40,0.8)',
                      border: '1.5px solid rgba(30,144,255,0.2)', borderRadius: '10px',
                      color: 'white', padding: '0.75rem 1rem 0.75rem 2.75rem',
                      fontSize: '0.875rem', outline: 'none', transition: 'all 0.3s',
                      fontFamily: 'Inter, sans-serif'
                    }}
                    onFocus={e => { e.target.style.borderColor = '#1e90ff'; e.target.style.boxShadow = '0 0 0 3px rgba(30,144,255,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(30,144,255,0.2)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #1e90ff 0%, #1565c0 100%)',
                  color: 'white', fontWeight: '700', padding: '0.875rem',
                  borderRadius: '10px', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem',
                  boxShadow: '0 4px 15px rgba(30,144,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                {loading ? 'Sending link...' : 'Send Reset Link'}
              </motion.button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
