import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PasswordReset = () => {
    const { token } = useParams<{ token: string }>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/password/reset', {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
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
            <div>
                <label>New Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
            </div>
            <button type="submit">Reset Password</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default PasswordReset;
