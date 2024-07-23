import { useState, FormEvent, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { register } = authContext;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await register(name, email, password);
    } catch (err) {
      console.error('Failed to register. Please try again.', err);
      setError('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md'>
      <h2 className='text-3xl font-bold mb-6 text-center'>Register</h2>
      {error && <div className='mb-4 text-red-600'>{error}</div>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className='block mb-1 font-medium'>
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
            required
          />
        </div>
        <div>
          <label htmlFor='email' className='block mb-1 font-medium'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
            placeholder='Email'
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='block mb-1 font-medium'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
            placeholder='Password'
            required
          />
        </div>
        <div>
          <label htmlFor='passwordConfirmation' className='block mb-1 font-medium'>
            Confirm Password
          </label>
          <input
            type='password'
            id='passwordConfirmation'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
            placeholder='Confirm Password'
            required
          />
        </div>
        <button
          type='submit'
          className={`w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
