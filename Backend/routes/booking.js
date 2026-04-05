const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { bookingValidation, checkValidation ,sanitizeInput } = require('../middleware/validation');

// Process booking form submission
router.post('/process', bookingValidation, checkValidation, async (req, res) => {

    try {
        
        // Sanitize data after validation
        const cleanData = sanitizeInput(req.body);
        const {
            fname,
            lname,
            email,
            date,
            time,
            type,
            phone,
            participants,
            notes
        } = cleanData;

        // Insert booking into database
        const [result] = await pool.execute(
            `INSERT INTO bookings 
            (first_name, last_name, email, booking_date, booking_time, class_type, phone, participants, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [fname, lname, email, date, time, type, phone, participants, notes || null]
        );

        res.status(200).json({
            success: true,
            message: 'Booking submitted successfully!',
            bookingId: result.insertId
        });

    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your booking. Please try again later.'
        });
    }
});

// Get all bookings (for admin/view page)
router.get('/all', async (req, res) => {
    try {
        const [bookings] = await pool.execute(
            `SELECT id, first_name, last_name, email, booking_date, booking_time, 
             class_type, phone, participants, notes, created_at 
             FROM bookings 
             ORDER BY booking_date ASC, 
                      TIME(booking_time) ASC, 
                      created_at ASC`
        );

        res.status(200).json({
            success: true,
            data: bookings
        });

    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings'
        });
    }
});

module.exports = router;


