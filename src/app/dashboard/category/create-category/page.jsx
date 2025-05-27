'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CreateCategoryForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'https://ecom.laralink.com/api/categories',
        {
          name,
          description,
          status,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);

      toast.success('Category created successfully!');
      setName('');
      setDescription('');
      setStatus(true);
      setMessage('');
    } catch (err) {
      if (err.response) {
        toast.error(
          `Error: ${err.response.data.message || 'Something went wrong'}`
        );
      } else {
        toast.error('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg"
      >
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Create New Category
        </h1>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <span>Active</span>
        </label>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full transition"
        >
          Create Category
        </button>

        {message && (
          <p className="text-sm mt-2 text-center text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
