import React, { useState } from 'react';
import CourseCard from './CourseCard';

const DashboardCourses = ({ searchQuery }) => {
    const [activeTab, setActiveTab] = useState('all');

    // Sample data based on screenshot
    const allCourses = [
        {
            id: 1,
            title: "Boot Camp",
            instructor: "T.Muthuvel Ganesh",
            progress: 0,
            inLibrary: true,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 2,
            title: "Full Stack Development Ma...",
            instructor: "A.Vinothkumar",
            progress: 4,
            inLibrary: true,
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 3,
            title: "B - HTML , CSS & Bootstra...",
            instructor: "Instructor Name",
            progress: 0,
            inLibrary: true,
            image: "https://images.unsplash.com/photo-1627398240411-8fc5f1d41a33?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 4,
            title: "Developer Series",
            instructor: "Instructor Name",
            progress: 0,
            inLibrary: true,
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60"
        }
    ];

    // Simulate "My Courses" having only courses with progress > 0
    const myCourses = allCourses.filter(c => c.progress > 0 || c.inLibrary);

    const displayedCourses = activeTab === 'all' ? allCourses : myCourses;
    
    // Filter by search query
    const filteredCourses = displayedCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="dashboard-main">
            <div className="tabs-container">
                <div className="tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All Courses <span className="badge">10</span>
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'my' ? 'active' : ''}`}
                        onClick={() => setActiveTab('my')}
                    >
                        My Courses <span className="badge">10</span>
                    </button>
                </div>
            </div>

            <div className="controls-bar">
                <button className="sort-btn">
                    <i className='bx bx-sort-down'></i> Sort <i className='bx bx-chevron-down'></i>
                </button>
            </div>

            <div className="courses-grid-dash">
                {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            
            {filteredCourses.length === 0 && (
                <div className="no-results">
                    <p>No courses found matching "{searchQuery}"</p>
                </div>
            )}
        </main>
    );
};

export default DashboardCourses;
