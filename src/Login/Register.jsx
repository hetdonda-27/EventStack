import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [status, setStatus] = useState('Register');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!firstname || !lastname || !username || !email || !gender || !age || !mobileno || !password) {
      return 'All required fields must be filled';
    }
    if (isNaN(age) || parseInt(age, 10) <= 0) {
      return 'Age must be a positive number';
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(mobileno)) {
      return 'Mobile number must be a valid 10-digit number';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStatus('Registering...');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setStatus('Register');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname,
          middlename,
          lastname,
          username,
          email,
          gender,
          age: parseInt(age, 10),
          mobileno,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error === 'Username or email already exists'
            ? 'Username or email is already taken'
            : data.error || 'Registration failed'
        );
      }

      localStorage.setItem('role', data.role);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      window.dispatchEvent(new Event('storage'));

      setStatus('Register Successfully!');

      setFirstname('');
      setMiddlename('');
      setLastname('');
      setUsername('');
      setEmail('');
      setAge('');
      setMobileno('');
      setPassword('');

      setTimeout(() => {
        setStatus('Register');
        if (data.role === 'admin') {
          navigate('/myevent');
        } else {
          navigate('/home');
        }
      }, 1500);
    } catch (err) {
      setStatus('Register');
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Register</h1>
          <p className="text-white/80">Create your account below.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-slide-in">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Firstname"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
            />
            <input
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
              placeholder="Middlename"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
            />
            <input
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Lastname"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
            />
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
            />
            <select
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
            >
              <option value="" disabled hidden>Select Gender</option>
              <option value="male" className="text-black">Male</option>
              <option value="female" className="text-black">Female</option>
              <option value="other" className="text-black">Other</option>
            </select>


            <input
              type="tel"
              required  
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
            />
            <input
              type="tel"
              required
              value={mobileno}
              onChange={(e) => setMobileno(e.target.value)}
              placeholder="Mobile No"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
            />
            <button
              type="submit"
              disabled={status === 'Registering...'}
              className={`w-full ${status === 'Register Successfully!' ? 'bg-green-500' : 'bg-white text-purple-700'
                } font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {status}
            </button>
            <div className="mt-6 text-center text-white/80">
              Already have an account?
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="ml-2 text-indigo-100 underline hover:text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}