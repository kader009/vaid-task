'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CategoryCard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://ecom.laralink.com/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);

      if (res.data.success) {
        setCategories(res.data.data.categories || []);
      } else {
        toast.error('Failed to load categories');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (!window.confirm(`Are you sure you want to delete "${categoryName}"?`)) return;
  
    try {
      await axios.delete(`https://ecom.laralink.com/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`Category "${categoryName}" deleted successfully.`);
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
      console.error(error);
    }
  };
  

  const handleUpdate = (category) => {
    alert(`Update category: ${category.name}`);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (categories.length === 0)
    return <p className="text-center mt-10">No categories found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="p-6 bg-white rounded shadow hover:shadow-lg transition flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
            <p className="text-gray-600 mb-3">{cat.description || 'No description'}</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                cat.status
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {cat.status ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="mt-4 flex space-x-3">
            <button
              onClick={() => handleUpdate(cat)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
