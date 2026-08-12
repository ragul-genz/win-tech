import React from 'react';

const CourseCard = ({ course, isLocked, onClick }) => {
    return (
        <div className="course-card-dash" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', position: 'relative' }}>
            <div className="course-thumbnail" style={{ position: 'relative' }}>
                <img src={course.image} alt={course.title} />
                {isLocked && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '50%', backdropFilter: 'blur(5px)' }}>
                            <i className='bx bxs-lock-alt' style={{ fontSize: '30px', color: 'white' }}></i>
                        </div>
                    </div>
                )}
                {!isLocked && course.videoUrl && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', zIndex: 5 }}>
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
                <button className="btn-library" onClick={(e) => { e.stopPropagation(); onClick && onClick(); }} style={{ backgroundColor: isLocked ? '#4f46e5' : '#10b981', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                    {isLocked ? (
                        <><i className='bx bx-cart' style={{ marginRight: '5px' }}></i>Buy Now</>
                    ) : (
                        <><i className='bx bx-play-circle' style={{ marginRight: '5px' }}></i>Start Learning</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
