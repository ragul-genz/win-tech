import React, { useState } from 'react';
import Logo from './Logo';

const CoursesPage = ({ onCourseClick, onCourseDetailsClick, courses }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [selectedPrice, setSelectedPrice] = useState('All');



    // Filter logic
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (course.instructor && course.instructor.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
        const matchesPrice = selectedPrice === 'All' || 
                            (selectedPrice === 'Free' && (course.price === 0 || !course.price)) || 
                            (selectedPrice === 'Paid' && course.price > 0);
        return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    const categories = ['All', 'Web Development', 'Programming', 'Data Science', 'AI & ML', 'Cloud', 'Cyber Security'];
    const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
    const prices = ['All', 'Free', 'Paid'];

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 200px)' }}>

            {/* Hero Section with Search */}
            <section style={{ padding: '100px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: 'white' }}>
                <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.2', margin: '0 0 20px 0', maxWidth: '800px', letterSpacing: '-1px' }}>
                    Learn Skills. Build Your Future.
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 0 40px 0', lineHeight: '1.6' }}>
                    Explore our IT Courses and accelerate your career.
                </p>
                
                {/* Search Bar */}
                <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto 20px auto' }}>
                    <i className='bx bx-search' style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#94a3b8' }}></i>
                    <input 
                        type="text" 
                        placeholder="Search courses, skills, or instructors..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '20px 20px 20px 60px', borderRadius: '50px', border: 'none', fontSize: '1.1rem', outline: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                    />
                </div>
            </section>

            {/* Filters & Categories Section */}
            <section id="courses" style={{ padding: '40px 40px 20px 40px', backgroundColor: 'white', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: '70px', zIndex: 900 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* Category Tabs */}
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' }}>
                        {categories.map((cat, i) => (
                            <button 
                                key={i} 
                                onClick={() => setSelectedCategory(cat)}
                                style={{ 
                                    padding: '10px 20px', 
                                    borderRadius: '30px', 
                                    border: 'none', 
                                    whiteSpace: 'nowrap',
                                    fontWeight: '600', 
                                    cursor: 'pointer', 
                                    backgroundColor: selectedCategory === cat ? '#4f46e5' : '#f1f5f9', 
                                    color: selectedCategory === cat ? 'white' : '#475569',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Secondary Filters (Level & Price) */}
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#64748b', fontWeight: '500', fontSize: '0.95rem' }}>Level:</span>
                            <select 
                                value={selectedLevel} 
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#0f172a', fontWeight: '500', backgroundColor: '#f8fafc', cursor: 'pointer' }}
                            >
                                {levels.map(level => <option key={level} value={level}>{level}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#64748b', fontWeight: '500', fontSize: '0.95rem' }}>Price:</span>
                            <select 
                                value={selectedPrice} 
                                onChange={(e) => setSelectedPrice(e.target.value)}
                                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#0f172a', fontWeight: '500', backgroundColor: '#f8fafc', cursor: 'pointer' }}
                            >
                                {prices.map(price => <option key={price} value={price}>{price}</option>)}
                            </select>
                        </div>
                        <div style={{ marginLeft: 'auto', color: '#64748b', fontSize: '0.9rem' }}>
                            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Grid */}
            <section style={{ padding: '60px 40px 100px 40px', backgroundColor: '#f8fafc' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {filteredCourses.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <i className='bx bx-search' style={{ fontSize: '4rem', color: '#cbd5e1', marginBottom: '15px' }}></i>
                            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 10px 0' }}>No courses found</h3>
                            <p style={{ color: '#64748b', margin: 0 }}>Try adjusting your search or filters to find what you're looking for.</p>
                            <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLevel('All'); setSelectedPrice('All'); }} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#f1f5f9', color: '#4f46e5', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Clear All Filters</button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                            {filteredCourses.map(course => (
                                <div key={course.id} onClick={() => onCourseDetailsClick(course)} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column', cursor: 'pointer', border: '1px solid #f1f5f9' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div style={{ height: '200px', backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                        {course.price === 0 && (
                                            <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>FREE</div>
                                        )}
                                    </div>
                                    <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                            <span style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{course.category}</span>
                                            {course.rating && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                    <i className='bx bxs-star'></i> {course.rating}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: '#0f172a', lineHeight: '1.4' }}>{course.title}</h3>
                                        <p style={{ margin: '0 0 15px 0', color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.description}</p>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                {course.instructor ? course.instructor.charAt(0) : 'I'}
                                            </div>
                                            <span style={{ color: '#475569', fontSize: '0.9rem', fontWeight: '500' }}>{course.instructor}</span>
                                        </div>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.85rem' }}>
                                                <i className='bx bx-video'></i> {course.episodes?.length || 10} Episodes
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.85rem' }}>
                                                <i className='bx bx-bar-chart'></i> {course.level || 'Beginner'}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.85rem' }}>
                                                <i className='bx bx-time'></i> {course.duration || '20 Hours'}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>{course.price === 0 ? 'Free' : `₹${course.price}`}</span>
                                                {course.price > 0 && <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹{course.price + 2000}</span>}
                                            </div>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onCourseDetailsClick(course); }}
                                                style={{ padding: '10px 20px', backgroundColor: '#f1f5f9', color: '#4f46e5', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                                                onMouseOver={(e) => { e.target.style.backgroundColor = '#4f46e5'; e.target.style.color = 'white'; }}
                                                onMouseOut={(e) => { e.target.style.backgroundColor = '#f1f5f9'; e.target.style.color = '#4f46e5'; }}
                                            >
                                                View Course
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CoursesPage;
