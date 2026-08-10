import React, { useState } from 'react';
import Logo from './Logo';

const Login = ({ onLogin, onBack }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId === 'Madara' && password === 'madara') {
            setError('');
            onLogin('admin', userId);
        } else if (userId.trim() !== '' && password.trim() !== '') {
            // Allow any normal user to log in to demonstrate the "whoever logs in" requirement
            setError('');
            onLogin('user', userId);
        } else {
            setError('Invalid ID or Password. Please try again.');
        }
    };

    return (
        <div className="split-login-page">
            <div className="split-login-left" style={{ position: 'relative' }}>
                {onBack && (
                    <button 
                        onClick={onBack} 
                        style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b' }}
                    >
                        <i className='bx bx-arrow-back'></i> Back to Home
                    </button>
                )}
                <div className="login-form-container" style={{ marginTop: '40px' }}>
                    <div className="login-logo">
                        <Logo />
                    </div>
                    
                    <h2>Login</h2>
                    
                    <button className="btn-google">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{width: '20px'}}/>
                        Continue with Google
                    </button>
                    
                    <div className="divider">Or, sign in with your email</div>
                    
                    <form onSubmit={handleSubmit}>
                        {error && <div style={{ color: 'red', fontSize: '0.9rem', marginBottom: '15px', textAlign: 'center', backgroundColor: '#FEE2E2', padding: '10px', borderRadius: '6px' }}>{error}</div>}
                        
                        <div className="input-with-icon">
                            <i className='bx bx-envelope prefix'></i>
                            <input 
                                type="text" 
                                placeholder="Email or User ID (ragul)" 
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <div className="input-with-icon">
                            <i className='bx bx-lock-alt prefix'></i>
                            <input 
                                type="password" 
                                placeholder="Password (123)" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            <i className='bx bx-show suffix'></i>
                        </div>
                        
                        <div className="forgot-pwd-container">
                            <a href="#" className="forgot-pwd-link">Forgot password?</a>
                        </div>
                        
                        <button type="submit" className="btn-primary-login">Login</button>
                        <button type="button" className="btn-outline-login">Login with secure code</button>
                        
                        <div className="signup-text">
                            New user? <a href="#">Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className="split-login-right">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" alt="Team" />
                <div className="split-right-content">
                    <h1>WIN TECH LearningHUB</h1>
                    <p>Discover | Develop | Excel</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
