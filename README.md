# WhatsApp Chatbot SaaS for Indian E-Commerce

This project is a full-stack AI-powered chatbot SaaS application designed specifically for Indian e-commerce sellers and WhatsApp businesses. It enables sellers to manage their product catalog, orders, and customer interactions through an AI chatbot integrated with WhatsApp.

## Tech Stack

- Frontend: React.js with Tailwind CSS for responsive UI
- Backend: Node.js with Express framework
- Database: MongoDB for data persistence
- AI/NLP: OpenAI API or Rasa NLU for chatbot intelligence
- Deployment: Vercel for frontend, Railway or AWS for backend

## Features

- User authentication and role management (Seller, Support Agent, Admin)
- Seller dashboard with chatbot configuration, product catalog, order tracking, inventory management, and analytics
- AI chatbot with trainable intents, product recommendations, and multi-language support
- WhatsApp Business integration using Twilio or Gupshup API
- Smart inventory and order management system
- Admin panel for managing sellers and subscription plans
- Pricing and subscription management integrated with Razorpay

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance or cluster
- Twilio or Gupshup account for WhatsApp integration
- OpenAI API key (if using OpenAI for AI/NLP)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/sakshamraj07/whatsapp-chat-boat.git
   cd whatsapp-chat-boat
   ```

2. Backend setup:
   ```
   cd backend
   npm install
   ```
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   ```

3. Start the backend server:
   ```
   npm start
   ```

4. Frontend setup:
   ```
   cd ../frontend
   npm install
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## License

This project is licensed under the MIT License.
