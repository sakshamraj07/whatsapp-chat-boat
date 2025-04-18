const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { processIncomingMessage, sendWhatsAppMessage } = require('../services/whatsappService');

// Middleware to verify Twilio webhook signature
function verifyTwilioRequest(req, res, next) {
  const twilioSignature = req.headers['x-twilio-signature'];
  const url = process.env.TWILIO_WEBHOOK_URL; // The full URL of this webhook endpoint
  const params = req.body;

  if (!twilioSignature || !url) {
    console.warn('Twilio signature or webhook URL missing');
    return res.status(403).send('Forbidden');
  }

  const sortedKeys = Object.keys(params).sort();
  let data = url;
  sortedKeys.forEach(key => {
    data += key + params[key];
  });

  const computedSignature = crypto
    .createHmac('sha1', process.env.TWILIO_AUTH_TOKEN)
    .update(Buffer.from(data, 'utf-8'))
    .digest('base64');

  if (computedSignature !== twilioSignature) {
    console.warn('Invalid Twilio signature');
    return res.status(403).send('Forbidden');
  }

  next();
}

router.post('/webhook', async (req, res) => {
  const incomingMsg = req.body.Body || req.body.body || req.body.message || '';
  const from = req.body.From || req.body.from || '';

  console.log('Received WhatsApp message from:', from);
  console.log('Message content:', incomingMsg);

  if (!incomingMsg || !from) {
    console.warn('Missing message or sender');
    return res.status(400).send('Bad Request');
  }

  try {
    const reply = await processIncomingMessage(incomingMsg);
    await sendWhatsAppMessage(from.replace('whatsapp:', ''), reply);
    console.log('Reply sent successfully');
    res.status(200).send('Message processed');
  } catch (error) {
    console.error('Error processing WhatsApp message:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
