import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const { register } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      await register(name, email, password);
  };

  return (
    <div className='max-w-md mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Registro</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className='block mb-1'>
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-3 py-2 border rounded-md'
            required
          />
        </div>
        <div>
          <label htmlFor='email' className='block mb-1'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 border rounded-md'
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='block mb-1'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border rounded-md'
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='block mb-1'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className='w-full px-3 py-2 border rounded-md'
             placeholder="Confirm Password"
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
