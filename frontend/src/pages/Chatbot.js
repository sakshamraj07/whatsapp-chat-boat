import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Chatbot() {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((msgs) => [...msgs, { sender: 'bot', text: data.reply }]);
      } else {
        setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Error: ' + (data.message || 'Failed to get response') }]);
      }
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Error: Failed to get response' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 border rounded shadow flex flex-col h-[600px]">
      <h2 className="text-2xl font-bold mb-4">AI Chatbot</h2>
      <div className="flex-1 overflow-y-auto mb-4 p-2 border rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 max-w-xs p-2 rounded ${
              msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <textarea
        className="border rounded p-2 mb-2 resize-none"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}

export default Chatbot;
