import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="#" className="logo">
                    <img src="/logo.png" alt="WIN TECH" style={{ height: '50px', objectFit: 'contain' }} />
                </a>
                <div className="nav-menu" style={{ display: menuOpen ? 'flex' : '' }}>
                    <a href="#home" className="nav-link active">Home</a>
                    <a href="#courses" className="nav-link">Courses</a>
                    <a href="#features" className="nav-link">Why Us</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </div>
                <div className="nav-actions">
                    <a href="#" className="btn-login">Login</a>
                    <a href="#" className="btn-primary">Sign Up</a>
                    <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        <i className='bx bx-menu'></i>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
