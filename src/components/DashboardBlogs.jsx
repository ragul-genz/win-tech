import React, { useState } from 'react';

const DashboardBlogs = ({ blogs, onLike, searchQuery }) => {
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    // If a blog is selected, render the detail view
    if (selectedBlogId) {
        const blog = blogs.find(b => b.id === selectedBlogId);
        if (!blog) {
            setSelectedBlogId(null);
            return null;
        }
        
        return (
            <div style={{ padding: '20px 40px', fontFamily: 'Inter, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
                <button 
                    onClick={() => setSelectedBlogId(null)}
                    style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1rem', fontWeight: '500', marginBottom: '20px' }}>
                    <i className='bx bx-arrow-back'></i> Back to Blogs
                </button>
                
                {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px', marginBottom: '25px' }} />}
                
                <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '15px', lineHeight: '1.2' }}>{blog.title}</h1>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', color: '#64748b', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.9rem', fontWeight: 'bold' }}>
                            {(blog.author || 'A').charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: '500', color: '#334155' }}>{blog.author || 'Admin'}</span>
                    </div>
                    <span>•</span>
                    <span>{blog.date || 'Recently'}</span>
                    <span>•</span>
                    <button 
                        onClick={() => onLike(blog.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: blog.likedByUser ? '#ef4444' : '#64748b', fontSize: '1rem', fontWeight: '600', padding: 0 }}
                    >
                        <i className={blog.likedByUser ? 'bx bxs-heart' : 'bx bx-heart'}></i> {blog.likes || 0} Likes
                    </button>
                </div>
                
                <div style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                    {blog.content}
                </div>
            </div>
        );
    }

    // Filter blogs based on search query
    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '20px 40px', fontFamily: 'Inter, sans-serif' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '30px' }}>
                <i className='bx bx-news' style={{ marginRight: '10px', color: '#4f46e5' }}></i>
                Latest Blogs & Articles
            </h2>
            
            {filteredBlogs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8fafc', borderRadius: '16px' }}>
                    <i className='bx bx-file-blank' style={{ fontSize: '4rem', color: '#cbd5e1' }}></i>
                    <h3 style={{ color: '#475569', margin: '15px 0 5px 0' }}>No Blogs Found</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>There are no blogs matching your search.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                    {filteredBlogs.map(blog => (
                        <div 
                            key={blog.id} 
                            onClick={() => setSelectedBlogId(blog.id)}
                            style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)'; }}
                        >
                            {blog.image ? (
                                <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '200px', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                                    <i className='bx bx-news' style={{ fontSize: '4rem' }}></i>
                                </div>
                            )}
                            
                            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '20px' }}>
                                        {blog.date || 'Recently'}
                                    </span>
                                </div>
                                
                                <h3 style={{ margin: '0 0 15px 0', fontSize: '1.25rem', color: '#0f172a', lineHeight: '1.4' }}>{blog.title}</h3>
                                
                                <p style={{ margin: '0 0 20px 0', color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>
                                    {blog.content.length > 150 ? blog.content.substring(0, 150) + '...' : blog.content}
                                </p>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            {(blog.author || 'A').charAt(0).toUpperCase()}
                                        </div>
                                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>{blog.author || 'Admin'}</span>
                                    </div>
                                    
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onLike(blog.id);
                                        }}
                                        style={{ 
                                            background: blog.likedByUser ? '#fee2e2' : '#f8fafc', 
                                            border: 'none', 
                                            padding: '8px 12px', 
                                            borderRadius: '20px', 
                                            cursor: 'pointer', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '5px',
                                            color: blog.likedByUser ? '#ef4444' : '#64748b',
                                            fontWeight: '600',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <i className={blog.likedByUser ? 'bx bxs-heart' : 'bx bx-heart'} style={{ fontSize: '1.1rem' }}></i>
                                        <span>{blog.likes || 0}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardBlogs;
