
// We Used This Resource https://express-validator.github.io/docs/6.1.0/validation-result-api/

const { body, validationResult } = require('express-validator');

// Sanitize input to prevent XSS
function sanitizeInput(data) {
    if (typeof data === 'string') {
        return data.trim().replace(/[<>]/g, '');
    }
    if (Array.isArray(data)) {
        return data.map(sanitizeInput);
    }
    if (typeof data === 'object' && data !== null) {
        const sanitized = {};
        for (const key in data) {
            sanitized[key] = sanitizeInput(data[key]);
        }
        return sanitized;
    }
    return data;
}

// Booking form validation rules
const bookingValidation = [
    // First Name validation
    body('fname')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 50 }).withMessage(
            'First name must be between 2 and 50 characters'
        )
        .matches(/^[A-Za-z\s]+$/).withMessage(
            'First name must contain only letters and spaces'
        ).escape(),
    
    // Last Name validation
    body('lname')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 50 }).withMessage(
            'Last name must be between 2 and 50 characters'
        )
        .matches(/^[A-Za-z\s]+$/).withMessage(
            'Last name must contain only letters and spaces'
        ).escape(),
    
    // Email validation
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .isLength({ max: 100 }).withMessage('Email must not exceed 100 characters')
        .normalizeEmail(),
    
    // Date validation
    body('date')
        .trim()
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Please enter a valid date')
        .custom((value) => {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                throw new Error('Date cannot be in the past');
            }
            return true;
        }),
    
    // Time validation
    body('time')
        .trim()
        .notEmpty().withMessage('Time is required')
        .isIn([
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00'
        ]).withMessage('Please select a valid time'),
    
    // Class Type validation
    body('type')
        .trim()
        .notEmpty().withMessage('Class type is required')
        .isIn([
            'Starter',
            'Flow',
            'Restore'
        ]).withMessage('Please select a valid class type'),
    
    // Phone validation
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .isLength({ max: 20 }).withMessage(
            'Phone number must not exceed 20 characters'
        )
        .matches(/^[\+]?[0-9\s\-\(\)]+$/).withMessage(
            'Please enter a valid phone number'
        ).custom((value) => {
            const digits = value.replace(/\D/g, '');
            if (digits.length < 8) {
                throw new Error('Phone number must contain at least 8 digits');
            }
            return true;
        }).escape(),
    
    // Participants validation
    body('participants')
        .trim()
        .notEmpty().withMessage('Number of participants is required')
        .isInt({ min: 1, max: 10 }).withMessage(
            'Number of participants must be between 1 and 10'
        ).toInt(),
    
    // Notes validation (optional)
    body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage(
            'Notes must not exceed 500 characters'
        ).escape()
];

// Contact form validation rules
const contactValidation = [
    // First Name validation
    body('fname')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 50 }).withMessage(
            'First name must be between 2 and 50 characters'
        )
        .matches(/^[A-Za-z\s]+$/).withMessage(
            'First name must contain only letters and spaces'
        ).escape(),
    
    // Last Name validation
    body('lname')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 50 }).withMessage(
            'Last name must be between 2 and 50 characters'
        )
        .matches(/^[A-Za-z\s]+$/).withMessage(
            'Last name must contain only letters and spaces'
        ).escape(),
    
    // Email validation
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .isLength({ max: 100 }).withMessage(
            'Email must not exceed 100 characters'
        ).normalizeEmail(),
    
    // Phone validation (optional)
    body('phone')
        .optional()
        .trim()
        .isLength({ max: 20 }).withMessage('Phone number must not exceed 20 characters')
        .matches(/^[\+]?[0-9\s\-\(\)]+$/).withMessage('Please enter a valid phone number')
        .custom((value) => {
            if (value && value.trim() !== '') {
                const digits = value.replace(/\D/g, '');
                if (digits.length < 8) {
                    throw new Error('Phone number must contain at least 8 digits');
                }
            }
            return true;
        }).escape(),
    
    // Subject validation
    body('subject')
        .trim()
        .notEmpty().withMessage('Subject is required')
        .isIn([
            'General Inquiry',
            'Class Information',
            'Membership',
            'Feedback',
            'Other'
        ])
        .withMessage('Please select a valid subject'),
    
    // Message validation
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10, max: 1000 }).withMessage(
            'Message must be between 10 and 1000 characters'
        ).escape()
];

// Middleware to check validation results
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errorMessages
        });
    }
    next();
};

module.exports = {
    bookingValidation,
    contactValidation,
    checkValidation,
    sanitizeInput
};


