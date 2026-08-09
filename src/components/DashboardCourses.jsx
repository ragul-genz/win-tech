import React, { useState } from 'react';
import CourseCard from './CourseCard';

const DashboardCourses = ({ searchQuery, courses = [] }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);

    // Simulate "My Courses" having only courses with progress > 0
    const myCourses = courses.filter(c => c.progress > 0 || c.inLibrary);

    const displayedCourses = activeTab === 'all' ? courses : myCourses;
    
    // Filter by search query
    const filteredCourses = displayedCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCourseId) {
        const course = courses.find(c => c.id === selectedCourseId);
        if (!course) {
            setSelectedCourseId(null);
            return null;
        }

        return (
            <main className="dashboard-main" style={{ padding: '0', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc' }}>
                {/* Header / Hero Section */}
                <div style={{ backgroundColor: '#0f172a', padding: '40px 60px', color: 'white' }}>
                    <button 
                        onClick={() => {
                            if (selectedLesson) {
                                setSelectedLesson(null);
                            } else {
                                setSelectedCourseId(null);
                            }
                        }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: '500', marginBottom: '20px', padding: 0 }}>
                        <i className='bx bx-arrow-back'></i> {selectedLesson ? 'Back to Course Overview' : 'Back to Courses'}
                    </button>
                    
                    {selectedLesson ? (
                        /* Lesson Player View */
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h1 style={{ fontSize: '1.8rem', margin: '0', lineHeight: '1.2' }}>{selectedLesson.title}</h1>
                                <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <i className='bx bx-shield-quarter'></i> Protected Content
                                </span>
                            </div>
                            <div 
                                style={{ width: '100%', height: '500px', backgroundColor: 'black', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', userSelect: 'none' }}
                                onContextMenu={(e) => e.preventDefault()} // Prevent right click
                            >
                                {/* Moving Watermark to prevent screen recording */}
                                <div style={{ position: 'absolute', top: '10%', left: '10%', opacity: '0.2', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', transform: 'rotate(-20deg)', pointerEvents: 'none' }}>
                                    User ID: 987654321
                                </div>
                                <div style={{ position: 'absolute', bottom: '20%', right: '10%', opacity: '0.2', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', transform: 'rotate(-20deg)', pointerEvents: 'none' }}>
                                    User ID: 987654321
                                </div>
                                
                                {/* Invisible overlay to block direct interaction with video elements if real video was used */}
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '60px', zIndex: 10 }}></div>

                                <i className='bx bx-play-circle' style={{ fontSize: '5rem', color: 'white', cursor: 'pointer', opacity: '0.8', transition: 'opacity 0.2s', zIndex: 20 }} onMouseOver={(e) => e.target.style.opacity = '1'} onMouseOut={(e) => e.target.style.opacity = '0.8'}></i>
                                
                                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', height: '5px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '5px', zIndex: 20 }}>
                                    <div style={{ width: '30%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '5px' }}></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Course Overview Hero */
                        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1.5' }}>
                                <h1 style={{ fontSize: '2.5rem', margin: '0 0 15px 0', lineHeight: '1.2' }}>{course.title}</h1>
                                <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                                    {course.description || "Master the concepts and build real-world projects with comprehensive, step-by-step training from industry experts."}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#94a3b8', fontSize: '0.95rem', marginBottom: '30px', flexWrap: 'wrap' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className='bx bxs-user-circle' style={{ fontSize: '1.3rem', color: '#3b82f6' }}></i> By {course.instructor || 'Admin'}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className='bx bx-bar-chart-alt-2' style={{ fontSize: '1.2rem' }}></i> {course.level || 'Beginner'}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className='bx bx-time-five' style={{ fontSize: '1.2rem' }}></i> {course.duration || 'Flexible'}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className='bx bx-certification' style={{ fontSize: '1.2rem' }}></i> Certificate Included</span>
                                </div>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <button style={{ padding: '12px 30px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
                                        <i className='bx bx-play-circle' style={{ fontSize: '1.3rem' }}></i> Resume Learning
                                    </button>
                                    <button style={{ padding: '12px 20px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
                                        <i className='bx bx-bookmark' ></i>
                                    </button>
                                </div>
                            </div>
                            <div style={{ flex: '1', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                                <img src={course.image} alt={course.title} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                                {course.videoUrl && (
                                    <a href={course.videoUrl} target="_blank" rel="noreferrer" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <i className='bx bx-play' style={{ fontSize: '32px', marginLeft: '4px' }}></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Layout */}
                <div style={{ display: 'flex', gap: '30px', padding: '40px 60px', alignItems: 'flex-start' }}>
                    
                    {/* Main Content (Left) */}
                    <div style={{ flex: '2', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '1.6rem', color: '#0f172a', margin: '0 0 25px 0' }}>Course Contents</h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {[
                                { id: 1, day: 1, title: "Day_1: Introduction to Full Stack Development |Course Overview|", completed: true },
                                { id: 2, day: 2, title: "Day_2: Introduction to HTML| Install IDE |Develop an E-Commerce Website Using HT...", completed: true },
                                { id: 3, day: 3, title: "Day_3: Develop a price tag in E-Commerce Website using CSS", completed: false },
                                { id: 4, day: 4, title: "Day_4: CSS Positioning", completed: false },
                                { id: 5, day: 5, title: "Day_5: Introduction to CSS| Develop a Blog Website", completed: false },
                                { id: 6, day: 6, title: "Day_6: Structuring a Commercial Website", completed: false }
                            ].map(lesson => (
                                <div 
                                    key={lesson.id} 
                                    onClick={() => {
                                        setSelectedLesson(lesson);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    style={{ 
                                        display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', borderBottom: '1px solid #f1f5f9',
                                        cursor: 'pointer', backgroundColor: selectedLesson?.id === lesson.id ? '#f8fafc' : 'transparent',
                                        borderRadius: '8px', transition: 'background-color 0.2s'
                                    }}
                                    onMouseOver={(e) => { if (selectedLesson?.id !== lesson.id) e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                                    onMouseOut={(e) => { if (selectedLesson?.id !== lesson.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                >
                                    
                                    {/* Custom Badge */}
                                    <div style={{ position: 'relative', width: '80px', height: '60px', flexShrink: 0 }}>
                                        <div style={{ position: 'absolute', top: '0', left: '0', width: '0', height: '0', borderTop: '25px solid #0f172a', borderRight: '25px solid transparent' }}></div>
                                        <div style={{ position: 'absolute', bottom: '0', right: '0', width: '0', height: '0', borderBottom: '25px solid #0f172a', borderLeft: '25px solid transparent' }}></div>
                                        <div style={{ position: 'absolute', left: '0', top: '15px', fontSize: '0.85rem', fontWeight: 'bold', color: '#0f172a', lineHeight: '1.1' }}>
                                            Full<br/>stack
                                        </div>
                                        <div style={{ position: 'absolute', right: '0', top: '10px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '600' }}>
                                            {lesson.day}/30
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, color: '#334155', fontSize: '1rem', lineHeight: '1.5' }}>{lesson.title}</p>
                                    </div>

                                    {/* Status */}
                                    <div style={{ width: '30px', display: 'flex', justifyContent: 'center' }}>
                                        {lesson.completed && (
                                            <i className='bx bx-check' style={{ color: '#22c55e', fontSize: '1.5rem' }}></i>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar (Right) */}
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        {/* Progress Card */}
                        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ margin: '0 0 15px 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: '600' }}>2 of 45 Lessons Completed</h3>
                            <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '5%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
                            </div>
                        </div>

                        {/* Instructor Card */}
                        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ margin: '0 0 20px 0', color: '#0f172a', fontSize: '1.2rem', fontWeight: '600' }}>Instructor</h3>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className='bx bxs-user-circle' style={{ fontSize: '3rem', color: '#0f172a' }}></i>
                                </div>
                                <div>
                                    <p style={{ margin: '0 0 5px 0', color: '#334155', fontWeight: '500', fontSize: '1rem' }}>{course.instructor || "Instructor Name"}</p>
                                    <p style={{ margin: 0, color: '#3b82f6', fontSize: '0.9rem', cursor: 'pointer' }}>Instructor</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        );
    }

    return (
        <main className="dashboard-main">
            <div className="tabs-container">
                <div className="tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All Courses <span className="badge">10</span>
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'my' ? 'active' : ''}`}
                        onClick={() => setActiveTab('my')}
                    >
                        My Courses <span className="badge">10</span>
                    </button>
                </div>
            </div>

            <div className="controls-bar">
                <button className="sort-btn">
                    <i className='bx bx-sort-down'></i> Sort <i className='bx bx-chevron-down'></i>
                </button>
            </div>

            <div className="courses-grid-dash">
                {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} onClick={() => setSelectedCourseId(course.id)} />
                ))}
            </div>
            
            {filteredCourses.length === 0 && (
                <div className="no-results">
                    <p>No courses found matching "{searchQuery}"</p>
                </div>
            )}
        </main>
    );
};

export default DashboardCourses;
