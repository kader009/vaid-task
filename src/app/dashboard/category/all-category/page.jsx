'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function CategoryCard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', status: false });

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

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`https://ecom.laralink.com/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
      console.error(error);
    }
  };

  const handleUpdate = (category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description || '',
      status: category.status ? true : false,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    if (!editingCategory) return;

    try {
      const res = await axios.put(
        `https://ecom.laralink.com/api/categories/${editingCategory.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success('Category updated successfully');
        setEditingCategory(null);
        fetchCategories();
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      toast.error('Error updating category');
      console.error(error);
    }
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
                cat.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {cat.status ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="mt-4 flex space-x-3">
            <button
              onClick={() => handleUpdate(cat)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md transition"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>

            <input
              name="name"
              value={form.name}
              onChange={handleFormChange}
              placeholder="Category Name"
              className="w-full mb-3 p-2 border rounded"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Description"
              className="w-full mb-3 p-2 border rounded"
            />
            <label className="flex items-center mb-3">
              <input
                type="checkbox"
                name="status"
                checked={form.status}
                onChange={handleFormChange}
                className="mr-2"
              />
              Active
            </label>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingCategory(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
