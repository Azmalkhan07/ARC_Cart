import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const getPasswordStrength = () => {
    if (!password) return { text: 'Empty', color: '#475569', percent: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 1) return { text: 'Weak', color: '#f87171', percent: 25 };
    if (score === 2) return { text: 'Medium', color: '#fbbf24', percent: 50 };
    if (score === 3) return { text: 'Strong', color: '#34d399', percent: 75 };
    return { text: 'Very Strong', color: '#059669', percent: 100 };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (!agreeTerms) {
      toast.error('You must agree to the Terms of Service & Privacy Policy');
      return;
    }
    
    setLoading(true);
    try {
      await register(email, password, fullName);
      toast.success('Registration initiated!');
      setVerificationSent(true);
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060d18', color: '#e2e8f0', padding: '1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            maxWidth: '460px', width: '100%',
            background: 'rgba(13,27,53,0.85)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(30,144,255,0.2)', borderRadius: '24px',
            padding: '2.5rem', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(52,211,153,0.15)', border: '2.5px solid rgba(52,211,153,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#34d399', fontSize: '28px', margin: '0 auto 1.5rem'
          }}>
            <FiCheck />
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: 'white', margin: '0 0 10px 0' }}>Verify your Email</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            We've sent a verification link to <span style={{ color: '#1e90ff', fontWeight: '600' }}>{email}</span>. Please check your inbox and click the link to activate your account.
          </p>
          <Link to="/login" style={{
            display: 'inline-block', background: 'linear-gradient(135deg, #1e90ff, #1565c0)',
            color: 'white', fontWeight: '700', padding: '0.875rem 2rem', borderRadius: '12px',
            textDecoration: 'none', fontSize: '0.9375rem', transition: 'all 0.2s',
            boxShadow: '0 4px 15px rgba(30,144,255,0.3)'
          }}>
            Proceed to Login
          </Link>
        </motion.div>
      </div>
    );
  }

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
            Join the Smart Shopping <span className="text-arc-gradient">Evolution</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '400px' }}>
            Create an account to save wishlist items, track orders, get customized recommendations, and shop easily.
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
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: '800', color: 'white', margin: '0 0 6px 0' }}>Create Account</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 2rem 0' }}>Get access to premium features and swift checkout.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Full Name */}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>FULL NAME</label>
              <div style={{ position: 'relative' }}>
                <FiUser size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="John Doe"
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
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>PASSWORD</label>
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

              {/* Password strength indicator */}
              {password && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>
                    <span>Strength</span>
                    <span style={{ color: strength.color, fontWeight: '700' }}>{strength.text}</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${strength.percent}%`, height: '100%', background: strength.color, transition: 'all 0.3s' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>CONFIRM PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <FiLock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
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
              </div>
            </div>

            {/* Terms checkbox */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                style={{ accentColor: '#1e90ff', marginTop: '3px' }}
              />
              <label htmlFor="terms" style={{ color: '#64748b', fontSize: '0.8125rem', cursor: 'pointer', lineHeight: 1.4 }}>
                I agree to the <span style={{ color: '#1e90ff', fontWeight: '600' }}>Terms of Service</span> & <span style={{ color: '#1e90ff', fontWeight: '600' }}>Privacy Policy</span>
              </label>
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          {/* Login Link */}
          <p style={{ color: '#64748b', fontSize: '0.875rem', textAlign: 'center', marginTop: '2rem' }}>
            Already have an account? <Link to="/login" style={{ color: '#1e90ff', textDecoration: 'none', fontWeight: '600' }}>Log In Here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
