const { processIncomingMessage } = require('../services/whatsappService');

exports.chatbotReply = async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }
  try {
    const reply = await processIncomingMessage(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ message: 'Error processing message', error: error.message });
  }
};
