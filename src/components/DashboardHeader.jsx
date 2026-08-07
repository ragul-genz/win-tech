import React from 'react';
import Logo from './Logo';

const DashboardHeader = ({ searchQuery, setSearchQuery }) => {
    return (
        <header className="dashboard-header">
            <div className="header-left">
                <a href="#" className="logo-text" style={{ textDecoration: 'none' }}>
                    <Logo />
                </a>
            </div>
            
            <div className="header-center">
                <div className="search-bar">
                    <i className='bx bx-search'></i>
                    <input 
                        type="text" 
                        placeholder="Search courses, categories and lessons" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="header-right">
                <button className="icon-btn"><i className='bx bx-home-alt'></i></button>
                <button className="icon-btn"><i className='bx bx-grid-alt'></i></button>
                <button className="icon-btn"><i className='bx bx-bell'></i></button>
                <div className="user-avatar">
                    <img src="https://ui-avatars.com/api/?name=User&background=F39200&color=fff" alt="User" />
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
