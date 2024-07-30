
import axios, { csrf } from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUser }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await csrf();
        try {
            await axios.post('/logout');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600">
            Logout
        </button>
    );
};

export default Logout;