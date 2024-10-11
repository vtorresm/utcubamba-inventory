import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmailVerificationHandler = () => {
    const { id, hash } = useParams<{ id: string; hash: string }>();
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/email/verify/${id}/${hash}`);
                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error: ' + error.response.data.message);
            }
        };

        verifyEmail();
    }, [id, hash]);

    return (
        <div>
            <h2>Email Verification</h2>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EmailVerificationHandler;
