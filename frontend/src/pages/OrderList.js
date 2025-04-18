import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function OrderList() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, value) => {
    setStatusUpdates({ ...statusUpdates, [orderId]: value });
  };

  const handleUpdateClick = async (orderId) => {
    const status = statusUpdates[orderId];
    if (!status) return alert('Please select a status');
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await fetchOrders();
        setStatusUpdates({ ...statusUpdates, [orderId]: '' });
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update order');
      }
    } catch {
      alert('Failed to update order');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Product</th>
              <th className="border border-gray-300 p-2">Customer</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Order Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border border-gray-300 p-2">{order.productId?.title || 'N/A'}</td>
                <td className="border border-gray-300 p-2">{order.customerName}</td>
                <td className="border border-gray-300 p-2">{order.customerPhone}</td>
                <td className="border border-gray-300 p-2">{order.quantity}</td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={statusUpdates[order._id] || order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border rounded px-2 py-1"
                    disabled={updatingOrderId === order._id}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleUpdateClick(order._id)}
                    disabled={updatingOrderId === order._id}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    {updatingOrderId === order._id ? 'Updating...' : 'Update'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderList;
