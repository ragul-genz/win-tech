import React from 'react';

const Logo = ({ size = '160px' }) => {
    return (
        <div style={{
            width: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <defs>
                    <style>
                        {`
                            @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,900&display=swap');
                            .logo-font {
                                font-family: 'Montserrat', sans-serif;
                                font-weight: 900;
                                font-style: italic;
                            }
                        `}
                    </style>
                </defs>

                {/* Red Icon Background */}
                <rect x="0" y="10" width="80" height="80" rx="15" fill="#E31E24" />
                
                {/* White V Shape */}
                <path d="M 15 30 L 40 80 L 65 30 L 48 30 L 40 50 L 32 30 Z" fill="white" />
                
                {/* Yellow Parallelograms (accents) */}
                <path d="M 52 30 L 60 30 L 56 42 L 48 42 Z" fill="#F8A51B" />
                <path d="M 64 30 L 72 30 L 68 42 L 60 42 Z" fill="#F8A51B" />

                {/* WIN TECH Text */}
                <text x="95" y="70" className="logo-font" fontSize="55" fill="#1A539B" letterSpacing="-2">WIN </text>
                <text x="235" y="70" className="logo-font" fontSize="55" fill="#1A539B" letterSpacing="-2">TEC</text>
                <text x="355" y="70" className="logo-font" fontSize="55" fill="#E31E24" letterSpacing="-2">H</text>

                {/* DIGITAL PARTNER Text */}
                <text x="98" y="90" fontFamily="sans-serif" fontSize="12" fontWeight="700" fill="#666" letterSpacing="4">DIGITAL PARTNER</text>
            </svg>
        </div>
    );
};

export default Logo;
