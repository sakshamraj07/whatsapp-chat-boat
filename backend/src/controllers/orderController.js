const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  const { productId, quantity, customerName, customerPhone } = req.body;
  const sellerId = req.user.id;

  try {
    const order = new Order({ sellerId, productId, quantity, customerName, customerPhone });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const sellerId = req.user.id;
  try {
    const orders = await Order.find({ sellerId }).populate('productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, deliveryDate } = req.body;
  const sellerId = req.user.id;

  try {
    const order = await Order.findOneAndUpdate(
      { _id: id, sellerId },
      { status, deliveryDate },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err.message });
  }
};
