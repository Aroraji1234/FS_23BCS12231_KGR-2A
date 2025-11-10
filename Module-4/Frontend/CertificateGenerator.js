import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CertificateGenerator = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [studentName, setStudentName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch all available templates when the component loads
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/templates', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTemplates(response.data);
                if (response.data.length > 0) {
                    setSelectedTemplate(response.data[0].id); // Default to the first template
                }
            } catch (err) {
                setError('Failed to load templates.');
            }
        };
        fetchTemplates();
    }, []);

    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/certificates/generate',
                {
                    templateId: selectedTemplate,
                    studentName,
                    courseName
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: 'blob' // <-- CRITICAL: Tell axios to expect file data
                }
            );
            
            // Create a temporary link in the browser to download the file
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            // Extract filename from the response header if possible, otherwise use a default
            const contentDisposition = response.headers['content-disposition'];
            let fileName = `certificate-${studentName || 'download'}.pdf`;
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2) {
                    fileName = fileNameMatch[1];
                }
            }
            
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            
            // Clean up the temporary link
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            setStudentName('');
            setCourseName('');

        } catch (err) {
            setError('Failed to generate certificate. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Generate Certificate</h2>
            <form onSubmit={handleGenerate}>
                <div className="form-group">
                    <label>Student Name:</label>
                    <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Course Name:</label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Select Template:</label>
                    <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
                        {templates.length === 0 ? (
                            <option>No templates found. Please create one first.</option>
                        ) : (
                            templates.map(template => (
                                <option key={template.id} value={template.id}>{template.templateName}</option>
                            ))
                        )}
                    </select>
                </div>
                <button type="submit" disabled={isLoading || templates.length === 0}>
                    {isLoading ? 'Generating...' : 'Generate & Download PDF'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CertificateGenerator;
