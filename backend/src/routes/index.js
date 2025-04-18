const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const whatsappRoutes = require('./whatsapp');
const productRoutes = require('./product');
const orderRoutes = require('./order');
const chatbotRoutes = require('./chatbot');

// Auth routes
router.post('/api/signup', authController.signup);
router.post('/api/login', authController.login);

// WhatsApp webhook route
router.use('/whatsapp', whatsappRoutes);

// Product routes
router.use('/products', productRoutes);

// Order routes
router.use('/orders', orderRoutes);

// Chatbot route
router.use('/chatbot', chatbotRoutes);

module.exports = router;
