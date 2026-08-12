import React from 'react';

const BlogsPage = () => {
    const blogs = [
        { id: 1, title: 'Getting Started with React 19', category: 'Frontend', readTime: '5 min read', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80', excerpt: 'Learn the new features of React 19 including compiler optimizations and new hooks.' },
        { id: 2, title: 'Why Python is Still King of AI', category: 'AI & ML', readTime: '8 min read', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80', excerpt: 'Explore the ecosystem of PyTorch, TensorFlow, and why Python dominates the AI landscape.' },
        { id: 3, title: 'Mastering SQL Joins', category: 'Database', readTime: '6 min read', img: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80', excerpt: 'A visual guide to INNER, OUTER, LEFT, and RIGHT joins with practical examples.' },
        { id: 4, title: 'Cybersecurity Best Practices for 2026', category: 'Security', readTime: '10 min read', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80', excerpt: 'Protect your web applications from modern attack vectors and vulnerabilities.' }
    ];

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 200px)' }}>
            {/* Header */}
            <div style={{ padding: '80px 40px', backgroundColor: '#0f172a', color: 'white', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', margin: '0 0 15px 0' }}>Win Tech Blog</h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Insights, tutorials, and tech news from our experts.</p>
            </div>

            <section style={{ padding: '80px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {blogs.map(blog => (
                        <div key={blog.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ height: '200px', backgroundImage: `url(${blog.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div style={{ padding: '25px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.85rem' }}>
                                    <span style={{ color: '#4f46e5', fontWeight: '700' }}>{blog.category}</span>
                                    <span style={{ color: '#64748b' }}><i className='bx bx-time'></i> {blog.readTime}</span>
                                </div>
                                <h3 style={{ margin: '0 0 15px 0', color: '#0f172a', lineHeight: '1.4' }}>{blog.title}</h3>
                                <p style={{ margin: '0 0 20px 0', color: '#64748b', lineHeight: '1.6' }}>{blog.excerpt}</p>
                                <button style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: '600', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    Read More <i className='bx bx-right-arrow-alt'></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogsPage;
