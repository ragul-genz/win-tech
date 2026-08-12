import React from 'react';
import Logo from './Logo';

const Navbar = ({ currentView, onNavigate, onLoginClick, userRole, currentUser }) => {
    
    const getNavStyle = (viewName) => {
        const isActive = currentView === viewName;
        return {
            background: 'none', 
            border: 'none', 
            color: isActive ? '#4f46e5' : '#475569', 
            fontWeight: isActive ? '700' : '500', 
            cursor: 'pointer', 
            fontSize: '1rem', 
            transition: 'color 0.2s',
            borderBottom: isActive ? '2px solid #4f46e5' : '2px solid transparent',
            padding: '5px 0'
        };
    };

    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => onNavigate('home')}>
                <Logo />
            </div>
            <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <button onClick={() => onNavigate('home')} style={getNavStyle('home')} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = currentView === 'home' ? '#4f46e5' : '#475569'}>Home</button>
                <button onClick={() => onNavigate('about')} style={getNavStyle('about')} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = currentView === 'about' ? '#4f46e5' : '#475569'}>About</button>
                <button onClick={() => onNavigate('courses')} style={getNavStyle('courses')} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = currentView === 'courses' ? '#4f46e5' : '#475569'}>Courses</button>
                <button onClick={() => onNavigate('practice')} style={getNavStyle('practice')} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = currentView === 'practice' ? '#4f46e5' : '#475569'}>Practice</button>
                <button onClick={() => onNavigate('reviews')} style={getNavStyle('reviews')} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = currentView === 'reviews' ? '#4f46e5' : '#475569'}>Reviews</button>
                <button onClick={() => onNavigate('blogs')} style={getNavStyle('blogs')} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = currentView === 'blogs' ? '#4f46e5' : '#475569'}>Blogs</button>
                <button onClick={() => onNavigate('contact')} style={getNavStyle('contact')} onMouseOver={(e) => e.target.style.color = '#4f46e5'} onMouseOut={(e) => e.target.style.color = currentView === 'contact' ? '#4f46e5' : '#475569'}>Contact</button>
            </nav>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {userRole ? (
                    <button onClick={() => onNavigate('dashboard')} style={{ padding: '10px 24px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Go to Dashboard <i className='bx bx-right-arrow-alt'></i>
                    </button>
                ) : (
                    <>
                        <button onClick={() => onLoginClick('login')} style={{ padding: '10px 24px', backgroundColor: 'transparent', color: '#4f46e5', border: '1.5px solid #4f46e5', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>Login</button>
                        <button onClick={() => onLoginClick('signup')} style={{ padding: '10px 24px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)', transition: 'all 0.2s' }}>Sign Up Free</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
