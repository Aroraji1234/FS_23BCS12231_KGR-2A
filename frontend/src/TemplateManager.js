import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TemplateManager = () => {
    const [templates, setTemplates] = useState([]);
    const [templateName, setTemplateName] = useState('');
    const [templateContent, setTemplateContent] = useState('');

    const fetchTemplates = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/templates', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTemplates(response.data);
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:8080/api/templates', 
            { templateName, templateContent },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setTemplateName('');
        setTemplateContent('');
        fetchTemplates();
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8080/api/templates/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchTemplates();
    };

    return (
        <div>
            <h2>Manage Certificate Templates</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={templateName} 
                    onChange={(e) => setTemplateName(e.target.value)} 
                    placeholder="Template Name" 
                    required 
                />
                <textarea 
                    value={templateContent} 
                    onChange={(e) => setTemplateContent(e.target.value)}
                    placeholder="Template Content (e.g., HTML)"
                    required
                ></textarea>
                <button type="submit">Create Template</button>
            </form>
            <hr />
            <h3>Existing Templates</h3>
            <ul>
                {templates.map(template => (
                <li key={template.id}>
                {template.templateName}
                {/* ADD className="delete-btn" to this button */}
                <button onClick={() => handleDelete(template.id)} className="delete-btn">Delete</button>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default TemplateManager;