const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection, initializeDatabase } = require('./config/database');
const bookingRoutes = require('./routes/booking');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;
const adminPath = path.join(__dirname, 'admin');

// Middleware
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve admin assets (bookings / contacts dashboards)
app.use('/admin', express.static(adminPath));
app.get('/admin', (req, res) => {
    res.sendFile(path.join(adminPath, 'view-bookings.html'));
});

// API Routes 
app.use('/api/booking', bookingRoutes);
app.use('/api/contact', contactRoutes);


// Initialize database on startup
async function startServer() {
    try {
        // Test database connection
        const connected = await testConnection();
        if (!connected) {
            console.error(' Database connection failed. Please check your database configuration.');
            process.exit(1);
        }

        // Initialize database tables
        await initializeDatabase();

        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`Booking API: http://localhost:${PORT}/api/booking`);
            console.log(`Contact API: http://localhost:${PORT}/api/contact`);
        });

    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
}

// Error handling middleware 
app.use((err, req, res, next) => {
    console.error('Error:', err);
    // Only send JSON for API routes
    if (req.path.startsWith('/api')) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    } else {
        res.status(500).send('Internal server error');
    }
});

// 404 handler 
app.use((req, res) => {
    // Only send JSON for API routes
    if (req.path.startsWith('/api')) {
        res.status(404).json({
            success: false,
            message: 'Route not found'
        });
    } else {
        res.status(404).send('Page not found');
    }
});

startServer();


