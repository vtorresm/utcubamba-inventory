import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (attempts >= 3) {
      Swal.fire({
        icon: 'error',
        title: 'Demasiados intentos',
        text: 'Has alcanzado el número máximo de intentos de login.',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      Swal.fire({
        icon: 'success',
        title: 'Login exitoso',
        text: response.data.message,
      });

      // Redirigir al home
      window.location.href = '/home';
    } catch (error) {
      setAttempts(attempts + 1);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message || 'Credenciales inválidas',
      });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
