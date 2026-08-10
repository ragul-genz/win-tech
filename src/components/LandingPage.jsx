import React from 'react';
import Logo from './Logo';

const LandingPage = ({ onLoginClick, onCourseClick, courses }) => {
    
    // Smooth scroll for nav links
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
                    <Logo />
                </div>
                <nav style={{ display: 'flex', gap: '30px' }}>
                    <button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', color: '#475569', fontWeight: '500', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = '#475569'}>Services</button>
                    <button onClick={() => scrollToSection('courses')} style={{ background: 'none', border: 'none', color: '#475569', fontWeight: '500', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = '#475569'}>Courses</button>
                    <button onClick={() => scrollToSection('partners')} style={{ background: 'none', border: 'none', color: '#475569', fontWeight: '500', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = '#475569'}>Partners</button>
                    <button onClick={() => scrollToSection('journey')} style={{ background: 'none', border: 'none', color: '#475569', fontWeight: '500', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = '#475569'}>Journey</button>
                    <button onClick={() => scrollToSection('reviews')} style={{ background: 'none', border: 'none', color: '#475569', fontWeight: '500', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = '#475569'}>Reviews</button>
                </nav>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={onLoginClick} style={{ padding: '10px 24px', backgroundColor: 'transparent', color: '#4f46e5', border: '1.5px solid #4f46e5', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>Login</button>
                    <button onClick={onLoginClick} style={{ padding: '10px 24px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)', transition: 'all 0.2s' }}>Sign Up Free</button>
                </div>
            </header>

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
                    <button onClick={() => scrollToSection('courses')} style={{ padding: '16px 36px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)', transition: 'transform 0.2s' }} onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                        Explore Courses
                    </button>
                    <button onClick={onLoginClick} style={{ padding: '16px 36px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', backdropFilter: 'blur(5px)', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
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
            <section id="partners" style={{ padding: '60px 40px', backgroundColor: 'white', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                <p style={{ margin: '0 0 30px 0', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Trusted by innovative companies</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap', opacity: 0.5 }}>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>Google</h2>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>Microsoft</h2>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>Amazon</h2>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>TCS</h2>
                    <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.8rem', color: '#0f172a' }}>Infosys</h2>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" style={{ padding: '100px 40px', backgroundColor: '#f8fafc' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: '0 0 15px 0' }}>Our Premium Services</h2>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', margin: '0 0 60px 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>We deliver top-notch digital solutions to elevate your business in the modern world.</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {/* Web Development */}
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '20px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 25px auto' }}>
                                <i className='bx bx-laptop'></i>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 15px 0' }}>Web Development</h3>
                            <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>Custom, responsive, and high-performance websites built with modern technologies like React, Next.js, and Node.</p>
                        </div>

                        {/* App Development */}
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '20px', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 25px auto' }}>
                                <i className='bx bx-mobile-alt'></i>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 15px 0' }}>App Development</h3>
                            <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.</p>
                        </div>

                        {/* Digital Marketing */}
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '20px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 25px auto' }}>
                                <i className='bx bx-trending-up'></i>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 15px 0' }}>Digital Marketing</h3>
                            <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>Data-driven marketing strategies, SEO, and social media campaigns to boost your brand's online presence and ROI.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section id="courses" style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: '0 0 15px 0' }}>Featured Courses</h2>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>Hand-picked programs to get you industry ready. Enroll now and start your journey.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                    {courses.slice(0, 4).map(course => (
                        <div key={course.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ height: '200px', backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                    <span style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>{course.level || 'Beginner'}</span>
                                    {course.rating && <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><i className='bx bxs-star'></i> {course.rating}</span>}
                                </div>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: '#0f172a', lineHeight: '1.4' }}>{course.title}</h3>
                                <p style={{ margin: '0 0 15px 0', color: '#64748b', fontSize: '0.9rem', flex: 1 }}>By {course.instructor}</p>
                                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10b981' }}>₹{course.price || 4999}</span>
                                    <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹{(course.price || 4999) + 2000}</span>
                                </div>
                                <button 
                                    onClick={() => onCourseClick(course)}
                                    style={{ width: '100%', padding: '12px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                                >
                                    Buy / Enroll Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Journey Section */}
            <section id="journey" style={{ padding: '100px 40px', backgroundColor: 'white' }}>
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

            {/* Placements Section */}
            <section id="placements" style={{ padding: '100px 40px', backgroundColor: '#f8fafc' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: '0 0 15px 0' }}>Where Our Students Are Placed</h2>
                        <p style={{ fontSize: '1.1rem', color: '#64748b', margin: 0 }}>Join the ranks of developers working at top tech companies.</p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {[
                            { name: 'Arjun K', role: 'Frontend Developer', company: 'TCS', salary: '8 LPA' },
                            { name: 'Priya S', role: 'Full Stack Dev', company: 'Amazon', salary: '22 LPA' },
                            { name: 'Karthik R', role: 'Backend Engineer', company: 'Infosys', salary: '7 LPA' },
                            { name: 'Divya M', role: 'UI/UX Designer', company: 'Zoho', salary: '9 LPA' }
                        ].map((student, i) => (
                            <div key={i} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#e2e8f0', margin: '0 auto 15px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#475569' }}>
                                    {student.name.charAt(0)}
                                </div>
                                <h3 style={{ margin: '0 0 5px 0', color: '#0f172a' }}>{student.name}</h3>
                                <p style={{ margin: '0 0 15px 0', color: '#4f46e5', fontWeight: '500' }}>{student.role}</p>
                                <div style={{ padding: '10px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
                                    <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>Placed at <strong>{student.company}</strong></p>
                                    <p style={{ margin: '5px 0 0 0', color: '#10b981', fontWeight: '600' }}>{student.salary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" style={{ padding: '100px 40px', backgroundColor: '#0f172a', color: 'white', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', margin: '0 0 60px 0' }}>What Our Learners Say</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
                    {[
                        { name: 'Sanjay Kumar', review: "The Full Stack course is incredibly structured. I went from zero knowledge to getting my first job in just 5 months!" },
                        { name: 'Anjali Sharma', review: "The practice assignments and real-world projects helped me crack the interview easily. Highly recommended." },
                        { name: 'Rahul V', review: "Best platform to learn. The instructors are very supportive and the community is great." }
                    ].map((review, i) => (
                        <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                            <div style={{ color: '#f59e0b', fontSize: '1.5rem', marginBottom: '20px' }}><i className='bx bxs-quote-alt-left'></i></div>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: '0 0 30px 0', color: '#e2e8f0' }}>"{review.review}"</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{review.name.charAt(0)}</div>
                                <div>
                                    <h4 style={{ margin: 0 }}>{review.name}</h4>
                                    <div style={{ color: '#f59e0b', fontSize: '0.8rem', marginTop: '4px' }}>
                                        <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '40px', backgroundColor: '#020617', color: '#94a3b8', textAlign: 'center' }}>
                <Logo />
                <p style={{ margin: '20px 0 0 0', fontSize: '0.9rem' }}>&copy; 2026 Win Tech. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
