import React, { useState } from 'react';

const DashboardPractice = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [code, setCode] = useState('// Write your code here\nfunction twoSum(nums, target) {\n    \n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));');
    const [output, setOutput] = useState('');

    const handleRunCode = () => {
        setOutput('Running code...\nOutput:\n[0, 1]\n\nExecution Time: 42ms\nStatus: Accepted');
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 10px 0' }}>Practice Area</h2>
                    <p style={{ margin: 0, color: '#64748b' }}>Sharpen your coding skills with real-world problems.</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                {/* Problem Description (Left) */}
                <div style={{ flex: '1', backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>Easy</span>
                        <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500' }}>Algorithms</span>
                    </div>
                    
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', color: '#0f172a' }}>1. Two Sum</h3>
                    
                    <div style={{ color: '#334155', lineHeight: '1.6', fontSize: '1rem' }}>
                        <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
                        <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
                        <p>You can return the answer in any order.</p>

                        <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', marginTop: '20px', borderLeft: '4px solid #cbd5e1' }}>
                            <p style={{ margin: '0 0 5px 0' }}><strong>Example 1:</strong></p>
                            <code style={{ display: 'block', backgroundColor: '#e2e8f0', padding: '10px', borderRadius: '6px' }}>
                                Input: nums = [2,7,11,15], target = 9<br/>
                                Output: [0,1]<br/>
                                Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                            </code>
                        </div>
                    </div>
                </div>

                {/* Code Editor (Right) */}
                <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ backgroundColor: '#1e1e1e', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)' }}>
                        {/* Editor Header */}
                        <div style={{ backgroundColor: '#2d2d2d', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #404040' }}>
                            <select 
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                style={{ backgroundColor: '#3c3c3c', color: 'white', border: '1px solid #555', padding: '6px 12px', borderRadius: '6px', outline: 'none' }}
                            >
                                <option value="javascript">JavaScript (Node.js)</option>
                                <option value="python">Python 3</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </select>
                            
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button style={{ backgroundColor: '#3c3c3c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Reset</button>
                                <button 
                                    onClick={handleRunCode}
                                    style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}
                                >
                                    <i className='bx bx-play'></i> Run Code
                                </button>
                            </div>
                        </div>

                        {/* Editor Area */}
                        <textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{ 
                                width: '100%', height: '300px', backgroundColor: '#1e1e1e', color: '#d4d4d4', 
                                border: 'none', padding: '20px', fontFamily: 'monospace', fontSize: '14px', 
                                resize: 'none', outline: 'none', boxSizing: 'border-box' 
                            }}
                            spellCheck="false"
                        ></textarea>
                    </div>

                    {/* Output Console */}
                    {output && (
                        <div style={{ backgroundColor: '#0f172a', color: '#10b981', padding: '20px', borderRadius: '12px', fontFamily: 'monospace', whiteSpace: 'pre-line', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}>
                            {output}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPractice;
