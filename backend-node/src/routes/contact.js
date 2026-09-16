const express = require('express');
const router = express.Router();
const ContactModel = require('../models/Contact');
const rateLimit = require('express-rate-limit');

// Rate limiting for contact endpoint (10 requests per 15 min window)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, error: 'Too many requests, please try again later.' }
});

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required' });
    }

    const newContact = new ContactModel({ name, email, message });
    await newContact.save();
    
    res.status(201).json({ success: true, message: 'Message stored successfully' });
  } catch (error) {
    next(error); // Pass to error handler
  }
});

module.exports = router;
