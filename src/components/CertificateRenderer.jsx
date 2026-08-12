import React from 'react';

const CertificateRenderer = ({ 
    certificateData, 
    settings, 
    isPrintMode = false 
}) => {
    // Merge provided settings with defaults
    const finalSettings = {
        logo: settings?.logo || 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        title: settings?.title || 'CERTIFICATE OF COMPLETION',
        platformName: settings?.platformName || 'Win Tech Academy',
        signature: settings?.signature || '', // Base64 or URL
        signatoryName: settings?.signatoryName || 'Admin',
        designation: settings?.designation || 'Director',
        textTemplate: settings?.textTemplate || 'This is to certify that\n{student_name}\n\nhas successfully completed\n{course_name}',
        idPrefix: settings?.idPrefix || 'CERT',
        enableQR: settings?.enableQR !== undefined ? settings?.enableQR : true
    };

    // Replace variables in text template
    const rawText = finalSettings.textTemplate;
    const replacedText = rawText
        .replace(/{student_name}/g, certificateData?.studentName || 'Student Name')
        .replace(/{course_name}/g, certificateData?.courseName || 'Course Name')
        .replace(/{completion_date}/g, certificateData?.date || new Date().toLocaleDateString())
        .replace(/{certificate_id}/g, certificateData?.id || `${finalSettings.idPrefix}-000000`)
        .replace(/{platform_name}/g, finalSettings.platformName);

    // Split text by newlines to render properly
    const textLines = replacedText.split('\n');

    const wrapperStyle = isPrintMode ? {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 0,
        padding: 0
    } : {
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
        padding: '20px',
        boxSizing: 'border-box'
    };

    const certificateStyle = {
        border: '10px solid #0f172a',
        padding: '10px',
        position: 'relative',
        backgroundColor: 'white',
        width: '100%',
        boxSizing: 'border-box',
        aspectRatio: '1.414 / 1', // standard landscape paper
        display: 'flex',
        flexDirection: 'column'
    };

    const innerBorder = {
        border: '2px solid #cbd5e1',
        flex: 1,
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center'
    };

    return (
        <div style={wrapperStyle} className="certificate-renderer">
            <div style={certificateStyle}>
                <div style={innerBorder}>
                    
                    {/* Header */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                        {finalSettings.logo && (
                            <img src={finalSettings.logo} alt="Platform Logo" style={{ height: '80px', objectFit: 'contain' }} />
                        )}
                        <h3 style={{ margin: 0, color: '#64748b', fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase' }}>
                            {finalSettings.platformName}
                        </h3>
                    </div>

                    {/* Title */}
                    <h1 style={{ margin: '20px 0', color: '#0f172a', fontSize: '3rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        {finalSettings.title}
                    </h1>

                    {/* Dynamic Text Body */}
                    <div style={{ margin: '30px 0', width: '80%' }}>
                        {textLines.map((line, idx) => {
                            const isStudentName = line.includes(certificateData?.studentName || 'Student Name');
                            const isCourseName = line.includes(certificateData?.courseName || 'Course Name');
                            
                            let style = { margin: '15px 0', color: '#475569', fontSize: '1.2rem', fontFamily: 'Georgia, serif' };
                            
                            if (isStudentName) {
                                style = { margin: '20px 0', color: '#0f172a', fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Georgia, serif', borderBottom: '1px solid #cbd5e1', paddingBottom: '5px', display: 'inline-block' };
                            } else if (isCourseName) {
                                style = { margin: '15px 0', color: '#4f46e5', fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' };
                            }

                            return <div key={idx} style={style}>{line || <br/>}</div>;
                        })}
                    </div>

                    {/* Date */}
                    <div style={{ margin: '10px 0', color: '#64748b', fontSize: '1.2rem', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                        Completed on {certificateData?.date || new Date().toLocaleDateString()}
                    </div>

                    {/* Footer: Signatures & QR */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', marginTop: '40px', padding: '0 40px', boxSizing: 'border-box' }}>
                        
                        {/* Certificate ID */}
                        <div style={{ textAlign: 'left', width: '25%' }}>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Certificate ID</p>
                            <p style={{ margin: '5px 0 0 0', color: '#0f172a', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                                {certificateData?.id || `${finalSettings.idPrefix}-000000`}
                            </p>
                        </div>

                        {/* Signature */}
                        <div style={{ textAlign: 'center', width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {finalSettings.signature ? (
                                <img src={finalSettings.signature} alt="Signature" style={{ height: '60px', objectFit: 'contain', marginBottom: '10px' }} />
                            ) : (
                                <div style={{ height: '60px', marginBottom: '10px' }}></div>
                            )}
                            <div style={{ borderTop: '1px solid #0f172a', width: '250px', paddingTop: '10px' }}>
                                <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1.2rem' }}>{finalSettings.signatoryName}</h4>
                                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>{finalSettings.designation}</p>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div style={{ width: '25%', display: 'flex', justifyContent: 'flex-end' }}>
                            {finalSettings.enableQR && (
                                <div style={{ width: '80px', height: '80px', backgroundColor: 'white', border: '1px solid #e2e8f0', padding: '5px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* Mock QR Code using an icon */}
                                    <i className='bx bx-qr' style={{ fontSize: '4rem', color: '#0f172a' }}></i>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            
            {/* Global style for printing to ensure it fits page */}
            <style>
                {`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .certificate-renderer, .certificate-renderer * {
                        visibility: visible;
                    }
                    .certificate-renderer {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100vw !important;
                        height: 100vh !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                    }
                    @page {
                        size: landscape;
                        margin: 0;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default CertificateRenderer;
