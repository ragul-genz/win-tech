import React, { useState } from 'react';

const VerificationPage = ({ onNavigate }) => {
    const [certId, setCertId] = useState('');
    const [status, setStatus] = useState(null); // null | 'valid' | 'revoked' | 'not_found'

    const handleVerify = (e) => {
        e.preventDefault();
        
        // Mock verification logic
        if (!certId.trim()) return;

        if (certId.toUpperCase().includes('REVOKED')) {
            setStatus('revoked');
        } else if (certId.toUpperCase().startsWith('CERT-') || certId.toUpperCase().includes('WIN')) {
            setStatus('valid');
        } else {
            setStatus('not_found');
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ position: 'absolute', top: '20px', left: '40px', cursor: 'pointer' }} onClick={() => onNavigate('home')}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a', fontWeight: '800' }}>LOGO</h1>
            </div>

            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <i className='bx bx-check-shield' style={{ fontSize: '4rem', color: '#4f46e5', marginBottom: '20px' }}></i>
                <h2 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '1.8rem' }}>Verify Certificate</h2>
                <p style={{ margin: '0 0 30px 0', color: '#64748b' }}>Enter the Certificate ID to check its authenticity and validity.</p>

                <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="text" 
                        placeholder="e.g. CERT-2026-000921"
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                        style={{ padding: '15px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1.1rem', textAlign: 'center', textTransform: 'uppercase' }}
                    />
                    <button type="submit" style={{ padding: '15px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                        Verify
                    </button>
                </form>

                {status && (
                    <div style={{ marginTop: '30px', padding: '20px', borderRadius: '12px', border: '1px solid', 
                        backgroundColor: status === 'valid' ? '#f0fdf4' : status === 'revoked' ? '#fef2f2' : '#f8fafc',
                        borderColor: status === 'valid' ? '#bbf7d0' : status === 'revoked' ? '#fecaca' : '#e2e8f0'
                    }}>
                        {status === 'valid' && (
                            <>
                                <i className='bx bxs-check-circle' style={{ fontSize: '3rem', color: '#16a34a' }}></i>
                                <h3 style={{ color: '#16a34a', margin: '10px 0 5px 0' }}>Certificate Verified</h3>
                                <p style={{ color: '#0f172a', margin: 0, fontWeight: '600', fontSize: '1.1rem' }}>{certId.toUpperCase()}</p>
                                <div style={{ marginTop: '15px', textAlign: 'left', backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
                                    <p style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '0.9rem' }}>Student</p>
                                    <p style={{ margin: '0 0 10px 0', color: '#0f172a', fontWeight: '500' }}>Arun Kumar</p>
                                    <p style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '0.9rem' }}>Course</p>
                                    <p style={{ margin: '0 0 10px 0', color: '#0f172a', fontWeight: '500' }}>Full Stack Development</p>
                                    <p style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '0.9rem' }}>Status</p>
                                    <p style={{ margin: 0, color: '#16a34a', fontWeight: '600' }}>VALID</p>
                                </div>
                            </>
                        )}
                        {status === 'revoked' && (
                            <>
                                <i className='bx bxs-x-circle' style={{ fontSize: '3rem', color: '#dc2626' }}></i>
                                <h3 style={{ color: '#dc2626', margin: '10px 0 5px 0' }}>Certificate Revoked</h3>
                                <p style={{ color: '#0f172a', margin: 0, fontWeight: '600' }}>{certId.toUpperCase()}</p>
                                <p style={{ color: '#ef4444', margin: '10px 0 0 0', fontSize: '0.9rem' }}>This certificate has been revoked by the institution.</p>
                            </>
                        )}
                        {status === 'not_found' && (
                            <>
                                <i className='bx bx-search' style={{ fontSize: '3rem', color: '#64748b' }}></i>
                                <h3 style={{ color: '#64748b', margin: '10px 0 5px 0' }}>No Record Found</h3>
                                <p style={{ color: '#0f172a', margin: 0, fontWeight: '600' }}>{certId.toUpperCase()}</p>
                                <p style={{ color: '#64748b', margin: '10px 0 0 0', fontSize: '0.9rem' }}>We could not find a matching certificate in our database.</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationPage;
