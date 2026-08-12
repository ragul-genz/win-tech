import React from 'react';
import Logo from './Logo';

const Footer = ({ onNavigate }) => {
    return (
        <footer style={{ padding: '40px', backgroundColor: '#020617', color: '#94a3b8', textAlign: 'center' }}>
            <Logo />
            <h3 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '1.2rem' }}>Platform</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <li><button onClick={() => onNavigate && onNavigate('about')} style={{ color: '#64748b', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>About Us</button></li>
                <li><button onClick={() => onNavigate && onNavigate('courses')} style={{ color: '#64748b', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Courses</button></li>
                <li><button onClick={() => onNavigate && onNavigate('blogs')} style={{ color: '#64748b', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Blogs</button></li>
                <li><button onClick={() => onNavigate && onNavigate('verify')} style={{ color: '#64748b', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Verify Certificate</button></li>
            </ul>
            <p style={{ margin: '20px 0 0 0', fontSize: '0.9rem' }}>&copy; 2026 Win Tech. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
