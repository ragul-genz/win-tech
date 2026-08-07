const Courses = () => {
    return (
        <section id="courses" className="courses">
            <div className="section-header">
                <h2>Our Popular <span className="highlight-red">Courses</span></h2>
                <p>Level up your skills with our top-rated programs.</p>
            </div>
            
            <div className="course-filters">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Web Dev</button>
                <button className="filter-btn">AI & Data</button>
                <button className="filter-btn">Design</button>
            </div>

            <div className="courses-grid">
                <div className="course-card">
                    <div className="course-img dev-img"></div>
                    <div className="course-content">
                        <span className="course-category blue-cat">Web Dev</span>
                        <h3>Full Stack Development (MERN)</h3>
                        <div className="course-meta">
                            <span><i className='bx bx-time-five'></i> 6 Months</span>
                            <span><i className='bx bx-user'></i> 2.4k Students</span>
                        </div>
                        <div className="course-footer">
                            <div className="price">₹14,999</div>
                            <a href="#" className="btn-enroll">Enroll Now</a>
                        </div>
                    </div>
                </div>

                <div className="course-card">
                    <div className="course-img ai-img"></div>
                    <div className="course-content">
                        <span className="course-category red-cat">AI & Data</span>
                        <h3>Artificial Intelligence & ML</h3>
                        <div className="course-meta">
                            <span><i className='bx bx-time-five'></i> 8 Months</span>
                            <span><i className='bx bx-user'></i> 1.8k Students</span>
                        </div>
                        <div className="course-footer">
                            <div className="price">₹19,999</div>
                            <a href="#" className="btn-enroll">Enroll Now</a>
                        </div>
                    </div>
                </div>

                <div className="course-card">
                    <div className="course-img design-img"></div>
                    <div className="course-content">
                        <span className="course-category yellow-cat">Design</span>
                        <h3>UI/UX Masterclass</h3>
                        <div className="course-meta">
                            <span><i className='bx bx-time-five'></i> 4 Months</span>
                            <span><i className='bx bx-user'></i> 1.2k Students</span>
                        </div>
                        <div className="course-footer">
                            <div className="price">₹9,999</div>
                            <a href="#" className="btn-enroll">Enroll Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Courses;
