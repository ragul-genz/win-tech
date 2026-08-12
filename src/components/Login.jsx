import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Login = ({ onLogin, onBack, initialView = 'signin' }) => {
    // Views: 'signin' | 'signup' | 'forgot_password' | 'forgot_verify' | 'forgot_reset' | 'email_verify'
    const [view, setView] = useState(initialView); 
    const [currentDeviceId, setCurrentDeviceId] = useState('');
    const [pendingLoginUser, setPendingLoginUser] = useState(null); // Stores user while verifying OTP
    const [otp, setOtp] = useState('');

    useEffect(() => {
        setView(initialView);
        // Ensure a device ID exists for this browser
        let deviceId = localStorage.getItem('current_device_id');
        if (!deviceId) {
            // Simple mock device fingerprint: DV-RandomString
            deviceId = 'DV-' + Math.random().toString(36).substr(2, 6).toUpperCase();
            localStorage.setItem('current_device_id', deviceId);
        }
        setCurrentDeviceId(deviceId);
    }, [initialView]);
    
    // Form States
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleGoogleLogin = () => {
        // Mock Google Auth
        onLogin('user', { fullName: 'Google User', email: 'google@example.com' });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        if (email === 'admin@wintech.com' && password === 'admin@123') {
            onLogin('admin', 'Admin');
        } else if (email === 'admin@wintech.com') {
            setError('Invalid admin password.');
        } else {
            const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                if (user.active_device_id && user.active_device_id !== currentDeviceId) {
                    // Mismatch: Attempting to login from a different device
                    setPendingLoginUser(user);
                    setView('device_verify');
                    setError('');
                } else {
                    // Match or first time: Log them in and bind device
                    user.active_device_id = currentDeviceId;
                    // Mock getting OS/Browser
                    user.active_device_name = navigator.userAgent.includes("Windows") ? "Chrome · Windows" : "Safari · Mac";
                    localStorage.setItem('mockUsers', JSON.stringify(users));
                    onLogin('user', user);
                }
            } else {
                setError('Invalid email or password. Please sign up first.');
            }
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (fullName && email && password) {
            const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
            const userExists = users.some(u => u.email === email);
            
            if (userExists) {
                setError('An account with this email already exists.');
                return;
            }

            users.push({ fullName, email, password });
            localStorage.setItem('mockUsers', JSON.stringify(users));
            
            setView('email_verify');
            setError('');
        } else {
            setError('Please fill all fields.');
        }
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setView('forgot_verify');
            setError('');
        } else {
            setError('Please enter your email.');
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword && newPassword.length > 0) {
            const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
            const userIndex = users.findIndex(u => u.email === email);
            
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('mockUsers', JSON.stringify(users));
                setSuccessMsg('Password successfully changed!');
            } else {
                setSuccessMsg('Password successfully changed! (Mock)');
            }
            
            setView('signin');
            setError('');
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setError('Passwords do not match.');
        }
    };

    const handleDeviceVerify = (e) => {
        e.preventDefault();
        if (otp.length > 0) {
            // Mock OTP verification - any non-empty OTP works for simulation
            const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
            const userIndex = users.findIndex(u => u.email === pendingLoginUser.email);
            if (userIndex !== -1) {
                users[userIndex].active_device_id = currentDeviceId;
                users[userIndex].active_device_name = navigator.userAgent.includes("Windows") ? "Chrome · Windows" : "Safari · Mac";
                localStorage.setItem('mockUsers', JSON.stringify(users));
                onLogin('user', users[userIndex]);
            }
        } else {
            setError('Please enter the OTP.');
        }
    };

    // Shared Styles
    const inputStyle = {
        width: '100%',
        padding: '12px 15px',
        paddingRight: '40px',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        fontSize: '1rem',
        outline: 'none',
        marginTop: '5px',
        boxSizing: 'border-box'
    };
    
    const labelStyle = {
        display: 'block',
        color: '#475569',
        fontSize: '0.9rem',
        fontWeight: '500',
        marginBottom: '15px'
    };

    const btnStyle = {
        width: '100%',
        padding: '14px',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '20px',
        marginBottom: '20px',
        transition: 'background-color 0.2s'
    };

    const googleBtnStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: 'white',
        color: '#334155',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'background-color 0.2s'
    };

    const linkStyle = {
        color: '#4f46e5',
        textDecoration: 'none',
        fontWeight: '600',
        cursor: 'pointer'
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            {/* Left Side - Forms */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '40px', backgroundColor: 'white', position: 'relative', overflowY: 'auto' }}>
                
                {onBack && (
                    <button onClick={onBack} style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b' }}>
                        <i className='bx bx-arrow-back'></i> Back to Home
                    </button>
                )}
                
                <div style={{ maxWidth: '400px', width: '100%', margin: 'auto' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <Logo />
                    </div>

                    {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
                    {successMsg && <div style={{ backgroundColor: '#dcfce3', color: '#15803d', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{successMsg}</div>}

                    {/* --- SIGN IN VIEW --- */}
                    {view === 'signin' && (
                        <>
                            <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 5px 0' }}>Welcome back 👋</h1>
                            <p style={{ color: '#64748b', margin: '0 0 30px 0' }}>Continue your learning journey</p>
                            
                            <form onSubmit={handleSignIn}>
                                <label style={labelStyle}>
                                    Email Address
                                    <input type="text" placeholder="Enter your email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </label>
                                
                                <label style={{...labelStyle, position: 'relative'}}>
                                    Password
                                    <input type={showPassword ? "text" : "password"} placeholder="Enter your password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <i className={showPassword ? 'bx bx-show' : 'bx bx-hide'} onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '35px', cursor: 'pointer', color: '#94a3b8', fontSize: '1.2rem' }}></i>
                                </label>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', cursor: 'pointer' }}>
                                        <input type="checkbox" /> Remember me
                                    </label>
                                    <span style={linkStyle} onClick={() => { setView('forgot_password'); setError(''); setSuccessMsg(''); }}>Forgot Password?</span>
                                </div>

                                <button type="submit" style={btnStyle}>Sign In</button>
                            </form>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                                OR
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                            </div>

                            <button onClick={handleGoogleLogin} style={googleBtnStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{width: '20px'}}/>
                                Continue with Google
                            </button>

                            <p style={{ textAlign: 'center', color: '#64748b', marginTop: '30px', fontSize: '0.95rem' }}>
                                Don't have an account? <span style={linkStyle} onClick={() => { setView('signup'); setError(''); setSuccessMsg(''); }}>Sign Up</span>
                            </p>
                        </>
                    )}

                    {/* --- SIGN UP VIEW --- */}
                    {view === 'signup' && (
                        <>
                            <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 5px 0' }}>Create your account</h1>
                            <p style={{ color: '#64748b', margin: '0 0 30px 0' }}>Start learning today 🚀</p>
                            
                            <form onSubmit={handleSignUp}>
                                <label style={labelStyle}>
                                    Full Name
                                    <input type="text" placeholder="Enter your full name" style={inputStyle} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                </label>

                                <label style={labelStyle}>
                                    Email Address
                                    <input type="email" placeholder="Enter your email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </label>
                                
                                <label style={{...labelStyle, position: 'relative'}}>
                                    Password
                                    <input type={showPassword ? "text" : "password"} placeholder="Enter your password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <i className={showPassword ? 'bx bx-show' : 'bx bx-hide'} onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '35px', cursor: 'pointer', color: '#94a3b8', fontSize: '1.2rem' }}></i>
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.9rem', cursor: 'pointer' }}>
                                    <input type="checkbox" required /> I agree to Terms & Privacy
                                </label>

                                <button type="submit" style={btnStyle}>Create Account</button>
                            </form>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                                OR
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                            </div>

                            <button onClick={handleGoogleLogin} style={googleBtnStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{width: '20px'}}/>
                                Continue with Google
                            </button>

                            <p style={{ textAlign: 'center', color: '#64748b', marginTop: '30px', fontSize: '0.95rem' }}>
                                Already have an account? <span style={linkStyle} onClick={() => { setView('signin'); setError(''); setSuccessMsg(''); }}>Sign In</span>
                            </p>
                        </>
                    )}

                    {/* --- EMAIL VERIFICATION VIEW --- */}
                    {view === 'email_verify' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 20px auto' }}>
                                <i className='bx bx-envelope'></i>
                            </div>
                            <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '0 0 15px 0' }}>Check your email 📩</h1>
                            <p style={{ color: '#64748b', margin: '0 0 30px 0', lineHeight: '1.6' }}>We've sent a verification link to<br/><strong style={{ color: '#0f172a' }}>{email || 'your@email.com'}</strong></p>
                            
                            <button style={{...btnStyle, backgroundColor: '#f1f5f9', color: '#475569', marginTop: 0}}>Resend Email</button>
                            
                            <p style={{ color: '#64748b', marginTop: '20px' }}>Already verified?</p>
                            <button onClick={() => { setSuccessMsg('Account created & verified! Please sign in.'); setView('signin'); }} style={{...btnStyle, marginTop: '10px'}}>Continue</button>
                        </div>
                    )}

                    {/* --- FORGOT PASSWORD (EMAIL) VIEW --- */}
                    {view === 'forgot_password' && (
                        <>
                            <button onClick={() => setView('signin')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', padding: 0 }}>
                                <i className='bx bx-left-arrow-alt'></i> Back to login
                            </button>
                            <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 10px 0' }}>Forgot Password?</h1>
                            <p style={{ color: '#64748b', margin: '0 0 30px 0' }}>No worries, we'll send you reset instructions.</p>
                            
                            <form onSubmit={handleForgotPasswordSubmit}>
                                <label style={labelStyle}>
                                    Email Address
                                    <input type="email" placeholder="Enter your email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </label>
                                <button type="submit" style={btnStyle}>Send Reset Link</button>
                            </form>
                        </>
                    )}

                    {/* --- FORGOT PASSWORD (VERIFY) VIEW --- */}
                    {view === 'forgot_verify' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 20px auto' }}>
                                <i className='bx bx-envelope'></i>
                            </div>
                            <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '0 0 15px 0' }}>Check your email</h1>
                            <p style={{ color: '#64748b', margin: '0 0 30px 0', lineHeight: '1.6' }}>We sent a password reset link to<br/><strong style={{ color: '#0f172a' }}>{email || 'your@email.com'}</strong></p>
                            
                            <button onClick={() => setView('forgot_reset')} style={btnStyle}>Continue (Mock Link Click)</button>
                            <p style={{ color: '#64748b', marginTop: '20px', fontSize: '0.9rem' }}>Didn't receive the email? <span style={linkStyle}>Click to resend</span></p>
                            <button onClick={() => setView('signin')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginTop: '20px' }}>
                                <i className='bx bx-left-arrow-alt'></i> Back to log in
                            </button>
                        </div>
                    )}

                    {/* --- FORGOT PASSWORD (RESET) VIEW --- */}
                    {view === 'forgot_reset' && (
                        <>
                            <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 10px 0' }}>Set new password</h1>
                            <p style={{ color: '#64748b', margin: '0 0 30px 0' }}>Your new password must be different to previously used passwords.</p>
                            
                            <form onSubmit={handleResetPassword}>
                                <label style={{...labelStyle, position: 'relative'}}>
                                    New Password
                                    <input type={showNewPassword ? "text" : "password"} placeholder="Enter new password" style={inputStyle} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                    <i className={showNewPassword ? 'bx bx-show' : 'bx bx-hide'} onClick={() => setShowNewPassword(!showNewPassword)} style={{ position: 'absolute', right: '15px', top: '35px', cursor: 'pointer', color: '#94a3b8', fontSize: '1.2rem' }}></i>
                                </label>

                                <label style={{...labelStyle, position: 'relative'}}>
                                    Confirm Password
                                    <input type={showNewPassword ? "text" : "password"} placeholder="Confirm new password" style={inputStyle} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </label>

                                <button type="submit" style={btnStyle}>Reset Password</button>
                            </form>
                        </>
                    )}

                    {/* --- DEVICE VERIFICATION (OTP) VIEW --- */}
                    {view === 'device_verify' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 20px auto' }}>
                                <i className='bx bx-devices'></i>
                            </div>
                            <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '0 0 10px 0' }}>New device detected</h1>
                            <p style={{ color: '#64748b', margin: '0 0 30px 0', lineHeight: '1.6' }}>Your account is currently active on another device (<strong style={{ color: '#0f172a' }}>{pendingLoginUser?.active_device_name || 'Unknown'}</strong>).<br/><br/>To continue on this device, verify that you own this account.</p>
                            
                            <form onSubmit={handleDeviceVerify}>
                                <label style={{...labelStyle, textAlign: 'left'}}>
                                    Enter OTP sent to your email
                                    <input type="text" placeholder="e.g. 123456" style={{...inputStyle, textAlign: 'center', letterSpacing: '5px', fontSize: '1.2rem'}} value={otp} onChange={(e) => setOtp(e.target.value)} required />
                                </label>
                                <button type="submit" style={btnStyle}>Verify & Switch Device</button>
                            </form>
                            <button onClick={() => { setView('signin'); setPendingLoginUser(null); setError(''); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginTop: '10px' }}>
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Right Side - Image */}
            <div style={{ flex: '1', display: 'none', '@media (min-width: 900px)': { display: 'block' }, position: 'relative' }} className="split-login-right">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" alt="Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.1))' }}></div>
                <div style={{ position: 'absolute', bottom: '60px', left: '60px', color: 'white' }}>
                    <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0' }}>WIN TECH LearningHUB</h1>
                    <p style={{ fontSize: '1.2rem', color: '#e2e8f0', margin: 0 }}>Discover | Develop | Excel</p>
                </div>
            </div>
            
            {/* Inline CSS fallback for media query logic that was lost in refactor */}
            <style dangerouslySetInnerHTML={{__html: `
                @media (max-width: 900px) {
                    .split-login-right {
                        display: none !important;
                    }
                }
                @media (min-width: 901px) {
                    .split-login-right {
                        display: block !important;
                    }
                }
            `}} />
        </div>
    );
};

export default Login;
