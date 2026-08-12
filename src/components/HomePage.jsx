import React from 'react';

const HomePage = ({ onNavigate }) => {
    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 200px)' }}>
            {/* Hero Section */}
            <section style={{ padding: '100px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: 'white' }}>
                <div style={{ display: 'inline-block', backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '8px 16px', borderRadius: '20px', fontWeight: '600', fontSize: '0.9rem', marginBottom: '25px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                    Learn. Practice. Earn. Have Fun! 🚀
                </div>
                <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.2', margin: '0 0 25px 0', maxWidth: '800px', letterSpacing: '-1px' }}>
                    Master Tech Skills and <span style={{ color: '#4f46e5', textShadow: '0 0 20px rgba(79,70,229,0.5)' }}>Accelerate</span> Your Career
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 0 40px 0', lineHeight: '1.6' }}>
                    Join thousands of learners achieving their dreams. Industry-led courses, hands-on practice, and top-tier placement support.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <button onClick={() => onNavigate('courses')} style={{ padding: '16px 36px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)', transition: 'transform 0.2s' }} onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                        Explore Courses
                    </button>
                    <button onClick={() => onNavigate('practice')} style={{ padding: '16px 36px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', backdropFilter: 'blur(5px)', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
                        Start Practicing
                    </button>
                </div>
                
                {/* Metrics */}
                <div style={{ display: 'flex', gap: '60px', marginTop: '80px', padding: '30px 60px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', margin: '0 0 5px 0', color: 'white' }}>10K+</h2>
                        <p style={{ margin: 0, color: '#94a3b8' }}>Active Learners</p>
                    </div>
                    <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', margin: '0 0 5px 0', color: 'white' }}>95%</h2>
                        <p style={{ margin: 0, color: '#94a3b8' }}>Placement Rate</p>
                    </div>
                    <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', margin: '0 0 5px 0', color: 'white' }}>50+</h2>
                        <p style={{ margin: 0, color: '#94a3b8' }}>Hiring Partners</p>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section style={{ padding: '60px 40px', backgroundColor: 'white', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                <p style={{ margin: '0 0 30px 0', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Trusted by innovative companies</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap', opacity: 0.5 }}>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>Google</h2>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>Microsoft</h2>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>Amazon</h2>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>TCS</h2>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>Infosys</h2>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>GenZ Neural-X</h2>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
