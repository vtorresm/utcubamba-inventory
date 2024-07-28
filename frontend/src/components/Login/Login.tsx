import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });
      Swal.fire('Success', response.data.message, 'success');
      // Redirigir al home
      window.location.href = '/home';
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        Swal.fire('Error', 'Too many failed attempts. Try again later.', 'error');
        // Deshabilitar el formulario o realizar otras acciones
      } else {
        Swal.fire('Error', error.response.data.message, 'error');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={attempts >= 3}>Login</button>
      </form>
    </div>
  );
};

export default Login;
