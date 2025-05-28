'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CreateCategoryForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Category name is required.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Category name must be at least 3 characters.';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

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
      setErrors({});
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
    <div className="h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg"
      >
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Create Category
        </h1>

        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: '' }));
          }}
          placeholder="Category name"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}

        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((prev) => ({ ...prev, description: '' }));
          }}
          placeholder="Description"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}

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
      </form>
    </div>
  );
}
