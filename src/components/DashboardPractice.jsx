import React, { useState, useEffect } from 'react';

const DashboardPractice = ({ initialTab = 'codekata' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    
    // CodeKata State
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [code, setCode] = useState('// Write your code here\nfunction twoSum(nums, target) {\n    \n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));');
    const [output, setOutput] = useState('');

    // WebKata State
    const [htmlCode, setHtmlCode] = useState('<div class="box">\n  <h1>Hello WebKata!</h1>\n  <button id="btn">Click Me</button>\n</div>');
    const [cssCode, setCssCode] = useState('body {\n  background: #1e293b;\n  color: white;\n  font-family: sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n}\n\n.box {\n  background: #334155;\n  padding: 30px;\n  border-radius: 12px;\n  text-align: center;\n}\n\nbutton {\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: bold;\n}');
    const [jsCode, setJsCode] = useState('document.getElementById("btn").addEventListener("click", () => {\n  alert("Button clicked! You are learning WebKata.");\n});');
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const handleRunCode = () => {
        setOutput('Running code...\nOutput:\n[0, 1]\n\nExecution Time: 42ms\nStatus: Accepted');
    };

    const handleRunWebKata = () => {
        const documentTemplate = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}</script>
            </body>
            </html>
        `;
        setSrcDoc(documentTemplate);
    };

    const tabStyle = (isActive) => ({
        padding: '10px 24px',
        backgroundColor: isActive ? '#4f46e5' : 'transparent',
        color: isActive ? 'white' : '#64748b',
        border: isActive ? 'none' : '1px solid #cbd5e1',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    });

    const editorStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        border: 'none',
        padding: '15px',
        fontFamily: 'monospace',
        fontSize: '14px',
        resize: 'none',
        outline: 'none',
        boxSizing: 'border-box'
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 10px 0' }}>Practice Area</h2>
                    <p style={{ margin: 0, color: '#64748b' }}>Sharpen your coding skills with real-world problems.</p>
                </div>
                
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => setActiveTab('codekata')} style={tabStyle(activeTab === 'codekata')}>
                        <i className='bx bx-code-block'></i> CodeKata
                    </button>
                    <button onClick={() => setActiveTab('webkata')} style={tabStyle(activeTab === 'webkata')}>
                        <i className='bx bx-layout'></i> WebKata
                    </button>
                </div>
            </div>

            {activeTab === 'codekata' ? (
                /* CodeKata View (Algorithm Practice) */
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
                                    <button onClick={() => { setCode(''); setOutput(''); }} style={{ backgroundColor: '#3c3c3c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Reset</button>
                                    <button 
                                        onClick={handleRunCode}
                                        style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}
                                    >
                                        <i className='bx bx-play'></i> Run Code
                                    </button>
                                </div>
                            </div>

                            <textarea 
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{ ...editorStyle, height: '300px' }}
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
            ) : (
                /* WebKata View (Frontend Practice) */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '15px 20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <div>
                            <h3 style={{ margin: 0, color: '#0f172a' }}>Frontend Playground</h3>
                            <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>Build user interfaces with HTML, CSS, and JS</p>
                        </div>
                        <button 
                            onClick={handleRunWebKata}
                            style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)' }}
                        >
                            <i className='bx bx-play'></i> Run WebKata
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', height: '600px' }}>
                        {/* Editor Split */}
                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* HTML Editor */}
                            <div style={{ flex: '1', backgroundColor: '#1e1e1e', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                <div style={{ backgroundColor: '#2d2d2d', padding: '8px 15px', color: '#e34c26', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px', borderBottom: '1px solid #404040' }}>
                                    <i className='bx bxl-html5'></i> HTML
                                </div>
                                <textarea value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)} style={editorStyle} spellCheck="false"></textarea>
                            </div>
                            {/* CSS Editor */}
                            <div style={{ flex: '1', backgroundColor: '#1e1e1e', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                <div style={{ backgroundColor: '#2d2d2d', padding: '8px 15px', color: '#264de4', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px', borderBottom: '1px solid #404040' }}>
                                    <i className='bx bxl-css3'></i> CSS
                                </div>
                                <textarea value={cssCode} onChange={(e) => setCssCode(e.target.value)} style={editorStyle} spellCheck="false"></textarea>
                            </div>
                            {/* JS Editor */}
                            <div style={{ flex: '1', backgroundColor: '#1e1e1e', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                <div style={{ backgroundColor: '#2d2d2d', padding: '8px 15px', color: '#f0db4f', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px', borderBottom: '1px solid #404040' }}>
                                    <i className='bx bxl-javascript'></i> JavaScript
                                </div>
                                <textarea value={jsCode} onChange={(e) => setJsCode(e.target.value)} style={editorStyle} spellCheck="false"></textarea>
                            </div>
                        </div>

                        {/* Output Preview */}
                        <div style={{ flex: '1', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0' }}>
                            <div style={{ backgroundColor: '#f8fafc', padding: '12px 20px', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <i className='bx bx-desktop'></i> Live Preview
                            </div>
                            <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
                                {srcDoc ? (
                                    <iframe 
                                        srcDoc={srcDoc} 
                                        title="output" 
                                        sandbox="allow-scripts" 
                                        width="100%" 
                                        height="100%" 
                                        style={{ border: 'none' }}
                                    />
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                                        <i className='bx bx-code-alt' style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                                        <p>Click "Run WebKata" to render output</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPractice;
