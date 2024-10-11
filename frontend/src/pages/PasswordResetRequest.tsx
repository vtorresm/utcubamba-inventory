import { useState, FormEvent } from 'react';
import axios from 'axios';

const PasswordResetRequest = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/password/email', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Send Password Reset Link</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default PasswordResetRequest;
