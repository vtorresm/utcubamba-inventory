import React, { useState } from 'react'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    console.log('Login attempt', { email, password })
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
<<<<<<< HEAD
      <form onSubmit={handleLogin} className="space-y-4">
=======
      <form onSubmit={handleSubmit} className="space-y-4">
>>>>>>> 250c60c7e6e7bd7107a3c2e279b33b0d4fc7ba02
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
<<<<<<< HEAD
id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
className="w-full px-3 py-2 border rounded-md"
=======
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
>>>>>>> 250c60c7e6e7bd7107a3c2e279b33b0d4fc7ba02
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
  )
}

export default Login