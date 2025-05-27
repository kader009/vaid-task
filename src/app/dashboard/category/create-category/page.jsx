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
        toast.error(`Error: ${err.response.data.message || 'Something went wrong'}`);
      } else {
        toast.error('Server error. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 bg-white shadow rounded ">
      <h1 className="text-xl font-bold">Create New Category</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        required
        className="w-full p-2 border border-gray-300 rounded"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
        <span>Active</span>
      </label>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Create Category
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
