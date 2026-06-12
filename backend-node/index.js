const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Schema for Contact
const contactSchema = new mongoose.Schema({
  message: String,
  binary: String,
  timestamp: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', contactSchema);

// Dummy connection string (would normally use process.env.MONGO_URI)
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error: ', err));

// Routes
app.get('/', (req, res) => {
  res.send('AI Portfolio Backend Running');
});

app.post('/api/contact', async (req, res) => {
  try {
    const { message, binary } = req.body;
    const newContact = new ContactModel({ message, binary });
    await newContact.save();
    res.status(200).json({ success: true, message: 'Message stored successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Proxy route to Python Backend (Simulated here if Python not running, else use Axios to fetch)
app.post('/api/ai/chat', async (req, res) => {
  try {
    // normally: const response = await axios.post('http://127.0.0.1:8000/ai/chat', req.body);
    // res.json(response.data);
    res.json({ response: "This is proxied via Node.js" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to contact Python AI' });
  }
});

app.listen(PORT, () => {
  console.log(`Node Server running on port ${PORT}`);
});
