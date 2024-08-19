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
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
