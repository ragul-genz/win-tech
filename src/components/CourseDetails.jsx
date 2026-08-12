import React, { useState } from 'react';

const CourseDetails = ({ course, currentUser, onBack, onEnroll, updateUserProgress }) => {
    const [couponCode, setCouponCode] = useState('');
    const [activeTab, setActiveTab] = useState('overview'); // overview, curriculum, faq
    const [previewEpisode, setPreviewEpisode] = useState(null);
    
    if (!course) return null;

    return (
        <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            {/* Dark Header Section */}
            <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '60px 40px 100px 40px', position: 'relative' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px' }}>
                    <div style={{ flex: '1', zIndex: 10 }}>
                        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#cbd5e1', fontSize: '1rem', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <i className='bx bx-arrow-back'></i> Back to Courses
                        </button>
                        
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <span style={{ backgroundColor: 'rgba(79, 70, 229, 0.2)', color: '#a5b4fc', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>{course.category || 'Development'}</span>
                            <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>{course.level || 'All Levels'}</span>
                        </div>
                        
                        <h1 style={{ fontSize: '3rem', margin: '0 0 15px 0', lineHeight: '1.2', fontWeight: '800' }}>{course.title}</h1>
                        <p style={{ fontSize: '1.1rem', color: '#94a3b8', margin: '0 0 20px 0', lineHeight: '1.6', maxWidth: '800px' }}>{course.description}</p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '1.1rem' }}>{course.rating || '4.5'}</span>
                                <div style={{ color: '#f59e0b', fontSize: '1rem' }}>
                                    <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star-half'></i>
                                </div>
                                <span style={{ color: '#94a3b8', textDecoration: 'underline', cursor: 'pointer' }}>({course.reviewsCount || 0} reviews)</span>
                            </div>
                            <div style={{ color: '#94a3b8' }}>
                                <i className='bx bx-user' style={{ marginRight: '5px' }}></i> 5,000+ students
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                {course.instructor ? course.instructor.charAt(0) : 'I'}
                            </div>
                            <span style={{ color: '#e2e8f0', fontSize: '1.05rem' }}>Created by <strong>{course.instructor}</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ maxWidth: '1200px', margin: '-60px auto 0 auto', padding: '0 40px 80px 40px', display: 'flex', gap: '40px', position: 'relative', zIndex: 20 }}>
                {/* Left Column (Content) */}
                <div style={{ flex: '1' }}>
                    {/* Tabs */}
                    <div style={{ backgroundColor: 'white', padding: '0 20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '30px', display: 'flex', gap: '30px', border: '1px solid #e2e8f0' }}>
                        <button onClick={() => setActiveTab('overview')} style={{ padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.05rem', fontWeight: activeTab === 'overview' ? '600' : '500', color: activeTab === 'overview' ? '#4f46e5' : '#64748b', borderBottom: activeTab === 'overview' ? '3px solid #4f46e5' : '3px solid transparent' }}>Overview</button>
                        <button onClick={() => setActiveTab('curriculum')} style={{ padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.05rem', fontWeight: activeTab === 'curriculum' ? '600' : '500', color: activeTab === 'curriculum' ? '#4f46e5' : '#64748b', borderBottom: activeTab === 'curriculum' ? '3px solid #4f46e5' : '3px solid transparent' }}>Curriculum</button>
                        <button onClick={() => setActiveTab('faq')} style={{ padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.05rem', fontWeight: activeTab === 'faq' ? '600' : '500', color: activeTab === 'faq' ? '#4f46e5' : '#64748b', borderBottom: activeTab === 'faq' ? '3px solid #4f46e5' : '3px solid transparent' }}>FAQ</button>
                    </div>

                    {/* Tab Content */}
                    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        
                        {activeTab === 'overview' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 20px 0' }}>What you'll learn</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '40px' }}>
                                    {(course.whatYouWillLearn || []).map((item, index) => (
                                        <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                            <i className='bx bx-check' style={{ color: '#10b981', fontSize: '1.5rem', marginTop: '-2px' }}></i>
                                            <span style={{ color: '#475569', lineHeight: '1.5' }}>{item}</span>
                                        </div>
                                    ))}
                                    {(!course.whatYouWillLearn || course.whatYouWillLearn.length === 0) && (
                                        <p style={{ color: '#64748b' }}>Details coming soon.</p>
                                    )}
                                </div>

                                <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 20px 0' }}>Requirements</h2>
                                <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: '1.8', marginBottom: '40px' }}>
                                    {(course.requirements || []).map((req, index) => (
                                        <li key={index}>{req}</li>
                                    ))}
                                    {(!course.requirements || course.requirements.length === 0) && (
                                        <li>No prior experience required.</li>
                                    )}
                                </ul>

                                <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 20px 0' }}>Description</h2>
                                <p style={{ color: '#475569', lineHeight: '1.8' }}>
                                    {course.description}
                                </p>
                            </div>
                        )}

                        {activeTab === 'curriculum' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 10px 0' }}>Course Curriculum</h2>
                                <p style={{ color: '#64748b', marginBottom: '25px' }}>{course.episodes?.length || 0} lessons • {course.duration || 'Total length'}</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {(course.episodes || []).map((episode, index) => (
                                        <div key={index} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <i className='bx bx-play'></i>
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        {episode.title}
                                                        {episode.isPreview && <span style={{ padding: '2px 8px', backgroundColor: '#fef3c7', color: '#d97706', fontSize: '0.75rem', borderRadius: '10px', fontWeight: 'bold' }}>FREE PREVIEW</span>}
                                                    </h4>
                                                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>{episode.duration || '00:00'} • {episode.description}</p>
                                                </div>
                                            </div>
                                            {episode.isPreview ? (
                                                <button onClick={() => { setPreviewEpisode(episode); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <i className='bx bx-play-circle' style={{ fontSize: '1.2rem' }}></i> Preview
                                                </button>
                                            ) : (
                                                <i className='bx bxs-lock-alt' style={{ color: '#94a3b8' }}></i>
                                            )}
                                        </div>
                                    ))}
                                    {(!course.episodes || course.episodes.length === 0) && (
                                        <p style={{ color: '#64748b' }}>Curriculum is being updated.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'faq' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 25px 0' }}>Frequently Asked Questions</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {(course.faq || []).map((faq, index) => (
                                        <div key={index} style={{ paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
                                            <h4 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '1.1rem' }}>{faq.question}</h4>
                                            <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6' }}>{faq.answer}</p>
                                        </div>
                                    ))}
                                    {(!course.faq || course.faq.length === 0) && (
                                        <p style={{ color: '#64748b' }}>No FAQs available for this course yet.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column (Sidebar / Sticky Checkout Box) */}
                <div style={{ width: '380px' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', position: 'sticky', top: '40px' }}>
                        {/* Course Image or Preview Video */}
                        {previewEpisode ? (
                            <div style={{ height: '220px', backgroundColor: 'black' }}>
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={previewEpisode.videoUrl} 
                                    title="Preview"
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div style={{ height: '220px', backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div 
                                        onClick={() => {
                                            const firstPreview = (course.episodes || []).find(ep => ep.isPreview);
                                            if (firstPreview) setPreviewEpisode(firstPreview);
                                        }}
                                        style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                    >
                                        <i className='bx bx-play' style={{ marginLeft: '4px' }}></i>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div style={{ padding: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', marginBottom: '25px' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>₹{course.price}</h2>
                                <span style={{ fontSize: '1.2rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹{course.price + 2000}</span>
                            </div>

                            <button onClick={() => onEnroll(course)} style={{ width: '100%', padding: '16px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'} onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}>
                                Enroll Now
                            </button>
                            
                            <button 
                                onClick={() => {
                                    if (currentUser) {
                                        updateUserProgress(prev => {
                                            const list = prev.wishlistCourseIds || [];
                                            if (list.includes(course.id)) return prev;
                                            alert("Added to wishlist!");
                                            return { ...prev, wishlistCourseIds: [...list, course.id] };
                                        });
                                    } else {
                                        alert("Please log in to add to wishlist.");
                                    }
                                }} 
                                style={{ width: '100%', padding: '16px', backgroundColor: 'transparent', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }} 
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} 
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <i className='bx bx-heart'></i> Add to Wishlist
                            </button>

                            <p style={{ textAlign: 'center', margin: '0 0 25px 0', color: '#64748b', fontSize: '0.9rem' }}>30-Day Money-Back Guarantee</p>

                            <div style={{ marginBottom: '25px' }}>
                                <h4 style={{ margin: '0 0 15px 0', color: '#0f172a', fontSize: '1.05rem' }}>This course includes:</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}>
                                        <i className='bx bx-video' style={{ fontSize: '1.2rem', color: '#64748b' }}></i> {course.duration || '20 hours'} on-demand video
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}>
                                        <i className='bx bx-file' style={{ fontSize: '1.2rem', color: '#64748b' }}></i> Assignments & Projects
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}>
                                        <i className='bx bx-infinite' style={{ fontSize: '1.2rem', color: '#64748b' }}></i> Full lifetime access
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}>
                                        <i className='bx bx-mobile-alt' style={{ fontSize: '1.2rem', color: '#64748b' }}></i> Access on mobile and TV
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}>
                                        <i className='bx bx-trophy' style={{ fontSize: '1.2rem', color: '#64748b' }}></i> Certificate of completion
                                    </li>
                                </ul>
                            </div>

                            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Coupon Code" 
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        style={{ flex: 1, padding: '10px 15px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                                    />
                                    <button style={{ padding: '10px 15px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
