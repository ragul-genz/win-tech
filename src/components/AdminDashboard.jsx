import React, { useState, useRef } from 'react';
import Logo from './Logo';
import CertificateRenderer from './CertificateRenderer';
const AdminDashboard = ({ loggedUsers, courses, setCourses, blogs, setBlogs, setNotifications, adminStudents, setAdminStudents, certificateSettings, setCertificateSettings, orders, setOrders, onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentProfileTab, setStudentProfileTab] = useState('overview'); // overview, courses, orders, certificates
    const [settingsTab, setSettingsTab] = useState('certificates'); // certificates, blogs
    const [showCertificatePreview, setShowCertificatePreview] = useState(false);
    const [studentSearch, setStudentSearch] = useState('');
    const [studentCourseFilter, setStudentCourseFilter] = useState('All Courses');
    const [studentStatusFilter, setStudentStatusFilter] = useState('All');
    
    const [orderSearch, setOrderSearch] = useState('');
    const [orderStatusFilter, setOrderStatusFilter] = useState('All');
    const [orderCourseFilter, setOrderCourseFilter] = useState('All Courses');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderCurrentPage, setOrderCurrentPage] = useState(1);
    const ordersPerPage = 20;

    const [expandedProgressId, setExpandedProgressId] = useState(null); // For course progress accordion
    
    // Add Course State
    const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    const [newCourse, setNewCourse] = useState({
        title: '', level: 'Beginner', description: '', duration: '', price: '', image: '', status: 'Draft'
    });

    // Episode Management State
    const [showAddEpisodeModal, setShowAddEpisodeModal] = useState(false);
    const [editingEpisodeId, setEditingEpisodeId] = useState(null);
    const [newEpisode, setNewEpisode] = useState({
        title: '', description: '', videoUrl: '', duration: '', isPreview: false, status: 'Draft'
    });
    const dragItem = useRef();
    const dragOverItem = useRef();

    // Add Blog State
    const [newBlog, setNewBlog] = useState({
        title: '', content: '', image: '', author: 'Admin'
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
                instructor: "Admin",
                progress: 0,
                inLibrary: false,
                episodes: [],
                image: newCourse.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
                ...newCourse
            };
            setCourses([...courses, courseToAdd]);
            setNotifications(prev => [{ id: Date.now(), title: "New Course Added", message: `The course "${newCourse.title}" is now in Draft.`, read: false, time: new Date().toISOString() }, ...prev]);
            setNewCourse({ title: '', level: 'Beginner', description: '', duration: '', price: '', image: '', status: 'Draft' });
            setShowAddCourseModal(false);
        }
    };

    const handleSaveEpisode = (e) => {
        e.preventDefault();
        const updatedCourses = courses.map(c => {
            if (c.id === selectedCourse.id) {
                let updatedEpisodes = [...(c.episodes || [])];
                if (editingEpisodeId) {
                    updatedEpisodes = updatedEpisodes.map(ep => ep.id === editingEpisodeId ? { ...ep, ...newEpisode } : ep);
                } else {
                    updatedEpisodes.push({ id: Date.now(), ...newEpisode });
                }
                const updatedCourse = { ...c, episodes: updatedEpisodes };
                setSelectedCourse(updatedCourse); // Update local view
                return updatedCourse;
            }
            return c;
        });
        setCourses(updatedCourses);
        setShowAddEpisodeModal(false);
        setEditingEpisodeId(null);
        setNewEpisode({ title: '', description: '', videoUrl: '', duration: '', isPreview: false, status: 'Draft' });
    };

    const handleDeleteEpisode = (courseId, episodeId) => {
        if(window.confirm("Are you sure you want to delete this episode?")) {
            const updatedCourses = courses.map(c => {
                if (c.id === courseId) {
                    const updatedCourse = { ...c, episodes: c.episodes.filter(ep => ep.id !== episodeId) };
                    setSelectedCourse(updatedCourse);
                    return updatedCourse;
                }
                return c;
            });
            setCourses(updatedCourses);
        }
    };

    const handleDuplicateEpisode = (courseId, episode) => {
        const updatedCourses = courses.map(c => {
            if (c.id === courseId) {
                const newEp = { ...episode, id: Date.now(), title: `${episode.title} (Copy)`, status: 'Draft' };
                const updatedCourse = { ...c, episodes: [...c.episodes, newEp] };
                setSelectedCourse(updatedCourse);
                return updatedCourse;
            }
            return c;
        });
        setCourses(updatedCourses);
    };

    // Drag and Drop Logic
    const dragStart = (e, position) => {
        dragItem.current = position;
    };
    
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyListItems = [...(selectedCourse.episodes || [])];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        
        const updatedCourses = courses.map(c => {
            if (c.id === selectedCourse.id) {
                const updatedCourse = { ...c, episodes: copyListItems };
                setSelectedCourse(updatedCourse);
                return updatedCourse;
            }
            return c;
        });
        setCourses(updatedCourses);
    };

    const sidebarItems = [
        { id: 'dashboard', icon: 'bx-home-alt', label: 'Dashboard' },
        { id: 'courses', icon: 'bx-book-open', label: 'Courses' },
        { id: 'students', icon: 'bx-user', label: 'Students' },
        { id: 'orders', icon: 'bx-credit-card', label: 'Orders' },
        { id: 'certificates', icon: 'bx-certification', label: 'Certificates' },
        { id: 'coupons', icon: 'bx-purchase-tag', label: 'Coupons' },
        { id: 'reviews', icon: 'bx-star', label: 'Reviews' },
        { id: 'settings', icon: 'bx-cog', label: 'Settings' }
    ];

    const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', marginTop: '6px', fontSize: '0.95rem' };
    const labelStyle = { display: 'block', fontWeight: '500', color: '#1e293b', fontSize: '0.9rem' };

    const renderMainContent = () => {
        if (activeTab === 'dashboard') {
            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 10px 0' }}>Good afternoon, Admin 👋</h1>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '30px' }}>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Courses</p>
                            <h2 style={{ margin: 0, fontSize: '2.5rem', color: '#0f172a' }}>{courses.length}</h2>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Students</p>
                            <h2 style={{ margin: 0, fontSize: '2.5rem', color: '#0f172a' }}>1,284</h2>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Orders</p>
                            <h2 style={{ margin: 0, fontSize: '2.5rem', color: '#0f172a' }}>856</h2>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px', marginBottom: '40px' }}>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Total Revenue</p>
                            <h2 style={{ margin: 0, fontSize: '2.5rem', color: '#10b981' }}>₹8,42,500</h2>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Active Users</p>
                            <h2 style={{ margin: 0, fontSize: '2.5rem', color: '#4f46e5' }}>342</h2>
                        </div>
                    </div>

                    <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 20px 0' }}>Recent Orders</h2>
                    <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Student</th>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Course</th>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '15px 25px', color: '#0f172a', fontWeight: '500' }}>Arun</td>
                                    <td style={{ padding: '15px 25px', color: '#475569' }}>Full Stack</td>
                                    <td style={{ padding: '15px 25px', color: '#10b981', fontWeight: '600' }}>₹2,999</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '15px 25px', color: '#0f172a', fontWeight: '500' }}>Kumar</td>
                                    <td style={{ padding: '15px 25px', color: '#475569' }}>Python</td>
                                    <td style={{ padding: '15px 25px', color: '#10b981', fontWeight: '600' }}>₹1,999</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (activeTab === 'courses') {
            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a' }}>Manage Courses</h2>
                        <button onClick={() => setShowAddCourseModal(true)} style={{ padding: '12px 24px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className='bx bx-plus'></i> Add New Course
                        </button>
                    </div>

                    <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Course</th>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Status</th>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Price</th>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (
                                    <tr key={course.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '15px 25px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ width: '50px', height: '40px', borderRadius: '6px', backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '1rem', color: '#0f172a' }}>{course.title}</h3>
                                                    <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>{course.episodes?.length || 0} Episodes</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '15px 25px' }}>
                                            <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', backgroundColor: course.status === 'Published' ? '#dcfce7' : '#f1f5f9', color: course.status === 'Published' ? '#16a34a' : '#64748b' }}>
                                                {course.status || 'Draft'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px 25px', color: '#0f172a', fontWeight: '500' }}>₹{course.price}</td>
                                        <td style={{ padding: '15px 25px', textAlign: 'right' }}>
                                            <button 
                                                onClick={() => { setSelectedCourse(course); setActiveTab('manage_course'); }}
                                                style={{ padding: '8px 16px', backgroundColor: '#f8fafc', color: '#4f46e5', border: '1px solid #e2e8f0', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                            >
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {showAddCourseModal && (
                        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#0f172a' }}>Add New Course</h2>
                                    <button onClick={() => setShowAddCourseModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>&times;</button>
                                </div>
                                <form onSubmit={handleAddCourse} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div><label style={labelStyle}>Course Title *</label><input type="text" value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} style={inputStyle} required /></div>
                                    <div><label style={labelStyle}>Course Description *</label><textarea value={newCourse.description} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} style={{ ...inputStyle, minHeight: '80px' }} required /></div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div><label style={labelStyle}>Price (₹) *</label><input type="number" value={newCourse.price} onChange={(e) => setNewCourse({...newCourse, price: e.target.value})} style={inputStyle} required /></div>
                                        <div><label style={labelStyle}>Course Image *</label><input type="file" accept="image/*" onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => setNewCourse({...newCourse, image: reader.result});
                                                reader.readAsDataURL(file);
                                            }
                                        }} style={inputStyle} required /></div>
                                    </div>
                                    <button type="submit" style={{ padding: '12px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Create Course (Draft)</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        if (activeTab === 'manage_course' && selectedCourse) {
            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ marginBottom: '30px' }}>
                        <button onClick={() => setActiveTab('courses')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: 0, marginBottom: '15px', fontWeight: '500' }}>
                            <i className='bx bx-arrow-back'></i> Back to Courses
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '2rem', color: '#0f172a' }}>{selectedCourse.title}</h2>
                                <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Manage your course details and episodes.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button style={{ padding: '10px 20px', backgroundColor: 'white', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Edit Details</button>
                                <button 
                                    onClick={() => {
                                        const updatedCourses = courses.map(c => c.id === selectedCourse.id ? { ...c, status: c.status === 'Published' ? 'Draft' : 'Published' } : c);
                                        setCourses(updatedCourses);
                                        setSelectedCourse({ ...selectedCourse, status: selectedCourse.status === 'Published' ? 'Draft' : 'Published' });
                                    }}
                                    style={{ padding: '10px 20px', backgroundColor: selectedCourse.status === 'Published' ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    {selectedCourse.status === 'Published' ? 'Unpublish Course' : 'Publish Course'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.2rem' }}>Episodes</h3>
                        <button 
                            onClick={() => { setEditingEpisodeId(null); setNewEpisode({ title: '', description: '', videoUrl: '', duration: '', isPreview: false, status: 'Draft' }); setShowAddEpisodeModal(true); }}
                            style={{ padding: '10px 20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <i className='bx bx-plus'></i> Add Episode
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(!selectedCourse.episodes || selectedCourse.episodes.length === 0) ? (
                            <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
                                No episodes added yet. Click "Add Episode" to get started.
                            </div>
                        ) : (
                            selectedCourse.episodes.map((episode, index) => (
                                <div 
                                    key={episode.id}
                                    onDragStart={(e) => dragStart(e, index)}
                                    onDragEnter={(e) => dragEnter(e, index)}
                                    onDragEnd={drop}
                                    draggable
                                    style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '15px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', cursor: 'grab' }}
                                >
                                    <i className='bx bx-menu' style={{ color: '#94a3b8', fontSize: '1.5rem', marginRight: '20px', cursor: 'grab' }}></i>
                                    <div style={{ width: '40px', height: '40px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '20px' }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {episode.title}
                                            {episode.isPreview && <span style={{ padding: '2px 8px', backgroundColor: '#fef3c7', color: '#d97706', fontSize: '0.75rem', borderRadius: '10px', fontWeight: 'bold' }}>FREE PREVIEW</span>}
                                        </h4>
                                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>{episode.duration || '00:00'} • {episode.status || 'Draft'}</p>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button 
                                                onClick={() => { setEditingEpisodeId(episode.id); setNewEpisode(episode); setShowAddEpisodeModal(true); }}
                                                style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '1.2rem', padding: '5px' }} title="Edit"
                                            >
                                                <i className='bx bx-edit'></i>
                                            </button>
                                            <button 
                                                onClick={() => handleDuplicateEpisode(selectedCourse.id, episode)}
                                                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem', padding: '5px' }} title="Duplicate"
                                            >
                                                <i className='bx bx-copy'></i>
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteEpisode(selectedCourse.id, episode.id)}
                                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem', padding: '5px' }} title="Delete"
                                            >
                                                <i className='bx bx-trash'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {showAddEpisodeModal && (
                        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#0f172a' }}>{editingEpisodeId ? 'Edit Episode' : 'Add Episode'}</h2>
                                    <button onClick={() => { setShowAddEpisodeModal(false); setEditingEpisodeId(null); }} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>&times;</button>
                                </div>
                                <form onSubmit={handleSaveEpisode} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div><label style={labelStyle}>Episode Title *</label><input type="text" value={newEpisode.title} onChange={(e) => setNewEpisode({...newEpisode, title: e.target.value})} style={inputStyle} required /></div>
                                    <div><label style={labelStyle}>Description</label><textarea value={newEpisode.description} onChange={(e) => setNewEpisode({...newEpisode, description: e.target.value})} style={{ ...inputStyle, minHeight: '80px' }} /></div>
                                    
                                    <div style={{ border: '2px dashed #cbd5e1', padding: '20px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
                                        <i className='bx bx-upload' style={{ fontSize: '2rem', color: '#94a3b8' }}></i>
                                        <p style={{ margin: '10px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>Click or drag video to upload (Mock)</p>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div><label style={labelStyle}>Duration (MM:SS)</label><input type="text" value={newEpisode.duration} onChange={(e) => setNewEpisode({...newEpisode, duration: e.target.value})} style={inputStyle} placeholder="e.g. 12:35" /></div>
                                        <div><label style={labelStyle}>Status</label><select value={newEpisode.status} onChange={(e) => setNewEpisode({...newEpisode, status: e.target.value})} style={inputStyle}><option value="Draft">Draft</option><option value="Published">Published</option></select></div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <input type="checkbox" id="freePreview" checked={newEpisode.isPreview} onChange={(e) => setNewEpisode({...newEpisode, isPreview: e.target.checked})} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                                        <label htmlFor="freePreview" style={{ fontWeight: '500', color: '#0f172a', cursor: 'pointer' }}>Set as Free Preview</label>
                                    </div>

                                    <button type="submit" style={{ padding: '12px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Save Episode</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        if (activeTab === 'students') {
            const filteredStudents = (adminStudents || []).filter(s => {
                const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.email.toLowerCase().includes(studentSearch.toLowerCase());
                const matchesStatus = studentStatusFilter === 'All' || s.status === studentStatusFilter;
                const matchesCourse = studentCourseFilter === 'All Courses' || s.enrollments?.some(e => {
                    const c = courses.find(course => course.id === e.courseId);
                    return c && c.title === studentCourseFilter;
                });
                return matchesSearch && matchesStatus && matchesCourse;
            });

            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a' }}>Students</h2>
                        <button style={{ padding: '12px 24px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className='bx bx-plus'></i> Add Student
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', backgroundColor: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                            <i className='bx bx-search' style={{ position: 'absolute', left: '15px', top: '12px', color: '#94a3b8', fontSize: '1.2rem' }}></i>
                            <input 
                                type="text" 
                                placeholder="Search name / email..." 
                                value={studentSearch}
                                onChange={(e) => setStudentSearch(e.target.value)}
                                style={{ width: '100%', padding: '10px 15px 10px 45px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>
                        <select value={studentStatusFilter} onChange={(e) => setStudentStatusFilter(e.target.value)} style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', minWidth: '150px' }}>
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                        <select value={studentCourseFilter} onChange={(e) => setStudentCourseFilter(e.target.value)} style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', minWidth: '200px' }}>
                            <option value="All Courses">All Courses</option>
                            {courses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                        </select>
                    </div>

                    <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Student</th>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Email</th>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Courses</th>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Joined</th>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Status</th>
                                    <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '15px 25px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{student.avatar}</div>
                                                <span style={{ fontWeight: '600', color: '#0f172a' }}>{student.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '15px 25px', color: '#475569' }}>{student.email}</td>
                                        <td style={{ padding: '15px 25px', color: '#475569' }}>{student.enrollments?.length || 0}</td>
                                        <td style={{ padding: '15px 25px', color: '#475569' }}>{student.joinedDate}</td>
                                        <td style={{ padding: '15px 25px' }}>
                                            <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', backgroundColor: student.status === 'Active' ? '#dcfce7' : '#fee2e2', color: student.status === 'Active' ? '#16a34a' : '#ef4444' }}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px 25px', textAlign: 'right' }}>
                                            <button 
                                                onClick={() => { setSelectedStudent(student); setActiveTab('student_profile'); setStudentProfileTab('overview'); }}
                                                style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: '600', cursor: 'pointer' }}
                                            >
                                                View Student →
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (activeTab === 'student_profile' && selectedStudent) {
            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ marginBottom: '30px' }}>
                        <button onClick={() => setActiveTab('students')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: 0, marginBottom: '20px', fontWeight: '500' }}>
                            <i className='bx bx-arrow-back'></i> Back to Students
                        </button>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
                                    {selectedStudent.avatar}
                                </div>
                                <div>
                                    <h2 style={{ margin: '0 0 5px 0', fontSize: '2rem', color: '#0f172a' }}>{selectedStudent.name}</h2>
                                    <p style={{ margin: '0 0 5px 0', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <i className='bx bx-envelope'></i> {selectedStudent.email}
                                    </p>
                                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Joined {selectedStudent.joinedDate} • <span style={{ color: selectedStudent.status === 'Active' ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>● {selectedStudent.status}</span></p>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    const newStatus = selectedStudent.status === 'Active' ? 'Suspended' : 'Active';
                                    const updatedStudents = adminStudents.map(s => s.id === selectedStudent.id ? { ...s, status: newStatus } : s);
                                    setAdminStudents(updatedStudents);
                                    setSelectedStudent({ ...selectedStudent, status: newStatus });
                                }}
                                style={{ padding: '10px 20px', backgroundColor: 'white', color: selectedStudent.status === 'Active' ? '#ef4444' : '#10b981', border: `1px solid ${selectedStudent.status === 'Active' ? '#fca5a5' : '#6ee7b7'}`, borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                <i className={selectedStudent.status === 'Active' ? 'bx bx-block' : 'bx bx-check-circle'}></i> {selectedStudent.status === 'Active' ? 'Suspend Student' : 'Activate Student'}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '30px', borderBottom: '1px solid #e2e8f0', marginBottom: '30px' }}>
                        {['overview', 'courses', 'orders', 'certificates'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setStudentProfileTab(tab)}
                                style={{ padding: '15px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.05rem', fontWeight: studentProfileTab === tab ? '600' : '500', color: studentProfileTab === tab ? '#4f46e5' : '#64748b', borderBottom: studentProfileTab === tab ? '3px solid #4f46e5' : '3px solid transparent', textTransform: 'capitalize' }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {studentProfileTab === 'overview' && (
                        <div>
                            <h3 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Overview</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                                <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <p style={{ margin: '0 0 10px 0', color: '#64748b', fontWeight: '500' }}>Total Courses</p>
                                    <h2 style={{ margin: 0, fontSize: '2rem', color: '#0f172a' }}>{selectedStudent.enrollments?.length || 0}</h2>
                                </div>
                                <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <p style={{ margin: '0 0 10px 0', color: '#64748b', fontWeight: '500' }}>Completed</p>
                                    <h2 style={{ margin: 0, fontSize: '2rem', color: '#0f172a' }}>{selectedStudent.enrollments?.filter(e => e.progressPercentage === 100).length || 0}</h2>
                                </div>
                                <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <p style={{ margin: '0 0 10px 0', color: '#64748b', fontWeight: '500' }}>Certificates</p>
                                    <h2 style={{ margin: 0, fontSize: '2rem', color: '#0f172a' }}>{selectedStudent.certificates?.length || 0}</h2>
                                </div>
                                <div style={{ backgroundColor: '#4f46e5', padding: '25px', borderRadius: '12px', color: 'white' }}>
                                    <p style={{ margin: '0 0 10px 0', color: '#c7d2fe', fontWeight: '500' }}>Total Spent</p>
                                    <h2 style={{ margin: 0, fontSize: '2rem' }}>₹{selectedStudent.spent}</h2>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '30px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <h4 style={{ margin: '0 0 15px 0', color: '#0f172a', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><i className='bx bx-laptop'></i> Registered Device</h4>
                                {selectedStudent.active_device_id ? (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ margin: '0 0 5px 0', color: '#0f172a', fontWeight: '600' }}>{selectedStudent.active_device_name}</p>
                                            <p style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '0.9rem' }}>Device ID: {selectedStudent.active_device_id}</p>
                                            <p style={{ margin: 0, color: '#10b981', fontSize: '0.8rem', fontWeight: '500' }}>● Currently Active</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button 
                                                onClick={() => {
                                                    const updatedStudents = adminStudents.map(s => s.id === selectedStudent.id ? { ...s, active_device_id: null, active_device_name: null } : s);
                                                    setAdminStudents(updatedStudents);
                                                    setSelectedStudent({ ...selectedStudent, active_device_id: null, active_device_name: null });
                                                    
                                                    // Sync with actual login system (mocked)
                                                    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
                                                    const userIndex = users.findIndex(u => u.email === selectedStudent.email);
                                                    if (userIndex !== -1) {
                                                        users[userIndex].active_device_id = null;
                                                        localStorage.setItem('mockUsers', JSON.stringify(users));
                                                    }
                                                    alert('Device revoked and user logged out.');
                                                }}
                                                style={{ padding: '10px 20px', backgroundColor: 'white', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                                            >
                                                Revoke Device
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p style={{ margin: 0, color: '#64748b' }}>No device registered currently.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {studentProfileTab === 'courses' && (
                        <div>
                            <h3 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Enrolled Courses</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {(selectedStudent.enrollments || []).map((enrollment, idx) => {
                                    const c = courses.find(course => course.id === enrollment.courseId);
                                    if (!c) return null;
                                    const isExpanded = expandedProgressId === enrollment.courseId;
                                    return (
                                        <div key={idx} style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                            <div style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ flex: 1, paddingRight: '40px' }}>
                                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#0f172a' }}>{c.title}</h4>
                                                    <p style={{ margin: '0 0 15px 0', color: '#64748b', fontSize: '0.9rem' }}>{enrollment.totalCount} Episodes • Last watched: {enrollment.lastWatched}</p>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                        <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                                            <div style={{ width: `${enrollment.progressPercentage}%`, height: '100%', backgroundColor: enrollment.progressPercentage === 100 ? '#10b981' : '#4f46e5' }}></div>
                                                        </div>
                                                        <span style={{ fontWeight: 'bold', color: enrollment.progressPercentage === 100 ? '#10b981' : '#4f46e5' }}>{enrollment.progressPercentage}%</span>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    {enrollment.progressPercentage === 100 ? (
                                                        <button style={{ padding: '10px 20px', backgroundColor: '#ecfdf5', color: '#10b981', border: '1px solid #a7f3d0', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px', display: 'block', width: '100%' }}>🎓 View Certificate</button>
                                                    ) : null}
                                                    <button 
                                                        onClick={() => setExpandedProgressId(isExpanded ? null : enrollment.courseId)}
                                                        style={{ padding: '10px 20px', backgroundColor: 'white', color: '#4f46e5', border: '1px solid #c7d2fe', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', width: '100%', justifyContent: 'center' }}
                                                    >
                                                        {isExpanded ? 'Hide Progress' : 'View Progress'} <i className={`bx bx-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                                                    </button>
                                                </div>
                                            </div>

                                            {isExpanded && (
                                                <div style={{ backgroundColor: '#f8fafc', padding: '25px', borderTop: '1px solid #e2e8f0' }}>
                                                    <h4 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Overall Progress: {enrollment.progressPercentage}%</h4>
                                                    {enrollment.modules?.map((mod, midx) => (
                                                        <div key={midx} style={{ marginBottom: '20px' }}>
                                                            <h5 style={{ margin: '0 0 10px 0', color: '#475569', fontSize: '1rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '5px' }}>{mod.name}</h5>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                {mod.episodes.map(ep => (
                                                                    <div key={ep.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>
                                                                        {ep.status === 'completed' && <i className='bx bxs-check-circle' style={{ color: '#10b981', fontSize: '1.2rem' }}></i>}
                                                                        {ep.status === 'playing' && <i className='bx bxs-right-arrow-circle' style={{ color: '#4f46e5', fontSize: '1.2rem' }}></i>}
                                                                        {ep.status === 'locked' && <i className='bx bx-circle' style={{ color: '#cbd5e1', fontSize: '1.2rem' }}></i>}
                                                                        <span>{ep.title}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {studentProfileTab === 'orders' && (
                        <div>
                            <h3 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Order History</h3>
                            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Order ID</th>
                                            <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Course</th>
                                            <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Amount</th>
                                            <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Status</th>
                                            <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(selectedStudent.orders || []).map((order, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                                <td style={{ padding: '15px 25px', color: '#4f46e5', fontWeight: '600' }}>{order.id}</td>
                                                <td style={{ padding: '15px 25px', color: '#0f172a' }}>{order.courseName}</td>
                                                <td style={{ padding: '15px 25px', color: '#10b981', fontWeight: '600' }}>₹{order.amount}</td>
                                                <td style={{ padding: '15px 25px' }}><span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', backgroundColor: '#dcfce7', color: '#16a34a' }}>{order.status}</span></td>
                                                <td style={{ padding: '15px 25px', color: '#64748b' }}>{order.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {studentProfileTab === 'certificates' && (
                        <div>
                            <h3 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Earned Certificates</h3>
                            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Certificate ID</th>
                                            <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Course</th>
                                            <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>Date Issued</th>
                                            <th style={{ padding: '15px 25px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem', textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(selectedStudent.certificates || []).map((cert, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '15px 25px', color: '#4f46e5', fontWeight: '600' }}>{cert.id}</td>
                                                <td style={{ padding: '15px 25px', color: '#0f172a' }}>{cert.courseName}</td>
                                                <td style={{ padding: '15px 25px', color: '#64748b' }}>{cert.date}</td>
                                                <td style={{ padding: '15px 25px', textAlign: 'right' }}>
                                                    <button style={{ padding: '6px 12px', backgroundColor: 'white', color: '#4f46e5', border: '1px solid #c7d2fe', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginRight: '10px' }}>View</button>
                                                    <button style={{ padding: '6px 12px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Download</button>
                                                </td>
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


        if (activeTab === 'settings') {
            const handleImageUpload = (e, field) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setCertificateSettings({ ...certificateSettings, [field]: reader.result });
                    };
                    reader.readAsDataURL(file);
                }
            };

            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 30px 0' }}>Platform Settings</h2>
                    
                    <div style={{ display: 'flex', gap: '30px', borderBottom: '1px solid #e2e8f0', marginBottom: '30px' }}>
                        {['certificates', 'blogs'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setSettingsTab(tab)}
                                style={{ padding: '15px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.05rem', fontWeight: settingsTab === tab ? '600' : '500', color: settingsTab === tab ? '#4f46e5' : '#64748b', borderBottom: settingsTab === tab ? '3px solid #4f46e5' : '3px solid transparent', textTransform: 'capitalize' }}
                            >
                                {tab === 'blogs' ? 'Publish Blog' : 'Certificate Template'}
                            </button>
                        ))}
                    </div>

                    {settingsTab === 'blogs' && (
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
                            <h2 style={{ margin: '0 0 30px 0', fontSize: '1.4rem', color: '#0f172a' }}>Publish a New Blog</h2>
                            <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div><label style={labelStyle}>Blog Title *</label><input type="text" value={newBlog.title} onChange={(e) => setNewBlog({...newBlog, title: e.target.value})} style={inputStyle} required /></div>
                                <div><label style={labelStyle}>Image URL</label><input type="url" value={newBlog.image} onChange={(e) => setNewBlog({...newBlog, image: e.target.value})} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Content *</label><textarea value={newBlog.content} onChange={(e) => setNewBlog({...newBlog, content: e.target.value})} style={{ ...inputStyle, minHeight: '150px' }} required /></div>
                                <button type="submit" style={{ padding: '15px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.05rem', cursor: 'pointer' }}>Publish Blog</button>
                            </form>
                        </div>
                    )}

                    {settingsTab === 'certificates' && (
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <div>
                                    <h2 style={{ margin: '0 0 5px 0', fontSize: '1.4rem', color: '#0f172a' }}>Certificate Settings</h2>
                                    <p style={{ margin: 0, color: '#64748b' }}>Configure the template for student certificates.</p>
                                </div>
                                <button onClick={() => setShowCertificatePreview(true)} style={{ padding: '10px 20px', backgroundColor: 'white', color: '#4f46e5', border: '1px solid #c7d2fe', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className='bx bx-show'></i> Preview Certificate
                                </button>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                {/* Branding */}
                                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '30px' }}>
                                    <h3 style={{ margin: '0 0 20px 0', color: '#0f172a', fontSize: '1.1rem' }}>Branding</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={labelStyle}>Platform Name</label>
                                            <input type="text" value={certificateSettings.platformName} onChange={(e) => setCertificateSettings({...certificateSettings, platformName: e.target.value})} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Platform Logo</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                {certificateSettings.logo && <img src={certificateSettings.logo} alt="Logo" style={{ height: '40px', objectFit: 'contain' }} />}
                                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Text & Variables */}
                                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '30px' }}>
                                    <h3 style={{ margin: '0 0 20px 0', color: '#0f172a', fontSize: '1.1rem' }}>Template Text</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div>
                                            <label style={labelStyle}>Certificate Title</label>
                                            <input type="text" value={certificateSettings.title} onChange={(e) => setCertificateSettings({...certificateSettings, title: e.target.value})} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={{...labelStyle, marginBottom: '5px'}}>Certificate Body Text</label>
                                            <p style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.85rem' }}>Available variables: {'{student_name}'}, {'{course_name}'}</p>
                                            <textarea value={certificateSettings.textTemplate} onChange={(e) => setCertificateSettings({...certificateSettings, textTemplate: e.target.value})} style={{ ...inputStyle, minHeight: '120px', fontFamily: 'monospace' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Signature */}
                                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '30px' }}>
                                    <h3 style={{ margin: '0 0 20px 0', color: '#0f172a', fontSize: '1.1rem' }}>Signature & Authority</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={labelStyle}>Signatory Name</label>
                                            <input type="text" value={certificateSettings.signatoryName} onChange={(e) => setCertificateSettings({...certificateSettings, signatoryName: e.target.value})} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Designation</label>
                                            <input type="text" value={certificateSettings.designation} onChange={(e) => setCertificateSettings({...certificateSettings, designation: e.target.value})} style={inputStyle} />
                                        </div>
                                        <div style={{ gridColumn: 'span 2' }}>
                                            <label style={labelStyle}>Signature Image</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                {certificateSettings.signature && <img src={certificateSettings.signature} alt="Signature" style={{ height: '40px', objectFit: 'contain' }} />}
                                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'signature')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Verification */}
                                <div>
                                    <h3 style={{ margin: '0 0 20px 0', color: '#0f172a', fontSize: '1.1rem' }}>Tracking & Verification</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={labelStyle}>Certificate ID Prefix</label>
                                            <input type="text" value={certificateSettings.idPrefix} onChange={(e) => setCertificateSettings({...certificateSettings, idPrefix: e.target.value})} style={inputStyle} placeholder="e.g. CERT" />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                                <input type="checkbox" checked={certificateSettings.enableQR} onChange={(e) => setCertificateSettings({...certificateSettings, enableQR: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                                                <span style={{ color: '#0f172a', fontWeight: '500' }}>Enable QR Code on Certificate</span>
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                                <input type="checkbox" checked={certificateSettings.enableVerification} onChange={(e) => setCertificateSettings({...certificateSettings, enableVerification: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                                                <span style={{ color: '#0f172a', fontWeight: '500' }}>Enable Verification Page URL</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        if (activeTab === 'orders') {
            const filteredOrders = (orders || []).filter(order => {
                const matchesSearch = 
                    order.id.toLowerCase().includes(orderSearch.toLowerCase()) || 
                    order.studentName.toLowerCase().includes(orderSearch.toLowerCase()) || 
                    order.email.toLowerCase().includes(orderSearch.toLowerCase());
                
                const matchesStatus = orderStatusFilter === 'All' || order.status === orderStatusFilter.toUpperCase();
                const matchesCourse = orderCourseFilter === 'All Courses' || order.courseTitle === orderCourseFilter;
                
                return matchesSearch && matchesStatus && matchesCourse;
            });

            const totalRevenue = (orders || []).filter(o => o.status === 'PAID').reduce((sum, o) => sum + o.amount, 0);

            const handleRefund = (orderId) => {
                if (window.confirm("Are you sure you want to refund this order? This action cannot be undone.")) {
                    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'REFUNDED' } : o));
                    alert("Order refunded successfully.");
                    setSelectedOrder(null);
                }
            };

            const downloadCSV = () => {
                const headers = ['Order ID', 'Student', 'Email', 'Course', 'Amount', 'Payment Method', 'Payment ID', 'Status', 'Date'];
                const csvData = filteredOrders.map(o => [o.id, o.studentName, o.email, o.courseTitle, o.amount, o.paymentMethod, o.paymentId, o.status, o.date].join(','));
                const csvContent = [headers.join(','), ...csvData].join('\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'orders_export.csv';
                a.click();
            };

            if (selectedOrder) {
                return (
                    <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                        <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
                            <i className='bx bx-left-arrow-alt'></i> Back to Orders
                        </button>
                        
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px' }}>
                                <div>
                                    <h2 style={{ margin: '0 0 10px 0', fontSize: '1.8rem', color: '#0f172a' }}>Order #{selectedOrder.id}</h2>
                                    <div style={{ display: 'flex', gap: '20px', color: '#64748b', fontSize: '0.95rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: selectedOrder.status === 'PAID' ? '#10b981' : selectedOrder.status === 'FAILED' ? '#ef4444' : selectedOrder.status === 'REFUNDED' ? '#f59e0b' : '#64748b' }}></span>
                                            {selectedOrder.status}
                                        </span>
                                        <span>Order Date: {selectedOrder.date}</span>
                                    </div>
                                </div>
                                {selectedOrder.status === 'PAID' && (
                                    <button onClick={() => handleRefund(selectedOrder.id)} style={{ padding: '10px 20px', backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                                        Refund Order
                                    </button>
                                )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                                <div>
                                    <h3 style={{ margin: '0 0 15px 0', color: '#0f172a', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Customer</h3>
                                    <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#0f172a', fontSize: '1.1rem' }}>{selectedOrder.studentName}</p>
                                        <p style={{ margin: 0, color: '#64748b' }}>{selectedOrder.email}</p>
                                        <p style={{ margin: '10px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>User ID: {selectedOrder.userId}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 15px 0', color: '#0f172a', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Course</h3>
                                    <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#0f172a', fontSize: '1.1rem' }}>{selectedOrder.courseTitle}</p>
                                        <p style={{ margin: 0, color: '#4f46e5', fontWeight: 'bold' }}>₹{selectedOrder.amount}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 15px 0', color: '#0f172a', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Payment</h3>
                                    <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Amount</span><span style={{ fontWeight: '600' }}>₹{selectedOrder.amount}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Method</span><span style={{ fontWeight: '600' }}>{selectedOrder.paymentMethod}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Payment ID</span><span style={{ fontWeight: '600', fontFamily: 'monospace' }}>{selectedOrder.paymentId}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Transaction ID</span><span style={{ fontWeight: '600', fontFamily: 'monospace' }}>{selectedOrder.transactionId}</span></div>
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 15px 0', color: '#0f172a', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Enrollment</h3>
                                    <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        {selectedOrder.status === 'PAID' ? (
                                            <>
                                                <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}><i className='bx bxs-check-circle'></i> Active</p>
                                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Enrolled on {selectedOrder.date}</p>
                                            </>
                                        ) : selectedOrder.status === 'REFUNDED' ? (
                                            <>
                                                <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '5px' }}><i className='bx bxs-error-circle'></i> Revoked</p>
                                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Enrollment cancelled due to refund</p>
                                            </>
                                        ) : (
                                            <>
                                                <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '5px' }}><i className='bx bxs-x-circle'></i> Not Enrolled</p>
                                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Payment not successful</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '0 0 5px 0' }}>Orders</h2>
                            <p style={{ margin: 0, color: '#64748b' }}>Manage all course purchases and payments</p>
                        </div>
                        <button onClick={downloadCSV} style={{ padding: '10px 20px', backgroundColor: 'white', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className='bx bx-export'></i> Export
                        </button>
                    </div>

                    {/* KPI Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                            <p style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>Total Orders</p>
                            <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a' }}>{orders?.length || 0}</h3>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                            <p style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>Paid Orders</p>
                            <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#10b981' }}>{(orders || []).filter(o => o.status === 'PAID').length}</h3>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                            <p style={{ margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>Total Revenue</p>
                            <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a' }}>₹{totalRevenue.toLocaleString()}</h3>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <i className='bx bx-search' style={{ position: 'absolute', left: '15px', top: '12px', color: '#94a3b8', fontSize: '1.2rem' }}></i>
                                <input 
                                    type="text" 
                                    placeholder="Search Order ID, Student, Email..." 
                                    value={orderSearch}
                                    onChange={(e) => setOrderSearch(e.target.value)}
                                    style={{ width: '100%', padding: '10px 10px 10px 45px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', boxSizing: 'border-box' }}
                                />
                            </div>
                            <select value={orderStatusFilter} onChange={(e) => setOrderStatusFilter(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', backgroundColor: 'white' }}>
                                <option value="All">Status: All</option>
                                <option value="PAID">Paid</option>
                                <option value="FAILED">Failed</option>
                                <option value="REFUNDED">Refunded</option>
                                <option value="PENDING">Pending</option>
                            </select>
                            <select value={orderCourseFilter} onChange={(e) => setOrderCourseFilter(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', backgroundColor: 'white' }}>
                                <option value="All Courses">Course: All</option>
                                {[...new Set((orders || []).map(o => o.courseTitle))].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        {(() => {
                            const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
                            const currentOrders = filteredOrders.slice((orderCurrentPage - 1) * ordersPerPage, orderCurrentPage * ordersPerPage);
                            const startItem = (orderCurrentPage - 1) * ordersPerPage + 1;
                            const endItem = Math.min(orderCurrentPage * ordersPerPage, filteredOrders.length);
                            
                            return (
                                <>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.9rem' }}>
                                                    <th style={{ padding: '15px 20px', fontWeight: '600' }}>Order ID</th>
                                                    <th style={{ padding: '15px 20px', fontWeight: '600' }}>Student</th>
                                                    <th style={{ padding: '15px 20px', fontWeight: '600' }}>Course</th>
                                                    <th style={{ padding: '15px 20px', fontWeight: '600' }}>Amount</th>
                                                    <th style={{ padding: '15px 20px', fontWeight: '600' }}>Status</th>
                                                    <th style={{ padding: '15px 20px', fontWeight: '600' }}>Date</th>
                                                    <th style={{ padding: '15px 20px', fontWeight: '600', textAlign: 'center' }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentOrders.length > 0 ? currentOrders.map((order) => (
                                                    <tr key={order.id} onClick={() => setSelectedOrder(order)} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', position: 'relative' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                        <td style={{ padding: '15px 20px', color: '#0f172a', fontWeight: '500', fontFamily: 'monospace' }}>{order.id}</td>
                                                        <td style={{ padding: '15px 20px', color: '#0f172a' }}>
                                                            <div>{order.studentName}</div>
                                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{order.email}</div>
                                                        </td>
                                                        <td style={{ padding: '15px 20px', color: '#475569' }}>{order.courseTitle}</td>
                                                        <td style={{ padding: '15px 20px', color: '#0f172a', fontWeight: '500' }}>₹{order.amount}</td>
                                                        <td style={{ padding: '15px 20px' }}>
                                                            <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: order.status === 'PAID' ? '#dcfce7' : order.status === 'FAILED' ? '#fee2e2' : order.status === 'REFUNDED' ? '#fef3c7' : '#f1f5f9', color: order.status === 'PAID' ? '#16a34a' : order.status === 'FAILED' ? '#dc2626' : order.status === 'REFUNDED' ? '#d97706' : '#64748b' }}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '15px 20px', color: '#64748b', fontSize: '0.9rem' }}>{order.date}</td>
                                                        <td style={{ padding: '15px 20px', textAlign: 'center', position: 'relative' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#64748b' }}>
                                                                <span style={{ fontSize: '0.9rem', color: '#4f46e5', fontWeight: '500' }}>View Order</span>
                                                                <i className='bx bx-dots-vertical-rounded' style={{ fontSize: '1.2rem' }}></i>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No orders found matching your criteria.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    {filteredOrders.length > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 0 20px', borderTop: '1px solid #e2e8f0', marginTop: '10px' }}>
                                            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                                Showing {startItem}–{endItem} of {filteredOrders.length}
                                            </div>
                                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                                <button 
                                                    disabled={orderCurrentPage === 1}
                                                    onClick={() => setOrderCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    style={{ padding: '8px 12px', backgroundColor: 'transparent', border: '1px solid #e2e8f0', borderRadius: '6px', color: orderCurrentPage === 1 ? '#cbd5e1' : '#475569', cursor: orderCurrentPage === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}
                                                >
                                                    <i className='bx bx-left-arrow-alt'></i> Previous
                                                </button>
                                                
                                                {[...Array(totalPages)].map((_, idx) => {
                                                    const pageNum = idx + 1;
                                                    // Simple pagination rendering logic (just 1 2 3 for now, keeping it simple as there are only a few pages)
                                                    if (pageNum === 1 || pageNum === totalPages || Math.abs(orderCurrentPage - pageNum) <= 1) {
                                                        return (
                                                            <button 
                                                                key={pageNum}
                                                                onClick={() => setOrderCurrentPage(pageNum)}
                                                                style={{ width: '35px', height: '35px', backgroundColor: orderCurrentPage === pageNum ? '#4f46e5' : 'transparent', color: orderCurrentPage === pageNum ? 'white' : '#475569', border: orderCurrentPage === pageNum ? 'none' : '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                                                            >
                                                                {pageNum}
                                                            </button>
                                                        );
                                                    } else if (Math.abs(orderCurrentPage - pageNum) === 2) {
                                                        return <span key={pageNum} style={{ color: '#94a3b8' }}>...</span>;
                                                    }
                                                    return null;
                                                })}
                                                
                                                <button 
                                                    disabled={orderCurrentPage === totalPages}
                                                    onClick={() => setOrderCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                    style={{ padding: '8px 12px', backgroundColor: 'transparent', border: '1px solid #e2e8f0', borderRadius: '6px', color: orderCurrentPage === totalPages ? '#cbd5e1' : '#475569', cursor: orderCurrentPage === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}
                                                >
                                                    Next <i className='bx bx-right-arrow-alt'></i>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            );
        }

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
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50, fontFamily: 'Inter, sans-serif' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <a href="#" style={{ textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '8px', color: 'white' }}>
                                <i className='bx bx-code-alt' style={{ fontSize: '1.5rem' }}></i>
                            </div>
                            <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a', fontWeight: '800' }}>LOGO <span style={{ color: '#4f46e5', fontWeight: '600' }}>/ ADMIN PANEL</span></h1>
                        </div>
                    </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', color: '#475569', cursor: 'pointer' }}>
                        <i className='bx bx-bell'></i>
                    </button>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        A
                    </div>
                </div>
            </header>
            
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
            
            {showCertificatePreview && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#f8fafc', borderRadius: '12px', padding: '40px' }}>
                        <button onClick={() => setShowCertificatePreview(false)} style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', fontSize: '2rem', color: '#64748b', cursor: 'pointer' }}>&times;</button>
                        <h3 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Live Preview</h3>
                        <CertificateRenderer 
                            settings={certificateSettings} 
                            certificateData={{ studentName: 'John Doe', courseName: 'Full Stack Development', date: new Date().toLocaleDateString(), id: `${certificateSettings?.idPrefix || 'CERT'}-123456` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
