import React, { useState } from 'react';
import Logo from './Logo';

const Checkout = ({ course, onConfirmPurchase, onCancel }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirm = () => {
        setIsProcessing(true);
        // Simulate network delay
        setTimeout(() => {
            onConfirmPurchase(course.id);
        }, 1500);
    };

    if (!course) return null;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
            {/* Header */}
            <header style={{ padding: '15px 40px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center' }}>
                <Logo />
            </header>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '800px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', display: 'flex', overflow: 'hidden' }}>
                    
                    {/* Left: Course Details */}
                    <div style={{ flex: '1', backgroundColor: '#0f172a', color: 'white', padding: '40px', display: 'flex', flexDirection: 'column' }}>
                        <p style={{ margin: '0 0 10px 0', color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Summary</p>
                        <div style={{ width: '100%', height: '180px', backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px', marginBottom: '20px' }}></div>
                        <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', lineHeight: '1.3' }}>{course.title}</h2>
                        <p style={{ margin: '0 0 20px 0', color: '#cbd5e1' }}>By {course.instructor}</p>
                        
                        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Total Amount</span>
                            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#10b981' }}>₹{course.price || 4999}</span>
                        </div>
                    </div>

                    {/* Right: Payment Method */}
                    <div style={{ flex: '1.2', padding: '40px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a' }}>Payment</h2>
                            <button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                                <i className='bx bx-x' style={{ fontSize: '1.2rem' }}></i> Cancel
                            </button>
                        </div>
                        
                        <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '12px', border: '2px solid #4f46e5', position: 'relative', marginBottom: '40px' }}>
                            <div style={{ position: 'absolute', top: '-12px', right: '15px', backgroundColor: '#4f46e5', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                Selected Method
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', fontSize: '1.5rem' }}>
                                    <i className='bx bx-money'></i>
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.1rem' }}>Cash on Delivery (COD)</h3>
                                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>Pay directly when you get access.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#fffbeb', color: '#d97706', padding: '15px', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '40px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <i className='bx bx-info-circle' style={{ fontSize: '1.2rem', marginTop: '2px' }}></i>
                            <span>Online payment gateways (like Razorpay) are currently disabled. Please use COD for this transaction.</span>
                        </div>

                        <button 
                            onClick={handleConfirm}
                            disabled={isProcessing}
                            style={{ 
                                width: '100%', padding: '16px', backgroundColor: isProcessing ? '#94a3b8' : '#4f46e5', 
                                color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', 
                                fontSize: '1.1rem', cursor: isProcessing ? 'not-allowed' : 'pointer', 
                                transition: 'all 0.2s', marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
                            }}
                        >
                            {isProcessing ? (
                                <>
                                    <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '1.5rem' }}></i> Processing...
                                </>
                            ) : (
                                `Confirm Purchase (₹${course.price || 4999})`
                            )}
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Checkout;
