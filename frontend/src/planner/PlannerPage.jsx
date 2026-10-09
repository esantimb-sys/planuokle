import React, { useState, useEffect } from 'react';

export default function PlannerPage() {
  const [thanksCount, setThanksCount] = useState(() => {
    const saved = localStorage.getItem('planner_thanks_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    localStorage.setItem('planner_thanks_count', thanksCount);
  }, [thanksCount]);

  const handleThanksClick = () => {
    setThanksCount(prev => prev + 1);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', position: 'relative' }}>
      {/* Toast pranešimas */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#10B981',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          fontWeight: 'bold',
          animation: 'fadeInOut 0.3s ease'
        }}>
          Ačiū už palaikymą! ❤️
        </div>
      )}

      {/* Planuoklės viršus su naujuoju mygtuku */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#1F2937' }}>
          Mano Planuoklė
        </h1>
        
        <button
          onClick={handleThanksClick}
          style={{
            display: 'flex',
            alignItem: 'center',
            gap: '8px',
            backgroundColor: '#F3F4F6',
            border: '1px solid #D1D5DB',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            color: '#374151',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
        >
          <span>Ačiū</span>
          <span style={{
            backgroundColor: '#EF4444',
            color: '#white',
            padding: '2px 6px',
            borderRadius: '12px',
            fontSize: '12px',
            color: '#fff'
          }}>
            {thanksCount}
          </span>
        </button>
      </div>

      {/* Pagrindinis planuoklės turinys */}
      <div style={{ backgroundColor: '#F9FAFB', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
        <p style={{ color: '#4B5563', fontSize: '16px' }}>
          Čia yra jūsų pagrindinė planuoklės erdvė. Visi duomenys sėkmingai kraunasi.
        </p>
      </div>
    </div>
  );
}
