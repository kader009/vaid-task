'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // ✅ useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ecom.laralink.com/api/auth/login', {
        email: username,
        password: password,
      });

      const { Token, RefreshToken } = res.data;
      localStorage.setItem('accessToken', Token);
      localStorage.setItem('refreshToken', RefreshToken);
      router.push('/dashboard'); // ✅ router.push
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
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Login to Dashboard
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 font-semibold text-white">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-white">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
            <Link href="/register" className="text-blue-500 underline hover:text-white transition">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
