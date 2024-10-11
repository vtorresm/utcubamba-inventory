import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EmailVerificationNotice = () => {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState<string>('');

    const resendVerificationEmail = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/email/resend');
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Email Verification</h2>
            {user && !user.email_verified_at && (
                <div>
                    <p>Your email is not verified. Please check your inbox for a verification link.</p>
                    <button onClick={resendVerificationEmail}>Resend Verification Email</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default EmailVerificationNotice;
