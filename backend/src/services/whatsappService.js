const OpenAI = require("openai");
const axios = require('axios');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function processIncomingMessage(message) {
  // Use OpenAI API to generate chatbot response
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Verify this model name is correct; update if necessary
      messages: [
        { role: "system", content: "You are a helpful assistant for Indian e-commerce WhatsApp chatbot." },
        { role: "user", content: message }
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "Sorry, I couldn't process your request right now.";
  }
}

async function sendWhatsAppMessage(to, message) {
  // Use Twilio API to send WhatsApp message
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_NUMBER;
  const client = require('twilio')(accountSid, authToken);

  try {
    await client.messages.create({
      from: `whatsapp:${from}`,
      to: `whatsapp:${to}`,
      body: message,
    });
  } catch (error) {
    console.error('Twilio send message error:', error);
    throw error; // Propagate error to caller
  }
}

module.exports = {
  processIncomingMessage,
  sendWhatsAppMessage,
};
