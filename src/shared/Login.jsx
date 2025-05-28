'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(username))
      newErrors.username = 'Invalid email format';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post('https://ecom.laralink.com/api/auth/login', {
        email: username,
        password: password,
      });

      const { Token, RefreshToken } = res.data;
      localStorage.setItem('accessToken', Token);
      localStorage.setItem('refreshToken', RefreshToken);
      router.push('/dashboard');
      toast.success(`Welcome to Dashboard`);
    } catch (err) {
      toast.error('Invalid credentials');
      console.log(err?.response?.data || err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-xl shadow-lg w-full max-w-md text-white">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            User Login
          </h1>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 font-semibold text-white">
                Email
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter your useremail"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className="text-red-300 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-semibold text-white">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-300 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300 font-semibold"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-white">
            New here?{' '}
            <Link
              href="/register"
              className="text-blue-300 underline hover:text-white transition"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
