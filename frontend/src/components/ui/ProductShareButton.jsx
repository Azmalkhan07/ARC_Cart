import React, { useState } from 'react';
import { Share2, Link2, MessageCircle, Twitter, Check } from 'lucide-react';

const ProductShareButton = ({ productName, productUrl }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = productUrl || window.location.href;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Copy failed');
    }
  };

  const shareOptions = [
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366',
      action: () => window.open('https://wa.me/?text=' + encodeURIComponent('Check out ' + productName + ' on ARC CART: ' + url), '_blank')
    },
    {
      label: 'Twitter / X',
      icon: Twitter,
      color: '#1DA1F2',
      action: () => window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('Check out ' + productName + ' on ARC CART!') + '&url=' + encodeURIComponent(url), '_blank')
    },
    {
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? Check : Link2,
      color: copied ? '#059669' : 'var(--color-text-muted)',
      action: copyLink
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: '1px solid var(--color-border-base)', borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
        <Share2 size={16} /> Share
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
          <div style={{
            position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden',
            zIndex: 50,
            minWidth: '180px',
          }}>
            {shareOptions.map(opt => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.label}
                  onClick={() => { opt.action(); if (opt.label !== 'Copy Link') setOpen(false); }}
                  style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer', textAlign: 'left', fontSize: 'var(--text-sm)', borderBottom: '1px solid var(--color-border-subtle)', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <Icon size={16} color={opt.color} />
                  <span style={{ color: opt.color, fontWeight: 500 }}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductShareButton;
