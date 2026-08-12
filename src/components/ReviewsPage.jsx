import React from 'react';

const ReviewsPage = () => {
    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 200px)' }}>
            
            {/* Header */}
            <div style={{ padding: '80px 40px', backgroundColor: '#0f172a', color: 'white', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', margin: '0 0 15px 0' }}>Success Stories</h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Hear from our learners who have transformed their careers.</p>
            </div>

            {/* Placements Section */}
            <section style={{ padding: '80px 40px', backgroundColor: '#f8fafc' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: '0 0 15px 0' }}>Where Our Students Are Placed</h2>
                        <p style={{ fontSize: '1.1rem', color: '#64748b', margin: 0 }}>Join the ranks of developers working at top tech companies.</p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {[
                            { name: 'Arjun K', role: 'Frontend Developer', company: 'TCS', salary: '8 LPA' },
                            { name: 'Priya S', role: 'Full Stack Dev', company: 'Amazon', salary: '22 LPA' },
                            { name: 'Karthik R', role: 'Backend Engineer', company: 'Infosys', salary: '7 LPA' },
                            { name: 'Divya M', role: 'UI/UX Designer', company: 'Zoho', salary: '9 LPA' },
                            { name: 'Sanjay P', role: 'Data Scientist', company: 'Google', salary: '30 LPA' },
                            { name: 'Meena V', role: 'Cloud Engineer', company: 'Microsoft', salary: '25 LPA' }
                        ].map((student, i) => (
                            <div key={i} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#e2e8f0', margin: '0 auto 15px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#475569' }}>
                                    {student.name.charAt(0)}
                                </div>
                                <h3 style={{ margin: '0 0 5px 0', color: '#0f172a' }}>{student.name}</h3>
                                <p style={{ margin: '0 0 15px 0', color: '#4f46e5', fontWeight: '500' }}>{student.role}</p>
                                <div style={{ padding: '10px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
                                    <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>Placed at <strong>{student.company}</strong></p>
                                    <p style={{ margin: '5px 0 0 0', color: '#10b981', fontWeight: '600' }}>{student.salary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '80px 40px', backgroundColor: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                     <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: '0 0 15px 0' }}>What They Say</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                         {[
                            { name: 'Arjun K', review: 'The hands-on practice in WebKata was a game changer for my UI skills. The instructors are amazing!', rating: 5 },
                            { name: 'Priya S', review: 'I loved the MERN stack course. The final project helped me crack my Amazon interview.', rating: 5 },
                            { name: 'Karthik R', review: 'Great platform! CodeKata is addictive and really sharpens your logic.', rating: 4 }
                        ].map((rev, i) => (
                             <div key={i} style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                 <div style={{ display: 'flex', gap: '5px', color: '#f59e0b', marginBottom: '15px' }}>
                                     {[...Array(rev.rating)].map((_, j) => <i key={j} className='bx bxs-star'></i>)}
                                 </div>
                                 <p style={{ color: '#475569', fontStyle: 'italic', margin: '0 0 20px 0', lineHeight: '1.6' }}>"{rev.review}"</p>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                          {rev.name.charAt(0)}
                                      </div>
                                      <span style={{ fontWeight: '600', color: '#0f172a' }}>{rev.name}</span>
                                 </div>
                             </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ReviewsPage;
