// Contact Form Validation - JavaScript Layer
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const errorContainer = document.getElementById('contactErrors');

    // Validation functions
    function validateFirstName(value) {
        if (!value || value.trim() === '') {
            return 'First name is required';
        }
        if (value.length > 50) {
            return 'First name must not exceed 50 characters';
        }
        if (!/^[A-Za-z\s]+$/.test(value)) {
            return 'First name must contain only letters and spaces';
        }
        return '';
    }

    function validateLastName(value) {
        if (!value || value.trim() === '') {
            return 'Last name is required';
        }
        if (value.length > 50) {
            return 'Last name must not exceed 50 characters';
        }
        if (!/^[A-Za-z\s]+$/.test(value)) {
            return 'Last name must contain only letters and spaces';
        }
        return '';
    }

    function validateEmail(value) {
        if (!value || value.trim() === '') {
            return 'Email is required';
        }
        if (value.length > 100) {
            return 'Email must not exceed 100 characters';
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    function validatePhone(value) {
        if (value && value.trim() !== '') {
            if (value.length > 20) {
                return 'Phone number must not exceed 20 characters';
            }
            const phonePattern = /^[\+]?[0-9\s\-\(\)]+$/;
            if (!phonePattern.test(value)) {
                return 'Please enter a valid phone number';
            }
            if (value.replace(/\D/g, '').length < 8) {
                return 'Phone number must contain at least 8 digits';
            }
        }
        return '';
    }

    function validateSubject(value) {
        if (!value || value === '') {
            return 'Subject is required';
        }
        const validSubjects = [
            'General Inquiry',
            'Class Information',
            'Membership', 'Feedback',
            'Other'
        ];
        if (!validSubjects.includes(value)) {
            return 'Please select a valid subject';
        }
        return '';
    }

    function validateMessage(value) {
        if (!value || value.trim() === '') {
            return 'Message is required';
        }
        if (value.length < 10) {
            return 'Message must be at least 10 characters long';
        }
        if (value.length > 1000) {
            return 'Message must not exceed 1000 characters';
        }
        return '';
    }

    // Display error for a specific field
    function showFieldError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#dc3545';
        }
    }

    // Clear error for a specific field
    function clearFieldError(fieldId) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '';
        }
    }

    // Validate all fields
    function validateForm() {
        let isValid = true;
        const errors = [];

        // Validate First Name
        const fname = document.getElementById('fname').value;
        const fnameError = validateFirstName(fname);
        if (fnameError) {
            showFieldError('fname', fnameError);
            errors.push('First Name: ' + fnameError);
            isValid = false;
        } else {
            clearFieldError('fname');
        }

        // Validate Last Name
        const lname = document.getElementById('lname').value;
        const lnameError = validateLastName(lname);
        if (lnameError) {
            showFieldError('lname', lnameError);
            errors.push('Last Name: ' + lnameError);
            isValid = false;
        } else {
            clearFieldError('lname');
        }

        // Validate Email
        const email = document.getElementById('email').value;
        const emailError = validateEmail(email);
        if (emailError) {
            showFieldError('email', emailError);
            errors.push('Email: ' + emailError);
            isValid = false;
        } else {
            clearFieldError('email');
        }

        // Validate Phone (optional)
        const phone = document.getElementById('phone').value;
        const phoneError = validatePhone(phone);
        if (phoneError) {
            showFieldError('phone', phoneError);
            errors.push('Phone: ' + phoneError);
            isValid = false;
        } else {
            clearFieldError('phone');
        }

        // Validate Subject
        const subject = document.getElementById('subject').value;
        const subjectError = validateSubject(subject);
        if (subjectError) {
            showFieldError('subject', subjectError);
            errors.push('Subject: ' + subjectError);
            isValid = false;
        } else {
            clearFieldError('subject');
        }

        // Validate Message
        const message = document.getElementById('message').value;
        const messageError = validateMessage(message);
        if (messageError) {
            showFieldError('message', messageError);
            errors.push('Message: ' + messageError);
            isValid = false;
        } else {
            clearFieldError('message');
        }

        // Display general errors
        if (errors.length > 0) {
            errorContainer.innerHTML = '<ul><li>' + errors.join('</li><li>') + '</li></ul>';
            errorContainer.classList.add('show');
        } else {
            errorContainer.classList.remove('show');
            errorContainer.innerHTML = '';
        }

        return isValid;
    }

    // Real-time validation on blur
    const fields = ['fname', 'lname', 'email', 'phone', 'subject', 'message'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                const value = this.value;
                let error = '';

                switch(fieldId) {
                    case 'fname':
                        error = validateFirstName(value);
                        break;
                    case 'lname':
                        error = validateLastName(value);
                        break;
                    case 'email':
                        error = validateEmail(value);
                        break;
                    case 'phone':
                        error = validatePhone(value);
                        break;
                    case 'subject':
                        error = validateSubject(value);
                        break;
                    case 'message':
                        error = validateMessage(value);
                        break;
                }

                if (error) {
                    showFieldError(fieldId, error);
                } else {
                    clearFieldError(fieldId);
                }
            });

            field.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(220, 53, 69)') {
                    clearFieldError(fieldId);
                }
            });
        }
    });

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            // Scroll to first error
            const firstError = document.querySelector('.field-error[style*="block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Collect form data
        const formData = {
            fname: document.getElementById('fname').value.trim(),
            lname: document.getElementById('lname').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim() || null,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim()
        };

        // Disable submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Send data to API
            const response = await fetch('http://localhost:3000/api/contact/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Check if response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Get response text first to check if it's valid JSON
            const responseText = await response.text();
            
            if (!responseText) {
                throw new Error('Empty response from server');
            }

            let result;
            try {
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                console.error('Response text:', responseText);
                throw new Error('Invalid response from server');
            }

            if (result.success) {
                // Success - redirect to success page
                window.location.href = 'contact-success.html?success=1';
            } else {
                // Show backend validation errors
                if (result.errors && result.errors.length > 0) {
                    errorContainer.innerHTML = '<ul><li>' + result.errors.join('</li><li>') + '</li></ul>';
                    errorContainer.classList.add('show');
                } else {
                    errorContainer.innerHTML = '<ul><li>' + (result.message || 'An error occurred') + '</li></ul>';
                    errorContainer.classList.add('show');
                }
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send';
            }
        } catch (error) {
            console.error('Error:', error);
            errorContainer.innerHTML = '<ul><li>An error occurred. Please try again later.</li></ul>';
            errorContainer.classList.add('show');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send';
        }
    });

    // Reset form handler
    form.addEventListener('reset', function() {
        fields.forEach(fieldId => {
            clearFieldError(fieldId);
        });
        errorContainer.classList.remove('show');
        errorContainer.innerHTML = '';
    });
});

