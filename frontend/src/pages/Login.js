import React, { useState, useContext } from 'react';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { login: contextLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await login(formData);
      if (response.token) {
        contextLogin(response.user, response.token);
        setMessage('Login successful');
        // Optionally, redirect or update UI here
      } else if (response.message) {
        setMessage(response.message);
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {message && <p className={`mb-4 ${message === 'Login successful' ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" disabled={loading} />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded" disabled={loading} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
