import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const LoginPage = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', background: '#060d18', color: '#e2e8f0' }}>
      {/* Brand panel */}
      <div className="hidden md:flex" style={{
        background: 'linear-gradient(135deg, #020b18 0%, #0a1628 50%, #0d1b35 100%)',
        flexDirection: 'column', justifyContent: 'center', padding: '3rem',
        borderRight: '1px solid rgba(30,144,255,0.15)', position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(30,144,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#1e90ff', marginBottom: '2.5rem' }}>
            <FiArrowLeft size={16} /> Back to Store
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #1e90ff 0%, #00b4ff 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', boxShadow: '0 0 20px rgba(30,144,255,0.4)',
            }}>🛒</div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: '800', margin: 0, background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ARC CART</h1>
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: '900', lineHeight: 1.2, margin: '0 0 1.25rem 0', color: 'white' }}>
            The Future of <span className="text-arc-gradient">Smart Shopping</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '400px' }}>
            Experience next-generation e-commerce with real-time recommendations, custom lists, and rapid checkout.
          </p>
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            {[{ num: '50k+', label: 'Products' }, { num: '2M+', label: 'Happy Customers' }].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: '#1e90ff' }}>{stat.num}</div>
                <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(1.5rem, 5vw, 4rem)', position: 'relative' }}>
        {/* Back button on mobile */}
        <Link to="/" className="flex md:hidden" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#64748b', marginBottom: '2rem', fontSize: '0.875rem' }}>
          <FiArrowLeft size={16} /> Back to Store
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}
        >
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: '800', color: 'white', margin: '0 0 6px 0' }}>Welcome Back</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 2rem 0' }}>Please log in to your account to continue shopping.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email */}
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

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '600' }}>PASSWORD</label>
                <Link to="/forgot-password" style={{ color: '#1e90ff', fontSize: '0.8125rem', textDecoration: 'none', fontWeight: '500' }}>Forgot Password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <FiLock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" id="remember" style={{ accentColor: '#1e90ff' }} />
              <label htmlFor="remember" style={{ color: '#64748b', fontSize: '0.8125rem', cursor: 'pointer' }}>Keep me logged in for 30 days</label>
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #1e90ff 0%, #1565c0 100%)',
                color: 'white', fontWeight: '700', padding: '0.875rem',
                borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem',
                marginTop: '0.5rem', boxShadow: '0 4px 15px rgba(30,144,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </motion.button>
          </form>

          {/* Register Link */}
          <p style={{ color: '#64748b', fontSize: '0.875rem', textAlign: 'center', marginTop: '2rem' }}>
            Don't have an account? <Link to="/register" style={{ color: '#1e90ff', textDecoration: 'none', fontWeight: '600' }}>Register Here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
