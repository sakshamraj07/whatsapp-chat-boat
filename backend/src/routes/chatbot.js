const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, chatbotController.chatbotReply);

module.exports = router;
