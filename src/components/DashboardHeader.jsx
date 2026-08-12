import React, { useState } from 'react';
import Logo from './Logo';
const DashboardHeader = ({ notifications = [], setNotifications, currentUser, onLogout, activeTab, setActiveTab, onNavigate }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };
    
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50, fontFamily: 'Inter, sans-serif' }}>
            {/* Left - Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <a href="#" style={{ textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>
                    <Logo />
                </a>
                
                {/* Center - Links */}
                <nav style={{ display: 'flex', gap: '30px', display: 'none', '@media(min-width: 768px)': { display: 'flex' } }}>
                    <button onClick={() => onNavigate('courses')} style={{ background: 'none', border: 'none', color: '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.2s' }}>Courses</button>
                    <button onClick={() => setActiveTab('my_courses')} style={{ background: 'none', border: 'none', color: activeTab === 'my_courses' ? '#4f46e5' : '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.2s' }}>My Learning</button>
                </nav>
            </div>

            {/* Right - Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative' }}>
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{ position: 'relative', cursor: 'pointer', background: showNotifications ? '#f1f5f9' : 'transparent', border: 'none', fontSize: '1.5rem', color: '#475569', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <i className='bx bx-bell'></i>
                        {unreadCount > 0 && (
                            <span style={{ position: 'absolute', top: '5px', right: '5px', width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
                        )}
                    </button>

                    {showNotifications && (
                        <div style={{ position: 'absolute', top: '100%', right: '0', width: '350px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 100, marginTop: '10px', overflow: 'hidden' }}>
                            <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
                                <h3 style={{ margin: 0, fontSize: '1rem', color: '#0f172a' }}>Notifications</h3>
                                {unreadCount > 0 && (
                                    <button onClick={markAllAsRead} style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}>Mark all as read</button>
                                )}
                            </div>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {notifications.length === 0 ? (
                                    <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
                                        <i className='bx bx-bell-off' style={{ fontSize: '2rem', marginBottom: '10px', color: '#cbd5e1' }}></i>
                                        <p style={{ margin: 0, fontSize: '0.9rem' }}>No notifications yet</p>
                                    </div>
                                ) : (
                                    notifications.map(notif => (
                                        <div key={notif.id} onClick={() => markAsRead(notif.id)} style={{ padding: '15px 20px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', backgroundColor: notif.read ? 'white' : '#eff6ff', display: 'flex', gap: '15px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.2rem' }}>
                                                <i className='bx bx-book-open'></i>
                                            </div>
                                            <div>
                                                <h4 style={{ margin: '0 0 5px 0', fontSize: '0.95rem', color: '#0f172a', fontWeight: notif.read ? '500' : '600' }}>{notif.title}</h4>
                                                <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: '#475569', lineHeight: '1.4' }}>{notif.message}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ position: 'relative' }}>
                    <div 
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        style={{ cursor: 'pointer', border: showProfileMenu ? '2px solid #4f46e5' : '2px solid transparent', borderRadius: '50%', width: '40px', height: '40px', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}
                    >
                        {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    
                    {showProfileMenu && (
                        <div style={{ position: 'absolute', top: '100%', right: '0', width: '220px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 100, marginTop: '10px', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                                <p style={{ margin: 0, fontWeight: '600', color: '#0f172a', fontSize: '0.95rem' }}>{currentUser?.name || 'User'}</p>
                                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.8rem' }}>{currentUser?.email || 'user@example.com'}</p>
                            </div>
                            <div style={{ padding: '5px 0' }}>
                                <button onClick={() => { setActiveTab('profile'); setShowProfileMenu(false); }} style={{ width: '100%', textAlign: 'left', padding: '10px 15px', background: 'none', border: 'none', color: '#475569', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <i className='bx bx-user' style={{ fontSize: '1.2rem' }}></i> My Profile
                                </button>
                                <button onClick={onLogout} style={{ width: '100%', textAlign: 'left', padding: '10px 15px', background: 'none', border: 'none', color: '#ef4444', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <i className='bx bx-log-out' style={{ fontSize: '1.2rem' }}></i> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
