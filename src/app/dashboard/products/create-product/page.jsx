'use client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    stock: '',
    image: null,
    status: false,
    category_id: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.price) newErrors.price = 'Price is required.';
    else if (isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = 'Price must be a valid positive number.';

    if (!formData.image) newErrors.image = 'Image is required.';
    if (formData.category_id && isNaN(formData.category_id)) {
      newErrors.category_id = 'Category ID must be a number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('description', formData.description);
    payload.append('price', formData.price);
    payload.append('sku', formData.sku);
    payload.append('stock', formData.stock);
    if (formData.image) payload.append('image', formData.image);
    payload.append('status', formData.status ? '1' : '0');
    if (formData.category_id) payload.append('category_id', formData.category_id);

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('https://ecom.laralink.com/api/products', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res);

      if (res.data.success) {
        toast.success('Product created successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          sku: '',
          stock: '',
          image: null,
          status: true,
          category_id: '',
        });
        setErrors({});
      } else {
        toast.error(res.response?.data?.message || 'Failed to create product.');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md rounded-md m-6">
      <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name *</label>
          <input
            type="text"
            name="name"
            maxLength={255}
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Price *</label>
          <input
            type="number"
            name="price"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block font-medium">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Image *</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            className="w-full"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="status"
            required
            checked={formData.status}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Active Status</label>
        </div>

        <div>
          <label className="block font-medium">Category ID</label>
          <input
            type="number"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
