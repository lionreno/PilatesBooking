const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { contactValidation, checkValidation, sanitizeInput  } = require('../middleware/validation');

// Process contact form submission
router.post('/process', contactValidation, checkValidation, async (req, res) => {
    try {
        console.log('Contact form submission received:', req.body);
        // Sanitize data after validation
        const cleanData = sanitizeInput(req.body);
        const {
            fname,
            lname,
            email,
            phone,
            subject,
            message
        } = cleanData;

        // Insert contact message into database
        const [result] = await pool.execute(
            `INSERT INTO contact_messages 
            (first_name, last_name, email, phone, subject, message) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [fname, lname, email, phone || null, subject, message]
        );

        console.log('Contact message saved with ID:', result.insertId);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully!',
            messageId: result.insertId
        });

    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while sending your message. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Get all contact messages (for admin/view page)
router.get('/all', async (req, res) => {
    try {
        const [messages] = await pool.execute(
            `SELECT id, first_name, last_name, email, phone, subject, message, created_at 
             FROM contact_messages 
             ORDER BY created_at DESC`
        );

        res.status(200).json({
            success: true,
            data: messages
        });

    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching messages'
        });
    }
});

module.exports = router;

