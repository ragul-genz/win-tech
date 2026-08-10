import React, { useState } from 'react';

const AdminDashboard = ({ loggedUsers, courses, setCourses, blogs, setBlogs, setNotifications, onLogout }) => {
    const [newCourse, setNewCourse] = useState({
        title: '',
        level: 'Beginner',
        description: '',
        duration: '',
        studentsEnrolled: '',
        rating: '',
        mode: 'Online + Offline',
        certification: 'Yes - Certificate Included',
        image: '',
        videoUrl: '',
        price: '',
        syllabus: '',
        whatsappTemplate: ''
    });

    const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'users'
    const [userSearch, setUserSearch] = useState('');
    const [userDeviceFilter, setUserDeviceFilter] = useState('All');

    const formatTime = (isoString) => {
        if (!isoString) return 'Just now';
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const [newBlog, setNewBlog] = useState({
        title: '',
        content: '',
        image: '',
        author: 'Admin'
    });

    const handleAddBlog = (e) => {
        e.preventDefault();
        if (newBlog.title && newBlog.content) {
            setBlogs([...blogs, { id: Date.now(), ...newBlog, date: new Date().toLocaleDateString() }]);
            setNotifications(prev => [{ id: Date.now(), title: "New Blog Added", message: `The blog "${newBlog.title}" has been published.`, read: false, time: new Date().toISOString() }, ...prev]);
            setNewBlog({ title: '', content: '', image: '', author: 'Admin' });
            alert("Blog added successfully!");
        }
    };

    const handleAddCourse = (e) => {
        e.preventDefault();
        if (newCourse.title && newCourse.description) {
            const courseToAdd = {
                id: Date.now(),
                title: newCourse.title,
                instructor: "Admin", // default since instructor was removed from the new design
                progress: 0,
                inLibrary: false,
                image: newCourse.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
                ...newCourse
            };
            setCourses([...courses, courseToAdd]);
            setNotifications(prev => [{ id: Date.now(), title: "New Course Available", message: `The course "${newCourse.title}" is now available.`, read: false, time: new Date().toISOString() }, ...prev]);
            setNewCourse({ 
                title: '', level: 'Beginner', description: '', duration: '', studentsEnrolled: '', rating: '', mode: 'Online + Offline', certification: 'Yes - Certificate Included', image: '', videoUrl: '', price: '', syllabus: '', whatsappTemplate: '' 
            });
            alert("Course added successfully!");
        }
    };

    const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', marginTop: '6px', fontSize: '0.95rem' };
    const labelStyle = { display: 'block', fontWeight: '500', color: '#1e293b', fontSize: '0.95rem' };

    const TabButton = ({ id, icon, label }) => {
        const isActive = activeTab === id;
        return (
            <button 
                onClick={() => setActiveTab(id)}
                style={{ 
                    background: 'none', border: 'none', padding: '10px 15px', cursor: 'pointer', fontSize: '1.05rem', 
                    fontWeight: isActive ? '600' : '500', color: isActive ? '#4f46e5' : '#64748b', 
                    borderBottom: isActive ? '3px solid #4f46e5' : '3px solid transparent',
                    display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                }}>
                <i className={icon}></i>
                {label}
            </button>
        );
    };

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <i className='bx bx-briefcase' style={{ fontSize: '1.5rem', color: '#4f46e5' }}></i>
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a' }}>Admin Workspace</h1>
                            <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '1rem' }}>Manage your platform easily</p>
                        </div>
                    </div>
                    <button 
                        onClick={onLogout}
                        style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #e2e8f0' }}>
                    <TabButton id="courses" icon="bx bx-book-open" label="Courses" />
                    <TabButton id="users" icon="bx bx-group" label="Users" />
                    <TabButton id="blogs" icon="bx bx-news" label="Blogs" />
                </div>

                {/* Main Content Layout */}
                {activeTab === 'courses' && (
                    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        
                        {/* Left Column - Form */}
                        <div style={{ flex: '3 1 600px', backgroundColor: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                            <h2 style={{ margin: '0 0 30px 0', fontSize: '1.4rem', color: '#0f172a' }}>Publish a New Course</h2>
                            
                            <form onSubmit={handleAddCourse} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* Row 1 */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <label style={labelStyle}>Course Title *</label>
                                        <input type="text" value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} style={inputStyle} placeholder="e.g. MERN Stack Development" required />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Level *</label>
                                        <select value={newCourse.level} onChange={(e) => setNewCourse({...newCourse, level: e.target.value})} style={inputStyle} required>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div>
                                    <label style={labelStyle}>Course Description *</label>
                                    <textarea value={newCourse.description} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} placeholder="Brief description of the course..." required />
                                </div>

                                {/* Row 3 */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <label style={labelStyle}>Duration</label>
                                        <input type="text" value={newCourse.duration} onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})} style={inputStyle} placeholder="e.g. 4 Months" />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Students Enrolled</label>
                                        <input type="text" value={newCourse.studentsEnrolled} onChange={(e) => setNewCourse({...newCourse, studentsEnrolled: e.target.value})} style={inputStyle} placeholder="e.g. 120+" />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Rating</label>
                                        <input type="text" value={newCourse.rating} onChange={(e) => setNewCourse({...newCourse, rating: e.target.value})} style={inputStyle} placeholder="e.g. 4.9" />
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <label style={labelStyle}>Mode</label>
                                        <select value={newCourse.mode} onChange={(e) => setNewCourse({...newCourse, mode: e.target.value})} style={inputStyle}>
                                            <option value="Online + Offline">Online + Offline</option>
                                            <option value="Online">Online</option>
                                            <option value="Offline">Offline</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Certification Included?</label>
                                        <select value={newCourse.certification} onChange={(e) => setNewCourse({...newCourse, certification: e.target.value})} style={inputStyle}>
                                            <option value="Yes - Certificate Included">Yes - Certificate Included</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <label style={labelStyle}>Price (₹) *</label>
                                        <input type="number" value={newCourse.price} onChange={(e) => setNewCourse({...newCourse, price: e.target.value})} style={inputStyle} placeholder="e.g. 4999" required />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>🖼️ Course Image URL *</label>
                                        <input type="url" value={newCourse.image} onChange={(e) => setNewCourse({...newCourse, image: e.target.value})} style={inputStyle} placeholder="https://example.com/course-image.jpg" required />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>🎥 Course Video URL</label>
                                        <input type="url" value={newCourse.videoUrl} onChange={(e) => setNewCourse({...newCourse, videoUrl: e.target.value})} style={inputStyle} placeholder="https://youtube.com/..." />
                                    </div>
                                </div>

                                {/* Row 6 */}
                                <div>
                                    <label style={labelStyle}>Syllabus Highlights (comma separated)</label>
                                    <input type="text" value={newCourse.syllabus} onChange={(e) => setNewCourse({...newCourse, syllabus: e.target.value})} style={inputStyle} placeholder="HTML/CSS, React.js, Node.js, MongoDB, REST APIs, Deployment" />
                                </div>

                                {/* Row 7 */}
                                <div>
                                    <label style={labelStyle}>💬 WhatsApp Enroll Message Template *</label>
                                    <textarea value={newCourse.whatsappTemplate} onChange={(e) => setNewCourse({...newCourse, whatsappTemplate: e.target.value})} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} placeholder="Hi! I'm interested in the MERN Stack course. Please share the fee details and batch schedule." required />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <button type="submit" style={{ padding: '14px 30px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)' }}>
                                        Publish Course
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column - Courses Preview Card */}
                        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                 <h2 style={{ margin: '0 0 20px 0', fontSize: '1.2rem', color: '#0f172a' }}>Active Courses ({courses.length})</h2>
                                 <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {courses.slice(0, 5).map(course => (
                                        <div key={course.id} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                            <img src={course.image} alt={course.title} style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
                                            <div>
                                                <p style={{ margin: 0, fontWeight: '600', color: '#1e293b', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>{course.title}</p>
                                                <p style={{ margin: '3px 0 0 0', color: '#10b981', fontSize: '0.85rem', fontWeight: '600' }}>₹{course.price || 4999}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {courses.length > 5 && <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', textAlign: 'center' }}>+ {courses.length - 5} more courses</p>}
                                 </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab Content */}
                {activeTab === 'users' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        {/* Stats Overview */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', borderLeft: '4px solid #4f46e5' }}>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Total Active Users</p>
                                <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: '#0f172a' }}>{loggedUsers.length}</h3>
                            </div>
                            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', borderLeft: '4px solid #10b981' }}>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Mobile Users</p>
                                <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: '#0f172a' }}>
                                    {loggedUsers.filter(u => {
                                        const dev = u.device || '';
                                        return dev.includes('Android') || dev.includes('iOS') || dev.includes('Mobile');
                                    }).length}
                                </h3>
                            </div>
                            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', borderLeft: '4px solid #f59e0b' }}>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Desktop Users</p>
                                <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: '#0f172a' }}>
                                    {loggedUsers.filter(u => {
                                        const dev = u.device || '';
                                        return !dev.includes('Android') && !dev.includes('iOS') && !dev.includes('Mobile');
                                    }).length}
                                </h3>
                            </div>
                        </div>

                        {/* Search and Filter */}
                        <div style={{ display: 'flex', gap: '15px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', alignItems: 'center' }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <i className='bx bx-search' style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.2rem' }}></i>
                                <input 
                                    type="text" 
                                    placeholder="Search by User ID..." 
                                    value={userSearch}
                                    onChange={(e) => setUserSearch(e.target.value)}
                                    style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', fontSize: '0.95rem' }}
                                />
                            </div>
                            <div style={{ width: '200px' }}>
                                <select 
                                    value={userDeviceFilter}
                                    onChange={(e) => setUserDeviceFilter(e.target.value)}
                                    style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', fontSize: '0.95rem' }}
                                >
                                    <option value="All">All Devices</option>
                                    <option value="Mobile">Mobile Only</option>
                                    <option value="Desktop">Desktop Only</option>
                                </select>
                            </div>
                        </div>

                        {/* User Cards Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                            {loggedUsers
                                .filter(user => {
                                    const uId = (user.userId || user).toLowerCase();
                                    return uId.includes(userSearch.toLowerCase());
                                })
                                .filter(user => {
                                    if (userDeviceFilter === 'All') return true;
                                    const dev = user.device || '';
                                    const isMobile = dev.includes('Android') || dev.includes('iOS') || dev.includes('Mobile');
                                    if (userDeviceFilter === 'Mobile') return isMobile;
                                    return !isMobile;
                                })
                                .map((user, idx) => {
                                    const uId = user.userId || user;
                                    const deviceName = user.device || 'Unknown Device';
                                    const isMobile = deviceName.includes('Android') || deviceName.includes('iOS') || deviceName.includes('Mobile');
                                    
                                    return (
                                    <div key={idx} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9' }}>
                                        {/* Card Header: Avatar & Info */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.3rem', flexShrink: 0 }}>
                                                {uId.charAt(0).toUpperCase()}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{uId}</span>
                                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <i className='bx bx-time-five'></i> {formatTime(user.loginTime)}
                                                    </span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', color: '#64748b', fontSize: '0.9rem' }}>
                                                    <i className={isMobile ? 'bx bx-mobile-alt' : 'bx bx-laptop'} style={{ fontSize: '1.1rem', color: '#8b5cf6' }}></i>
                                                    <span>{deviceName}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Body: Activity */}
                                        <div style={{ padding: '10px 15px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                                            <span>{user.activity || 'Active'}</span>
                                        </div>

                                        {/* Card Footer: Actions */}
                                        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                            <button style={{ flex: 1, padding: '8px', backgroundColor: 'transparent', border: '1px solid #e2e8f0', borderRadius: '6px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '0.9rem', transition: 'all 0.2s' }}>
                                                <i className='bx bx-envelope'></i> Message
                                            </button>
                                            <button style={{ padding: '8px 12px', backgroundColor: '#fee2e2', border: 'none', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} title="Force Logout">
                                                <i className='bx bx-power-off'></i>
                                            </button>
                                        </div>
                                    </div>
                                )})}
                                
                                {loggedUsers.length === 0 && (
                                    <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center' }}>
                                        <i className='bx bx-user-x' style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '10px' }}></i>
                                        <h3 style={{ margin: 0, color: '#475569' }}>No Active Users</h3>
                                        <p style={{ color: '#94a3b8', margin: '5px 0 0 0' }}>There are currently no users logged into the platform.</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {/* Blogs Tab Content */}
                {activeTab === 'blogs' && (
                    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        {/* Left Column - Form */}
                        <div style={{ flex: '3 1 600px', backgroundColor: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                            <h2 style={{ margin: '0 0 30px 0', fontSize: '1.4rem', color: '#0f172a' }}>Publish a New Blog</h2>
                            
                            <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={labelStyle}>Blog Title *</label>
                                    <input type="text" value={newBlog.title} onChange={(e) => setNewBlog({...newBlog, title: e.target.value})} style={inputStyle} placeholder="e.g. 5 Tips to Master React" required />
                                </div>

                                <div>
                                    <label style={labelStyle}>Blog Content *</label>
                                    <textarea value={newBlog.content} onChange={(e) => setNewBlog({...newBlog, content: e.target.value})} style={{ ...inputStyle, minHeight: '200px', resize: 'vertical' }} placeholder="Write your blog post here..." required />
                                </div>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <label style={labelStyle}>Author</label>
                                        <input type="text" value={newBlog.author} onChange={(e) => setNewBlog({...newBlog, author: e.target.value})} style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Cover Image URL</label>
                                        <input type="url" value={newBlog.image} onChange={(e) => setNewBlog({...newBlog, image: e.target.value})} style={inputStyle} placeholder="https://example.com/image.jpg" />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <button type="submit" style={{ padding: '14px 30px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', boxShadow: '0 2px 4px rgba(79, 70, 229, 0.3)' }}>
                                        Publish Blog
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column - Blogs Preview List */}
                        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                 <h2 style={{ margin: '0 0 20px 0', fontSize: '1.2rem', color: '#0f172a' }}>Published Blogs ({blogs?.length || 0})</h2>
                                 
                                 {(!blogs || blogs.length === 0) ? (
                                    <div style={{ textAlign: 'center', padding: '20px' }}>
                                        <i className='bx bx-file-blank' style={{ fontSize: '2.5rem', color: '#cbd5e1' }}></i>
                                        <p style={{ color: '#94a3b8', margin: '10px 0 0 0', fontSize: '0.9rem' }}>No blogs published yet.</p>
                                    </div>
                                 ) : (
                                     <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {blogs.slice().reverse().slice(0, 4).map(blog => (
                                            <div key={blog.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                                                {blog.image ? (
                                                    <img src={blog.image} alt={blog.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                                                ) : (
                                                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                                                        <i className='bx bx-news' style={{ fontSize: '1.5rem' }}></i>
                                                    </div>
                                                )}
                                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                                    <p style={{ margin: 0, fontWeight: '600', color: '#1e293b', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{blog.title}</p>
                                                    <p style={{ margin: '3px 0 0 0', color: '#64748b', fontSize: '0.8rem' }}>By {blog.author} • {blog.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {blogs.length > 4 && <p style={{ margin: 0, color: '#4f46e5', fontSize: '0.85rem', textAlign: 'center', cursor: 'pointer', fontWeight: '500' }}>View all {blogs.length} blogs</p>}
                                     </div>
                                 )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
