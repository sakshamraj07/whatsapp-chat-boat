const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  const { title, image, price, quantity } = req.body;
  const sellerId = req.user.id;

  try {
    const product = new Product({ sellerId, title, image, price, quantity });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  const sellerId = req.user.id;
  try {
    const products = await Product.find({ sellerId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const sellerId = req.user.id;
  const updates = req.body;

  try {
    const product = await Product.findOneAndUpdate({ _id: id, sellerId }, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const sellerId = req.user.id;

  try {
    const product = await Product.findOneAndDelete({ _id: id, sellerId });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};
