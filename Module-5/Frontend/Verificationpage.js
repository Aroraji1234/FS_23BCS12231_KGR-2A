import React, { useState } from 'react';
import axios from 'axios';

const VerificationPage = () => {
    const [certificateId, setCertificateId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    const [error, setError] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setVerificationResult(null);

        try {
            const response = await axios.get(`http://localhost:8080/api/verify/${certificateId}`);
            setVerificationResult(response.data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Verification failed. This certificate ID was not found in our records.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Certificate Verification</h2>
            <p>Enter the Unique Certificate ID to verify its authenticity.</p>
            <form onSubmit={handleVerify}>
                <div className="form-group">
                    <label>Certificate ID:</label>
                    <input
                        type="text"
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                        placeholder="Enter the ID from the certificate"
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
            </form>

            {error && (
                <div className="verification-result error">
                    <h3>Verification Failed</h3>
                    <p>{error}</p>
                </div>
            )}
            
            {verificationResult && (
                <div className="verification-result success">
                    <h3>✅ Certificate is Valid</h3>
                    <p><strong>Student Name:</strong> {verificationResult.studentName}</p>
                    <p><strong>Course Name:</strong> {verificationResult.courseName}</p>
                    <p><strong>Issue Date:</strong> {verificationResult.issueDate}</p>
                    <p><strong>Certificate ID:</strong> {verificationResult.id}</p>
                </div>
            )}
        </div>
    );
};

export default VerificationPage;
