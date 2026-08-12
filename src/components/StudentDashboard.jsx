import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardCourses from './DashboardCourses';
import CourseCard from './CourseCard';
import CertificateRenderer from './CertificateRenderer';

const StudentDashboard = ({ currentUser, courses, onLogout, notifications, setNotifications, updateUserProgress, onNavigate, certificateSettings, orders }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    
    const enrolledCourses = courses.filter(c => currentUser?.enrolledCourseIds?.includes(c.id));
    const latestCourse = enrolledCourses.length > 0 ? enrolledCourses[0] : null;
    const completedEpisodes = currentUser?.completedEpisodes || {};
    
    const sidebarItems = [
        { id: 'dashboard', icon: 'bx-home-alt', label: 'Dashboard' },
        { id: 'my_courses', icon: 'bx-book-open', label: 'My Courses' },
        { id: 'certificates', icon: 'bx-certification', label: 'Certificates' },
        { id: 'orders', icon: 'bx-receipt', label: 'Orders' },
        { id: 'wishlist', icon: 'bx-heart', label: 'Wishlist' },
        { id: 'profile', icon: 'bx-user', label: 'Profile' },
        { id: 'settings', icon: 'bx-cog', label: 'Settings' }
    ];

    const handleGenerateCertificate = (course, progressState) => {
        const certExists = (currentUser?.certificates || []).find(c => c.courseId === course.id);
        if (!certExists) {
            updateUserProgress(prev => {
                const newCert = {
                    id: 'CERT-' + Math.floor(Math.random() * 900000) + 'WIN',
                    courseId: course.id,
                    courseTitle: course.title,
                    date: new Date().toLocaleDateString()
                };
                return { ...prev, certificates: [...(prev.certificates || []), newCert] };
            });
            alert(`🎉 Congratulations! You have completed ${course.title}! Your certificate is ready.`);
            setActiveTab('certificates');
        } else {
            setActiveTab('certificates');
        }
    };

    const renderMainContent = () => {
        if (activeTab === 'dashboard') {
            // Dashboard Default View
            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 10px 0' }}>Welcome back, {currentUser?.name?.split(' ')[0] || 'Student'} 👋</h1>
                        <p style={{ color: '#64748b', margin: 0, fontSize: '1.1rem' }}>Continue your learning journey</p>
                    </div>

                    {latestCourse ? (() => {
                        const totalEps = latestCourse.episodes?.length || 0;
                        const compEps = completedEpisodes[latestCourse.id]?.length || 0;
                        const prog = totalEps === 0 ? 0 : Math.round((compEps / totalEps) * 100);

                        return (
                            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
                                <div>
                                    <p style={{ color: '#4f46e5', fontWeight: '700', margin: '0 0 10px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Continue Learning</p>
                                    <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 10px 0' }}>{latestCourse.title}</h2>
                                    <p style={{ color: '#64748b', margin: '0 0 20px 0', fontSize: '0.95rem' }}>{compEps} / {totalEps} Episodes Completed</p>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '300px', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: `${prog}%`, height: '100%', backgroundColor: prog === 100 ? '#10b981' : '#4f46e5', borderRadius: '4px' }}></div>
                                        </div>
                                        <span style={{ color: '#475569', fontWeight: '600', fontSize: '0.9rem' }}>{prog}%</span>
                                    </div>
                                </div>
                                <button onClick={() => setActiveTab('my_courses')} style={{ padding: '12px 24px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', transition: 'transform 0.2s' }}>
                                    Continue Learning <i className='bx bx-right-arrow-alt'></i>
                                </button>
                            </div>
                        );
                    })() : (
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', marginBottom: '40px', border: '1px dashed #cbd5e1' }}>
                            <i className='bx bx-book-open' style={{ fontSize: '3rem', color: '#94a3b8', marginBottom: '15px' }}></i>
                            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 10px 0' }}>Start your journey</h2>
                            <p style={{ color: '#64748b', margin: '0 0 20px 0', fontSize: '1rem' }}>Enroll in a course to see your progress here.</p>
                            <button onClick={() => onNavigate('courses')} style={{ padding: '12px 24px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Explore Courses</button>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0 }}>My Courses</h2>
                        <button onClick={() => setActiveTab('my_courses')} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>View All <i className='bx bx-right-arrow-alt'></i></button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                        {enrolledCourses.slice(0, 3).map((course) => {
                            const totalEps = course.episodes?.length || 0;
                            const compEps = completedEpisodes[course.id]?.length || 0;
                            const progress = totalEps === 0 ? 0 : Math.round((compEps / totalEps) * 100);
                            
                            return (
                                <div key={course.id} style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.2s' }} onClick={() => setActiveTab('my_courses')} onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'} onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}>
                                    <div style={{ padding: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', fontSize: '1.2rem' }}>
                                                <i className='bx bx-code-alt'></i>
                                            </div>
                                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{course.title}</h3>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Progress</span>
                                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: progress === 100 ? '#10b981' : '#4f46e5' }}>{progress}%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: progress === 100 ? '#10b981' : '#4f46e5', borderRadius: '3px' }}></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        
                        {enrolledCourses.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', padding: '30px', textAlign: 'center', color: '#94a3b8', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                No active courses to display.
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (activeTab === 'my_courses') {
            return (
                <DashboardCourses 
                    courses={courses} 
                    enrolledCourseIds={currentUser?.enrolledCourseIds || []}
                    completedEpisodes={completedEpisodes}
                    updateUserProgress={updateUserProgress}
                    onCourseClick={() => onNavigate('courses')}
                    onGenerateCertificate={handleGenerateCertificate}
                />
            );
        }

        if (activeTab === 'orders') {
            const myOrders = (orders || []).filter(o => o.email === currentUser?.email || o.studentName === currentUser?.name);
            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 30px 0' }}>My Orders</h2>
                    
                    {myOrders.length === 0 ? (
                        <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '12px', textAlign: 'center', color: '#64748b', border: '1px dashed #cbd5e1' }}>
                            <i className='bx bx-receipt' style={{ fontSize: '3rem', color: '#94a3b8', marginBottom: '10px' }}></i>
                            <p style={{ margin: 0, fontSize: '1.1rem' }}>You don't have any orders yet.</p>
                        </div>
                    ) : (
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.9rem' }}>
                                            <th style={{ padding: '15px 20px', fontWeight: '600' }}>Order ID</th>
                                            <th style={{ padding: '15px 20px', fontWeight: '600' }}>Course</th>
                                            <th style={{ padding: '15px 20px', fontWeight: '600' }}>Amount</th>
                                            <th style={{ padding: '15px 20px', fontWeight: '600' }}>Status</th>
                                            <th style={{ padding: '15px 20px', fontWeight: '600' }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myOrders.map((order) => (
                                            <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '15px 20px', color: '#0f172a', fontWeight: '500', fontFamily: 'monospace' }}>{order.id}</td>
                                                <td style={{ padding: '15px 20px', color: '#0f172a' }}>{order.courseTitle}</td>
                                                <td style={{ padding: '15px 20px', color: '#0f172a', fontWeight: '500' }}>₹{order.amount}</td>
                                                <td style={{ padding: '15px 20px' }}>
                                                    <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: order.status === 'PAID' ? '#dcfce7' : order.status === 'FAILED' ? '#fee2e2' : order.status === 'REFUNDED' ? '#fef3c7' : '#f1f5f9', color: order.status === 'PAID' ? '#16a34a' : order.status === 'FAILED' ? '#dc2626' : order.status === 'REFUNDED' ? '#d97706' : '#64748b' }}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '15px 20px', color: '#64748b', fontSize: '0.9rem' }}>{order.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        if (activeTab === 'certificates') {
            const certs = currentUser?.certificates || [];
            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 30px 0' }}>My Certificates</h2>
                    {certs.length === 0 ? (
                        <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '12px', textAlign: 'center', color: '#64748b', border: '1px dashed #cbd5e1' }}>
                            <i className='bx bx-certification' style={{ fontSize: '3rem', color: '#94a3b8', marginBottom: '10px' }}></i>
                            <p style={{ margin: 0, fontSize: '1.1rem' }}>You haven't earned any certificates yet.</p>
                            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>Complete a course 100% to unlock its certificate.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                            {certs.map((cert, i) => (
                                <div key={i} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '25px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: '50%', zIndex: 0 }}></div>
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                                <i className='bx bxs-certification'></i>
                                            </div>
                                            <div>
                                                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>{cert.courseTitle}</h3>
                                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>Win Tech Academy</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontSize: '0.9rem' }}>
                                            <div>
                                                <span style={{ color: '#94a3b8', display: 'block' }}>Completed</span>
                                                <span style={{ color: '#0f172a', fontWeight: '600' }}>{cert.date}</span>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{ color: '#94a3b8', display: 'block' }}>ID</span>
                                                <span style={{ color: '#0f172a', fontWeight: '600' }}>{cert.id}</span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <button onClick={() => setSelectedCertificate(cert)} style={{ flex: 1, padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>
                                                <i className='bx bx-show' style={{ marginRight: '5px' }}></i> View
                                            </button>
                                            <button onClick={() => { setSelectedCertificate(cert); setTimeout(() => window.print(), 500); }} style={{ flex: 1, padding: '10px', backgroundColor: 'white', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                                                <i className='bx bx-download' style={{ marginRight: '5px' }}></i> Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (activeTab === 'wishlist') {
            const wishlistIds = currentUser?.wishlistCourseIds || [];
            const wishlistCourses = courses.filter(c => wishlistIds.includes(c.id));
            
            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 30px 0' }}>My Wishlist ❤️</h2>
                    {wishlistCourses.length === 0 ? (
                        <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '12px', textAlign: 'center', color: '#64748b', border: '1px dashed #cbd5e1' }}>
                            <i className='bx bx-heart' style={{ fontSize: '3rem', color: '#94a3b8', marginBottom: '10px' }}></i>
                            <p style={{ margin: 0, fontSize: '1.1rem' }}>Your wishlist is empty.</p>
                            <button onClick={() => onNavigate('courses')} style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Explore Courses</button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                            {wishlistCourses.map(course => (
                                <CourseCard 
                                    key={course.id} 
                                    course={course} 
                                    isLocked={true}
                                    onClick={() => onNavigate('courses')} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (activeTab === 'profile') {
            return (
                <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 30px 0' }}>My Profile</h2>
                    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', gap: '40px', alignItems: 'center', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold' }}>
                            {currentUser?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Full Name</p>
                                <h3 style={{ margin: '5px 0 0 0', color: '#0f172a', fontSize: '1.4rem' }}>{currentUser?.name}</h3>
                            </div>
                            <div>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Student ID</p>
                                <div style={{ display: 'inline-block', marginTop: '5px', backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '5px 12px', borderRadius: '6px', fontWeight: '600', fontSize: '1.1rem' }}>
                                    {currentUser?.id}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
                                <div>
                                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Email</p>
                                    <p style={{ margin: '5px 0 0 0', color: '#334155', fontWeight: '500' }}>{currentUser?.email}</p>
                                </div>
                                <div>
                                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Phone (Optional)</p>
                                    <p style={{ margin: '5px 0 0 0', color: '#334155', fontWeight: '500' }}>+91 XXXXX XXXXX</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Account Settings</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <button onClick={() => setActiveTab('security')} style={{ padding: '15px 20px', textAlign: 'left', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#334155', fontWeight: '500', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                Security (Passwords & Devices) <i className='bx bx-chevron-right'></i>
                            </button>
                            <button style={{ padding: '15px 20px', textAlign: 'left', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#334155', fontWeight: '500', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                Email Preferences <i className='bx bx-chevron-right'></i>
                            </button>
                            <button onClick={onLogout} style={{ padding: '15px 20px', textAlign: 'left', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#ef4444', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                Logout of Account <i className='bx bx-log-out'></i>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeTab === 'security') {
            const handleLogoutDevice = () => {
                const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
                const userIndex = users.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    users[userIndex].active_device_id = null;
                    users[userIndex].active_device_name = null;
                    localStorage.setItem('mockUsers', JSON.stringify(users));
                    onLogout(); // log them out since they revoked their device
                }
            };

            return (
                <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
                    <button onClick={() => setActiveTab('profile')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: 0, marginBottom: '20px', fontWeight: '500' }}>
                        <i className='bx bx-arrow-back'></i> Back to Profile
                    </button>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 30px 0' }}>Security Settings</h2>
                    
                    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 5px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}><i className='bx bx-devices'></i> Your Account Security</h3>
                        <p style={{ color: '#64748b', margin: '0 0 25px 0', fontSize: '0.95rem' }}>Only one active device is allowed per account. To use another device, verify your account and switch devices upon login.</p>
                        
                        <h4 style={{ margin: '0 0 10px 0', color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Device</h4>
                        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '50px', height: '50px', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                                    <i className='bx bx-laptop'></i>
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.1rem' }}>{currentUser?.active_device_name || 'Current Device'}</h4>
                                    <p style={{ margin: 0, color: '#10b981', fontSize: '0.9rem', fontWeight: '500' }}>● Active now</p>
                                </div>
                            </div>
                            <button onClick={handleLogoutDevice} style={{ padding: '10px 15px', backgroundColor: 'white', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                                Logout This Device
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // Placeholder for Settings
        return (
            <div style={{ padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#64748b', fontSize: '1.2rem', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ textAlign: 'center' }}>
                    <i className='bx bx-time-five' style={{ fontSize: '3rem', marginBottom: '15px', color: '#cbd5e1' }}></i>
                    <p style={{ margin: 0 }}>This section is currently under construction.</p>
                </div>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
            <DashboardHeader 
                currentUser={currentUser} 
                notifications={notifications} 
                setNotifications={setNotifications} 
                onLogout={onLogout}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onNavigate={onNavigate}
            />
            
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <aside style={{ width: '250px', backgroundColor: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', padding: '20px 0', fontFamily: 'Inter, sans-serif', overflowY: 'auto' }}>
                    <div style={{ flex: 1 }}>
                        {sidebarItems.map(item => (
                            <button 
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                style={{ 
                                    width: '100%', padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '15px', background: 'none', border: 'none', cursor: 'pointer',
                                    color: activeTab === item.id ? '#4f46e5' : '#64748b',
                                    backgroundColor: activeTab === item.id ? '#eff6ff' : 'transparent',
                                    borderRight: activeTab === item.id ? '3px solid #4f46e5' : '3px solid transparent',
                                    fontWeight: activeTab === item.id ? '600' : '500',
                                    fontSize: '1rem', transition: 'all 0.2s', textAlign: 'left'
                                }}
                            >
                                <i className={`bx ${item.icon}`} style={{ fontSize: '1.3rem' }}></i> {item.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                        <button 
                            onClick={onLogout}
                            style={{ 
                                width: '100%', padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '15px', background: 'none', border: 'none', cursor: 'pointer',
                                color: '#ef4444', fontWeight: '500', fontSize: '1rem', transition: 'all 0.2s', textAlign: 'left'
                            }}
                        >
                            <i className='bx bx-log-out' style={{ fontSize: '1.3rem' }}></i> Logout
                        </button>
                    </div>
                </aside>

                <main style={{ flex: 1, overflowY: 'auto' }}>
                    {renderMainContent()}
                </main>
            </div>

            {selectedCertificate && (
                <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#f8fafc', borderRadius: '12px', padding: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.4rem' }}>Certificate Viewer</h3>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button onClick={() => window.print()} style={{ padding: '8px 16px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <i className='bx bx-printer'></i> Print / Save PDF
                                </button>
                                <button onClick={() => setSelectedCertificate(null)} style={{ padding: '8px 16px', backgroundColor: 'white', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                                    Close
                                </button>
                            </div>
                        </div>
                        
                        <div className="print-area">
                            <CertificateRenderer 
                                settings={certificateSettings} 
                                certificateData={{ 
                                    studentName: currentUser?.name || 'Student', 
                                    courseName: selectedCertificate.courseTitle, 
                                    date: selectedCertificate.date, 
                                    id: selectedCertificate.id 
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
