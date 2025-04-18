import React, { useState } from 'react';
import { signup } from '../services/authService';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'seller',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup(formData);
    if (response.message) {
      setMessage(response.message);
    } else {
      setMessage('Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      {message && <p className="mb-4 text-green-600 text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="seller">Seller</option>
            <option value="support_agent">Support Agent</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">Sign Up</button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
      <div className="mt-6 text-center">
        <img src="/signup-image.jpg" alt="Signup" className="mx-auto w-48 h-auto rounded" />
      </div>
    </div>
  );
}

export default Signup;
