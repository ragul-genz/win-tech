import React from 'react';

const PracticePage = ({ onLoginClick }) => {
    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 200px)' }}>
            
            {/* Header */}
            <div style={{ padding: '80px 40px', backgroundColor: '#0f172a', color: 'white', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', margin: '0 0 15px 0' }}>Interactive Practice Arenas</h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Theory is good, but practice makes you perfect. Choose your arena.</p>
            </div>

            {/* Practice Sections */}
            <section style={{ padding: '80px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    
                    {/* CodeKata */}
                    <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden', display: 'flex', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                        <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#eff6ff', color: '#3b82f6', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.9rem', width: 'max-content', marginBottom: '20px' }}>
                                <i className='bx bx-code-block' style={{ fontSize: '1.2rem' }}></i> Algorithm Challenges
                            </div>
                            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: '0 0 20px 0' }}>CodeKata</h2>
                            <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 30px 0' }}>
                                Solve complex algorithmic challenges in Python, Java, JavaScript, and C++. Track your execution time, optimize logic, and conquer Data Structures! Over 1000+ problems ranging from arrays to advanced graphs.
                            </p>
                            <button onClick={onLoginClick} style={{ alignSelf: 'flex-start', padding: '15px 30px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)' }}>
                                Enter CodeKata
                            </button>
                        </div>
                        <div style={{ flex: 1, backgroundColor: '#0f172a', padding: '40px', position: 'relative' }}>
                            {/* Mock IDE */}
                            <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', height: '100%', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
                                <div style={{ display: 'flex', gap: '8px', padding: '15px', backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                    <span style={{ marginLeft: '15px', color: '#64748b', fontSize: '0.8rem', fontFamily: 'monospace' }}>solution.py</span>
                                </div>
                                <div style={{ padding: '20px', color: '#a5b4fc', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    <span style={{ color: '#c678dd' }}>def</span> <span style={{ color: '#61afef' }}>twoSum</span>(nums, target):<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;numMap = &#123;&#125;<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#c678dd' }}>for</span> i, num <span style={{ color: '#c678dd' }}>in</span> <span style={{ color: '#56b6c2' }}>enumerate</span>(nums):<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;diff = target - num<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#c678dd' }}>if</span> diff <span style={{ color: '#c678dd' }}>in</span> numMap:<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#c678dd' }}>return</span> [numMap[diff], i]<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numMap[num] = i<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#c678dd' }}>return</span> []
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WebKata */}
                    <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'row-reverse', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                        <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#ecfdf5', color: '#10b981', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.9rem', width: 'max-content', marginBottom: '20px' }}>
                                <i className='bx bx-layout' style={{ fontSize: '1.2rem' }}></i> Frontend UI Building
                            </div>
                            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: '0 0 20px 0' }}>WebKata</h2>
                            <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 30px 0' }}>
                                Master frontend development visually. Write HTML, CSS, and JavaScript in split editors and watch your UI come to life instantly in the live preview pane. Build responsive layouts and interactive components.
                            </p>
                            <button onClick={onLoginClick} style={{ alignSelf: 'flex-start', padding: '15px 30px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)' }}>
                                Enter WebKata
                            </button>
                        </div>
                        <div style={{ flex: 1, backgroundColor: '#f1f5f9', padding: '40px', position: 'relative' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%' }}>
                                <div style={{ flex: 1, backgroundColor: '#0f172a', borderRadius: '12px', padding: '15px', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                    <div style={{ color: '#64748b', marginBottom: '10px' }}>index.html</div>
                                    &lt;<span style={{ color: '#e06c75' }}>div</span> <span style={{ color: '#d19a66' }}>class</span>=<span style={{ color: '#98c379' }}>"card"</span>&gt;<br/>
                                    &nbsp;&nbsp;&lt;<span style={{ color: '#e06c75' }}>h1</span>&gt;Hello WebKata&lt;/<span style={{ color: '#e06c75' }}>h1</span>&gt;<br/>
                                    &lt;/<span style={{ color: '#e06c75' }}>div</span>&gt;
                                </div>
                                <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1' }}>
                                    <div style={{ padding: '20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                        <h1 style={{ color: '#0f172a', margin: 0 }}>Hello WebKata</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SQLKata */}
                    <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden', display: 'flex', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                        <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff7ed', color: '#f97316', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.9rem', width: 'max-content', marginBottom: '20px' }}>
                                <i className='bx bx-data' style={{ fontSize: '1.2rem' }}></i> Database Queries
                            </div>
                            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: '0 0 20px 0' }}>SQLKata</h2>
                            <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 30px 0' }}>
                                Master database querying. Write complex SQL joins, aggregations, and subqueries on real datasets. Get instant feedback on your query results and execution plans.
                            </p>
                            <button onClick={onLoginClick} style={{ alignSelf: 'flex-start', padding: '15px 30px', backgroundColor: '#f97316', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(249, 115, 22, 0.4)' }}>
                                Enter SQLKata
                            </button>
                        </div>
                        <div style={{ flex: 1, backgroundColor: '#0f172a', padding: '40px', position: 'relative' }}>
                             <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', height: '100%', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '20px', color: '#a5b4fc', fontFamily: 'monospace', fontSize: '1rem', borderBottom: '1px solid #334155' }}>
                                    <span style={{ color: '#c678dd' }}>SELECT</span> u.name, <span style={{ color: '#56b6c2' }}>COUNT</span>(o.id) <span style={{ color: '#c678dd' }}>AS</span> total_orders<br/>
                                    <span style={{ color: '#c678dd' }}>FROM</span> users u<br/>
                                    <span style={{ color: '#c678dd' }}>JOIN</span> orders o <span style={{ color: '#c678dd' }}>ON</span> u.id = o.user_id<br/>
                                    <span style={{ color: '#c678dd' }}>GROUP BY</span> u.id<br/>
                                    <span style={{ color: '#c678dd' }}>HAVING</span> total_orders &gt; 5;
                                </div>
                                <div style={{ padding: '20px', flex: 1, backgroundColor: '#020617', overflowX: 'auto' }}>
                                    <table style={{ width: '100%', color: '#94a3b8', borderCollapse: 'collapse', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                                        <thead>
                                            <tr style={{ color: '#38bdf8', borderBottom: '1px solid #334155', textAlign: 'left' }}>
                                                <th style={{ padding: '8px' }}>name</th>
                                                <th style={{ padding: '8px' }}>total_orders</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td style={{ padding: '8px' }}>Alice</td><td style={{ padding: '8px' }}>12</td></tr>
                                            <tr><td style={{ padding: '8px' }}>Bob</td><td style={{ padding: '8px' }}>8</td></tr>
                                            <tr><td style={{ padding: '8px' }}>Charlie</td><td style={{ padding: '8px' }}>6</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default PracticePage;
