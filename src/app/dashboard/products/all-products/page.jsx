'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '@/components/Loader';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', sku: '' });

  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://ecom.laralink.com/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      if (res.data.success) {
        setProducts(res.data.data.products);
      }
    } catch (error) {
      toast.error('Failed to load products!');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure to delete this product?'
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `https://ecom.laralink.com/api/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setProducts(products.filter((product) => product.id !== id));
        toast.success('Product deleted successfully!');
      } else {
        toast.error('Failed to delete product!');
      }
    } catch (error) {
      toast.error('Error deleting product!');
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      sku: product.sku,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingProduct) return;

    try {
      const res = await axios.put(
        `https://ecom.laralink.com/api/products/${editingProduct.id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success('Product updated successfully!');
        setEditingProduct(null);
        fetchProducts();
      } else {
        toast.error('Update failed!');
      }
    } catch (error) {
      toast.error('Error updating product!');
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-medium">
        No products found!
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
        All Product List
      </h1>

      <div className="overflow-x-auto shadow-sm rounded dark:bg-gray-800">
        <table className="min-w-full text-sm text-left dark:text-gray-200">
          <thead className="bg-blue-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 capitalize tracking-wider">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900">
            {products.map((product) => (
              <tr
                key={product.id || product._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">${parseFloat(product.price)}</td>
                <td className="px-6 py-4">{product.sku}</td>
                <td className="px-6 py-4 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[90%] sm:w-[400px]">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Edit Product
            </h2>

            <input
              name="name"
              value={form.name}
              onChange={handleFormChange}
              placeholder="Product Name"
              className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <input
              name="price"
              value={form.price}
              onChange={handleFormChange}
              placeholder="Price"
              type="number"
              className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <input
              name="sku"
              value={form.sku}
              onChange={handleFormChange}
              placeholder="SKU"
              className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 px-4 py-2 rounded text-black dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
