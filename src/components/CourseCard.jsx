import React from 'react';

const CourseCard = ({ course, onClick }) => {
    return (
        <div className="course-card-dash" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <div className="course-thumbnail" style={{ position: 'relative' }}>
                <img src={course.image} alt={course.title} />
                {course.videoUrl && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                        <i className='bx bx-play' style={{ fontSize: '24px', marginLeft: '3px' }}></i>
                    </div>
                )}
            </div>
            
            <div className="course-body-dash">
                <h3 className="course-title-dash">{course.title}</h3>
                
                <div className="progress-section">
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="progress-text">{course.progress}%</span>
                </div>
            </div>

            <div className="course-footer-dash">
                <div className="instructor-info">
                    <div className="instructor-avatar">
                        <i className='bx bxs-user-circle'></i>
                    </div>
                    <span className="instructor-name">{course.instructor}</span>
                </div>
                <button className="btn-library" onClick={(e) => e.stopPropagation()}>
                    {course.inLibrary ? 'In Library' : 'Enroll'}
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
