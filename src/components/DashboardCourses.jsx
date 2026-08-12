import React, { useState } from 'react';
import CourseCard from './CourseCard';

const DashboardCourses = ({ searchQuery = "", courses = [], enrolledCourseIds = [], completedEpisodes = {}, updateUserProgress, onCourseClick, onGenerateCertificate }) => {
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    const myCourses = courses.filter(c => enrolledCourseIds.includes(c.id)).filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const lockedCourses = courses.filter(c => !enrolledCourseIds.includes(c.id)).filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCourseId) {
        const course = courses.find(c => c.id === selectedCourseId);
        if (!course) {
            setSelectedCourseId(null);
            return null;
        }

        const episodes = course.episodes || [];
        const courseCompletedEpisodes = completedEpisodes[course.id] || [];
        
        // Find first unwatched episode, or default to episode 1, or currently selected
        const firstUnwatched = episodes.find(ep => !courseCompletedEpisodes.includes(ep.id)) || episodes[episodes.length - 1];
        const currentEpisode = selectedEpisode || firstUnwatched || (episodes.length > 0 ? episodes[0] : null);

        // Progress Calculations
        const totalEpisodes = episodes.length;
        const completedCount = courseCompletedEpisodes.length;
        const progressPercentage = totalEpisodes === 0 ? 0 : Math.round((completedCount / totalEpisodes) * 100);
        const remainingCount = totalEpisodes - completedCount;

        const handleMarkComplete = () => {
            if (currentEpisode && !courseCompletedEpisodes.includes(currentEpisode.id)) {
                updateUserProgress(prev => {
                    const prevCourseEpisodes = prev.completedEpisodes[course.id] || [];
                    const nextCourseEpisodes = [...prevCourseEpisodes, currentEpisode.id];
                    const nextProgress = { ...prev, completedEpisodes: { ...prev.completedEpisodes, [course.id]: nextCourseEpisodes } };
                    
                    // Check if they just hit 100%
                    if (nextCourseEpisodes.length === totalEpisodes && onGenerateCertificate) {
                        onGenerateCertificate(course, nextProgress);
                    }
                    return nextProgress;
                });

                // Auto-advance to next episode if available
                const currentIndex = episodes.findIndex(ep => ep.id === currentEpisode.id);
                if (currentIndex < episodes.length - 1) {
                    setSelectedEpisode(episodes[currentIndex + 1]);
                }
            }
        };

        const handlePrevious = () => {
            const currentIndex = episodes.findIndex(ep => ep.id === currentEpisode.id);
            if (currentIndex > 0) {
                setSelectedEpisode(episodes[currentIndex - 1]);
            }
        };

        return (
            <main className="dashboard-main" style={{ padding: '0', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8fafc' }}>
                <div style={{ backgroundColor: '#0f172a', padding: '20px 60px', color: 'white' }}>
                    <button 
                        onClick={() => { setSelectedCourseId(null); setSelectedEpisode(null); }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: '500', padding: 0 }}>
                        <i className='bx bx-arrow-back'></i> Back to My Courses
                    </button>
                    <h1 style={{ fontSize: '1.8rem', margin: '15px 0 0 0', lineHeight: '1.2' }}>{course.title}</h1>
                </div>

                {/* Progress Tracking Widget */}
                <div style={{ padding: '20px 60px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <div>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Your Progress</p>
                        <h3 style={{ margin: '5px 0 0 0', color: '#0f172a', fontSize: '1.2rem' }}>{completedCount} / {totalEpisodes} Episodes</h3>
                    </div>
                    <div style={{ flex: 1, maxWidth: '500px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>Progress</span>
                            <span style={{ fontSize: '0.9rem', color: progressPercentage === 100 ? '#10b981' : '#4f46e5', fontWeight: 'bold' }}>{progressPercentage}%</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${progressPercentage}%`, height: '100%', backgroundColor: progressPercentage === 100 ? '#10b981' : '#4f46e5', borderRadius: '4px', transition: 'width 0.3s ease' }}></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ textAlign: 'center', backgroundColor: '#ecfdf5', padding: '10px 20px', borderRadius: '8px' }}>
                            <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>{completedCount}</span>
                            <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: '600' }}>Completed</span>
                        </div>
                        <div style={{ textAlign: 'center', backgroundColor: '#f1f5f9', padding: '10px 20px', borderRadius: '8px' }}>
                            <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 'bold', color: '#64748b' }}>{remainingCount}</span>
                            <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '600' }}>Remaining</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '30px', padding: '40px 60px', alignItems: 'flex-start' }}>
                    
                    {/* Main Content (Left) - Video Player */}
                    <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {currentEpisode ? (
                            <>
                                <div style={{ width: '100%', height: '500px', backgroundColor: 'black', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                    <iframe 
                                        width="100%" 
                                        height="100%" 
                                        src={currentEpisode.videoUrl} 
                                        title={currentEpisode.title}
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h2 style={{ fontSize: '1.6rem', color: '#0f172a', margin: '0 0 15px 0' }}>{currentEpisode.title}</h2>
                                            <p style={{ color: '#475569', lineHeight: '1.7', margin: 0, fontSize: '1.05rem' }}>
                                                {currentEpisode.description || "No description provided for this episode."}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                                        <button 
                                            onClick={handlePrevious}
                                            disabled={episodes.findIndex(ep => ep.id === currentEpisode.id) === 0}
                                            style={{ padding: '12px 24px', backgroundColor: 'transparent', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: '600', cursor: episodes.findIndex(ep => ep.id === currentEpisode.id) === 0 ? 'not-allowed' : 'pointer', opacity: episodes.findIndex(ep => ep.id === currentEpisode.id) === 0 ? 0.5 : 1 }}
                                        >
                                            [ Previous ]
                                        </button>
                                        
                                        {!courseCompletedEpisodes.includes(currentEpisode.id) ? (
                                            <button 
                                                onClick={handleMarkComplete}
                                                style={{ padding: '12px 24px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                            >
                                                [ Mark Complete & Continue &rarr; ]
                                            </button>
                                        ) : (
                                            <button 
                                                disabled
                                                style={{ padding: '12px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'default', display: 'flex', alignItems: 'center', gap: '8px' }}
                                            >
                                                <i className='bx bx-check-circle'></i> Completed
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '12px', textAlign: 'center', color: '#64748b' }}>
                                No episodes available for this course yet.
                            </div>
                        )}
                    </div>

                    {/* Sidebar (Right) - Episodes List */}
                    <div style={{ flex: '1', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Course Content</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '600px', overflowY: 'auto' }}>
                            {episodes.map((episode, index) => {
                                const isActive = currentEpisode?.id === episode.id;
                                const isCompleted = courseCompletedEpisodes.includes(episode.id);
                                // An episode is unlocked if it's the first one, OR if it's already completed, OR if the PREVIOUS episode is completed
                                const prevEpisodeCompleted = index === 0 ? true : courseCompletedEpisodes.includes(episodes[index - 1].id);
                                const isLocked = !isCompleted && !prevEpisodeCompleted;

                                let StatusIcon = () => <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #cbd5e1' }}></div>; // Not started
                                if (isActive) StatusIcon = () => <i className='bx bx-play-circle' style={{ color: '#4f46e5', fontSize: '1.5rem' }}></i>; // Current
                                if (isCompleted) StatusIcon = () => <i className='bx bxs-check-circle' style={{ color: '#10b981', fontSize: '1.5rem' }}></i>; // Completed
                                if (isLocked) StatusIcon = () => <i className='bx bxs-lock-alt' style={{ color: '#94a3b8', fontSize: '1.3rem' }}></i>; // Locked

                                return (
                                    <div 
                                        key={episode.id}
                                        onClick={() => {
                                            if (!isLocked) {
                                                setSelectedEpisode(episode);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }}
                                        style={{ 
                                            display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', borderBottom: '1px solid #f1f5f9',
                                            cursor: isLocked ? 'not-allowed' : 'pointer', backgroundColor: isActive ? '#eff6ff' : 'transparent',
                                            transition: 'background-color 0.2s', opacity: isLocked ? 0.6 : 1
                                        }}
                                        onMouseOver={(e) => { if (!isActive && !isLocked) e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                                        onMouseOut={(e) => { if (!isActive && !isLocked) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px' }}>
                                            <StatusIcon />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, color: isActive ? '#4f46e5' : '#334155', fontSize: '0.95rem', fontWeight: isActive ? '600' : '500' }}>{episode.title}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="dashboard-main" style={{ padding: '0', backgroundColor: '#f8fafc' }}>
            <div style={{ padding: '20px 40px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    My Purchased Courses 
                    <span style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '2px 12px', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold' }}>
                        {myCourses.length}
                    </span>
                </h2>
            </div>

            <div style={{ padding: '30px 40px' }}>
                {myCourses.length > 0 ? (
                    <div className="courses-grid-dash" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {myCourses.map(course => {
                            const episodes = course.episodes || [];
                            const courseCompletedEpisodes = completedEpisodes[course.id] || [];
                            const totalEpisodes = episodes.length;
                            const completedCount = courseCompletedEpisodes.length;
                            const progress = totalEpisodes === 0 ? 0 : Math.round((completedCount / totalEpisodes) * 100);

                            return (
                                <div key={course.id} style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <div style={{ height: '160px', backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '1.2rem', lineHeight: '1.4' }}>{course.title}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', color: '#f59e0b', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                            ⭐ {course.rating}
                                        </div>
                                        
                                        <div style={{ marginTop: 'auto' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                                                <span style={{ color: '#64748b' }}>{completedCount} / {totalEpisodes} Episodes</span>
                                                <span style={{ fontWeight: '600', color: progress === 100 ? '#10b981' : '#4f46e5' }}>{progress}%</span>
                                            </div>
                                            <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                                                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: progress === 100 ? '#10b981' : '#4f46e5', borderRadius: '4px' }}></div>
                                            </div>

                                            {progress === 100 ? (
                                                <button onClick={() => { if(onGenerateCertificate) onGenerateCertificate(course, { completedEpisodes }); }} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#10b981', border: '2px solid #10b981', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                    <i className='bx bx-certification'></i> View Certificate
                                                </button>
                                            ) : (
                                                <button onClick={() => setSelectedCourseId(course.id)} style={{ width: '100%', padding: '12px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                                    [ Continue ]
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '12px', textAlign: 'center', color: '#64748b', border: '1px dashed #cbd5e1' }}>
                        <i className='bx bx-book-open' style={{ fontSize: '3rem', color: '#94a3b8', marginBottom: '10px' }}></i>
                        <p style={{ margin: 0, fontSize: '1.1rem' }}>You haven't purchased any courses yet.</p>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>Check out the available courses below to get started!</p>
                    </div>
                )}
            </div>
            
            <div style={{ padding: '20px 40px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
                <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.3rem' }}>
                    Explore More Courses
                </h2>
            </div>
            <div style={{ padding: '30px 40px' }}>
                <div className="courses-grid-dash" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {lockedCourses.map(course => (
                        <CourseCard 
                            key={course.id} 
                            course={course} 
                            isLocked={true}
                            onClick={() => {
                                if (onCourseClick) onCourseClick(course);
                            }} 
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default DashboardCourses;
