import React from 'react';

const ContactPage = () => {
    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 200px)' }}>
            {/* Header */}
            <div style={{ padding: '80px 40px', backgroundColor: '#0f172a', color: 'white', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', margin: '0 0 15px 0' }}>Contact Us</h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Have a question? We're here to help.</p>
            </div>

            <section style={{ padding: '80px 40px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                    
                    {/* Contact Info */}
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <h2 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 30px 0' }}>Get in Touch</h2>
                        
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                <i className='bx bx-map'></i>
                            </div>
                            <div>
                                <h3 style={{ margin: '0 0 5px 0', color: '#0f172a' }}>Our Location</h3>
                                <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6' }}>123 Tech Park, Phase 2<br/>Chennai, Tamil Nadu 600001</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                <i className='bx bx-phone'></i>
                            </div>
                            <div>
                                <h3 style={{ margin: '0 0 5px 0', color: '#0f172a' }}>Phone</h3>
                                <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6' }}>+91 98765 43210</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                <i className='bx bx-envelope'></i>
                            </div>
                            <div>
                                <h3 style={{ margin: '0 0 5px 0', color: '#0f172a' }}>Email</h3>
                                <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6' }}>support@wintech.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div style={{ flex: '1.5', minWidth: '400px', backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '0 0 25px 0' }}>Send us a Message</h2>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <input type="text" placeholder="Your Name" style={{ flex: 1, padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }} />
                                <input type="email" placeholder="Your Email" style={{ flex: 1, padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }} />
                            </div>
                            <input type="text" placeholder="Subject" style={{ padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }} />
                            <textarea placeholder="Your Message" rows="5" style={{ padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem', resize: 'vertical' }}></textarea>
                            <button type="button" style={{ padding: '15px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', marginTop: '10px' }}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
