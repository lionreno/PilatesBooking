// We Used This Resource https://www.npmjs.com/package/mysql2-promise
// And This one https://stackoverflow.com/questions/58218269/promises-in-mysql2
const mysql = require('mysql2/promise');

// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '12345',
    database: process.env.DB_NAME || 'pure_balance_pilates',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        return false;
    }
}

// Initialize database tables
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        
        // Create bookings table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                booking_date DATE NOT NULL,
                booking_time VARCHAR(10) NOT NULL,
                class_type VARCHAR(20) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                participants INT NOT NULL DEFAULT 1,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_date (booking_date)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        // Create contact_messages table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20),
                subject VARCHAR(50) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_subject (subject)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        connection.release();
        console.log('Database tables initialized');
    } catch (error) {
        console.error('Database initialization failed:', error.message);
    }
}

module.exports = {
    pool,
    testConnection,
    initializeDatabase
};


