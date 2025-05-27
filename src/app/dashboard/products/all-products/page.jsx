'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      const res = await axios.get('https://ecom.laralink.com/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });

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

  const handleEdit = (id) => {
    toast('Redirecting to edit page...');
  };

  if (loading) {
    return (
      <div className="text-center text-blue-600 py-10 font-semibold text-lg animate-pulse">
        Loading Products...
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-medium">
        No products found!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Product List</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-blue-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">SKU</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id || product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.sku}</td>
                <td className="px-6 py-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md transition cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
