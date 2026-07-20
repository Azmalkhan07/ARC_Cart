import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiMoon, FiBell, FiShield, FiHelpCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const SettingsPage = () => {
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0', minHeight: '80vh' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: '800', color: 'white', margin: 0 }}>
          Account Settings
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
          Customize your preferences and secure your account.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }} className="md:grid-cols-[280px_1fr]">
        {/* Navigation Sidebar */}
        <aside style={{
          background: 'rgba(13,27,53,0.7)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(30,144,255,0.15)', borderRadius: '20px',
          padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px'
        }}>
          {[
            { label: 'Profile Information', icon: <FiUser />, to: '/profile' },
            { label: 'My Orders', icon: <FiPackage />, to: '/orders' },
            { label: 'Wishlist', icon: <FiHeart />, to: '/wishlist' },
            { label: 'Settings', icon: <FiSettings />, active: true, to: '/settings' },
          ].map(item => (
            <Link
              key={item.label}
              to={item.to}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 16px', borderRadius: '10px', textDecoration: 'none',
                color: item.active ? '#1e90ff' : '#94a3b8',
                background: item.active ? 'rgba(30,144,255,0.12)' : 'transparent',
                fontWeight: '600', fontSize: '0.875rem', transition: 'all 0.2s'
              }}
            >
              {item.icon} {item.label}
            </Link>
          ))}
          <button
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px', borderRadius: '10px', border: 'none',
              background: 'transparent', color: '#f87171',
              fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer',
              textAlign: 'left', marginTop: '1.5rem', width: '100%'
            }}
          >
            <FiLogOut /> Logout Account
          </button>
        </aside>

        {/* Content Area */}
        <main style={{
          background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.1)',
          borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'
        }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: '800', color: 'white', margin: 0 }}>
            Preferences
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Theme Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6,13,24,0.5)', border: '1px solid rgba(30,144,255,0.08)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#1e90ff', fontSize: '1.25rem' }}><FiMoon /></span>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '700', fontSize: '0.9375rem', margin: 0 }}>Dark Mode</h4>
                  <p style={{ color: '#64748b', fontSize: '0.8125rem', margin: '2px 0 0 0' }}>Reduce glare and improve battery life.</p>
                </div>
              </div>
              <input type="checkbox" checked={isDark} onChange={toggleTheme} style={{ accentColor: '#1e90ff', width: '18px', height: '18px', cursor: 'pointer' }} />
            </div>

            {/* Notifications Preferences */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6,13,24,0.5)', border: '1px solid rgba(30,144,255,0.08)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#1e90ff', fontSize: '1.25rem' }}><FiBell /></span>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '700', fontSize: '0.9375rem', margin: 0 }}>Push Notifications</h4>
                  <p style={{ color: '#64748b', fontSize: '0.8125rem', margin: '2px 0 0 0' }}>Receive alerts about orders and price drops.</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked style={{ accentColor: '#1e90ff', width: '18px', height: '18px', cursor: 'pointer' }} />
            </div>

            {/* Security Settings */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6,13,24,0.5)', border: '1px solid rgba(30,144,255,0.08)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#1e90ff', fontSize: '1.25rem' }}><FiShield /></span>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '700', fontSize: '0.9375rem', margin: 0 }}>Two-Factor Authentication</h4>
                  <p style={{ color: '#64748b', fontSize: '0.8125rem', margin: '2px 0 0 0' }}>Add an extra layer of security to your account.</p>
                </div>
              </div>
              <button style={{ background: 'rgba(30,144,255,0.12)', border: '1px solid rgba(30,144,255,0.3)', color: '#1e90ff', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: '600', cursor: 'pointer' }}>Enable</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
