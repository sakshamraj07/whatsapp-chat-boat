import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProductForm from './ProductForm';

function ProductList() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        setError(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete product');
      }
    } catch {
      alert('Failed to delete product');
    }
  };

  const handleFormSave = (savedProduct) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p._id === savedProduct._id ? savedProduct : p)));
    } else {
      setProducts([savedProduct, ...products]);
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
        Product Catalog
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </h2>
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
      {!showForm && (
        <>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Title</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border border-gray-300 p-2">{product.title}</td>
                    <td className="border border-gray-300 p-2">₹{product.price}</td>
                    <td className="border border-gray-300 p-2">{product.quantity}</td>
                    <td className="border border-gray-300 p-2 space-x-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;
