import React from 'react';

const AboutPage = () => {
    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 200px)' }}>
            
            {/* Header */}
            <div style={{ padding: '80px 40px', backgroundColor: '#0f172a', color: 'white', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', margin: '0 0 15px 0' }}>About Win Tech</h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Empowering the next generation of tech professionals.</p>
            </div>

            {/* Journey Section */}
            <section style={{ padding: '100px 40px', backgroundColor: 'white' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: '0 0 15px 0' }}>The Learner's Journey</h2>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', margin: '0 0 60px 0' }}>A proven roadmap to take you from a beginner to an industry-ready professional.</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', position: 'relative' }}>
                        {/* Connecting Line */}
                        <div style={{ position: 'absolute', top: '40px', left: '12%', right: '12%', height: '4px', backgroundColor: '#e2e8f0', zIndex: 1 }}>
                            <div style={{ width: '100%', height: '100%', backgroundColor: '#4f46e5' }}></div>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '20px', boxShadow: '0 0 0 10px white, 0 10px 20px rgba(0,0,0,0.1)' }}>
                                <i className='bx bx-book-reader'></i>
                            </div>
                            <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>1. Learn</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Master concepts with industry experts.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#0ea5e9', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '20px', boxShadow: '0 0 0 10px white, 0 10px 20px rgba(0,0,0,0.1)' }}>
                                <i className='bx bx-code-alt'></i>
                            </div>
                            <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>2. Practice</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Build real-world projects & assignments.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '20px', boxShadow: '0 0 0 10px white, 0 10px 20px rgba(0,0,0,0.1)' }}>
                                <i className='bx bx-briefcase'></i>
                            </div>
                            <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>3. Earn</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Get placed and start earning.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '20px', boxShadow: '0 0 0 10px white, 0 10px 20px rgba(0,0,0,0.1)' }}>
                                <i className='bx bx-party'></i>
                            </div>
                            <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>4. Have Fun!</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Enjoy the community and networking.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instructors Section */}
            <section style={{ padding: '100px 40px', backgroundColor: '#f8fafc' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: '0 0 15px 0' }}>Learn from the Best</h2>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', margin: '0 0 60px 0' }}>Our instructors are industry experts with years of experience.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                        {[
                            { name: 'T.Muthuvel Ganesh', role: 'Sr. Full Stack Engineer', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
                            { name: 'A.Vinothkumar', role: 'AI Researcher', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
                            { name: 'S.Priya', role: 'Lead UI/UX Designer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
                            { name: 'K.Rahul', role: 'Cloud Architect', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' }
                        ].map((instructor, i) => (
                            <div key={i} style={{ padding: '30px', backgroundColor: 'white', borderRadius: '16px', transition: 'transform 0.3s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundImage: `url(${instructor.img})`, backgroundSize: 'cover', backgroundPosition: 'center', margin: '0 auto 20px auto', border: '4px solid #f1f5f9' }}></div>
                                <h3 style={{ margin: '0 0 5px 0', color: '#0f172a' }}>{instructor.name}</h3>
                                <p style={{ margin: 0, color: '#4f46e5', fontWeight: '500', fontSize: '0.9rem' }}>{instructor.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
