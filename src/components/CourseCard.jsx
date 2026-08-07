import React from 'react';

const CourseCard = ({ course }) => {
    return (
        <div className="course-card-dash">
            <div className="course-thumbnail">
                <img src={course.image} alt={course.title} />
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
                <button className="btn-library">
                    {course.inLibrary ? 'In Library' : 'Enroll'}
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
