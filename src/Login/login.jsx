import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [status, setStatus] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Logging in...');
    setTimeout(() => {
      setStatus('Login Successful!');
      setTimeout(() => {
        setStatus('Login');
        navigate('/home');
      }, 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
          <p className="text-white/80">Welcome back! Please login to continue.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-slide-in">
         <form onSubmit={handleSubmit} className="space-y-6">
  <div>
    <label htmlFor="username" className="block text-sm font-medium text-white mb-2">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      required
      value={email}
      onChange={e => setEmail(e.target.value)}
      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
      placeholder="Enter your username"
    />
  </div>
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      value={password}
      onChange={e => setPassword(e.target.value)}
      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
      placeholder="Enter your password"
    />
  </div>
  <button
    type="submit"
    className={`w-full ${status === 'Login Successful!' ? 'bg-green-500 text-white' : 'bg-white text-purple-600'} font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg`}
  >
    {status}
  </button>
</form>

          <div className="mt-6 text-center">
            <span className="text-white/80">Don't have an account?</span>
            <button
              className="ml-2 text-indigo-100 underline hover:text-white transition"
              onClick={() => navigate('/register')}
              type="button"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}











