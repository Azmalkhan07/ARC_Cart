import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiCheck, FiMapPin, FiEdit2, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

const CheckoutAddressPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [addresses, setAddresses] = useState([
    {
      id: 1, fullName: 'John Doe', phone: '9876543210', 
      streetAddress: '123 Tech Park, Phase 1', landmark: 'Near Metro Station',
      city: 'Bangalore', state: 'Karnataka', pincode: '560001',
      addressType: 'HOME', isDefault: true
    },
    {
      id: 2, fullName: 'John Doe (Office)', phone: '9876543210', 
      streetAddress: '456 Business Avenue, Floor 4', landmark: '',
      city: 'Bangalore', state: 'Karnataka', pincode: '560034',
      addressType: 'WORK', isDefault: false
    }
  ]);
  
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContinue = () => {
    toast.success('Address selected!');
    navigate('/checkout/review');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0', minHeight: '80vh' }}>
      
      {/* Checkout Steps */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(30,144,255,0.1)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1e90ff' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1e90ff', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px', boxShadow: '0 0 15px rgba(30,144,255,0.4)' }}>1</div>
          <span style={{ fontSize: '0.8125rem', fontWeight: '700' }}>Address</span>
        </div>
        <div style={{ flex: 1, height: '2px', background: 'rgba(30,144,255,0.1)', margin: '0 1rem' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748b' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>2</div>
          <span style={{ fontSize: '0.8125rem' }}>Review</span>
        </div>
        <div style={{ flex: 1, height: '2px', background: 'rgba(30,144,255,0.1)', margin: '0 1rem' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748b' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>3</div>
          <span style={{ fontSize: '0.8125rem' }}>Payment</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: 'white', margin: 0 }}>Select Delivery Address</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>Choose where we should deliver your smart shopping cart.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '8px 16px', background: 'transparent', color: '#1e90ff', border: '1px dashed #1e90ff', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.875rem' }}>
          <FiPlus /> Add New Address
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
        {addresses.map(addr => (
          <div 
            key={addr.id}
            onClick={() => setSelectedAddressId(addr.id)}
            style={{ 
              padding: '1.5rem', 
              background: selectedAddressId === addr.id ? 'rgba(30,144,255,0.08)' : 'rgba(13,27,53,0.5)', 
              border: selectedAddressId === addr.id ? '2px solid #1e90ff' : '1px solid rgba(30,144,255,0.1)', 
              borderRadius: '16px', 
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s',
              boxShadow: selectedAddressId === addr.id ? '0 0 20px rgba(30,144,255,0.1)' : 'none'
            }}>
            
            {selectedAddressId === addr.id && (
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#1e90ff' }}>
                <FiCheck size={20} />
              </div>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className={`badge-arc ${addr.addressType === 'HOME' ? 'badge-arc-blue' : 'badge-arc-green'}`}>{addr.addressType}</span>
              <h3 style={{ margin: 0, fontSize: '1.125rem', color: 'white' }}>{addr.fullName}</h3>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{addr.phone}</span>
            </div>
            
            <p style={{ margin: '0 0 1rem 0', color: '#94a3b8', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9375rem', lineHeight: 1.5 }}>
              <FiMapPin style={{ marginTop: '4px', flexShrink: 0, color: '#1e90ff' }} />
              <span>{addr.streetAddress}{addr.landmark ? ', ' + addr.landmark : ''}, {addr.city}, {addr.state} - {addr.pincode}</span>
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ background: 'none', border: 'none', color: '#1e90ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600', padding: 0, fontSize: '0.8125rem' }}><FiEdit2 /> Edit</button>
              <button style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600', padding: 0, fontSize: '0.8125rem' }}><FiTrash2 /> Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleContinue}
          style={{
            background: 'linear-gradient(135deg, #1e90ff, #1565c0)', color: 'white',
            border: 'none', borderRadius: '12px', padding: '0.875rem 2rem', fontSize: '1rem',
            fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 15px rgba(30,144,255,0.3)'
          }}
        >
          Deliver to this Address <FiArrowRight />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(6,13,24,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(10px)' }}>
          <div style={{ background: 'rgba(13,27,53,0.95)', border: '1px solid rgba(30,144,255,0.2)', padding: '2rem', borderRadius: '24px', width: '90%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'white', fontFamily: 'Outfit, sans-serif' }}>Add New Address</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <input type="text" placeholder="Full Name" className="input-arc" />
              <input type="text" placeholder="Phone Number" className="input-arc" />
            </div>
            <input type="text" placeholder="Street Address" className="input-arc" style={{ marginBottom: '12px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
              <input type="text" placeholder="City" className="input-arc" />
              <input type="text" placeholder="Pincode" className="input-arc" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: '#1e90ff', color: 'white', cursor: 'pointer', fontWeight: '700' }}>Save Address</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutAddressPage;
