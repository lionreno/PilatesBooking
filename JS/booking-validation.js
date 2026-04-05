// Booking Form Validation - JavaScript Layer
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const errorContainer = document.getElementById('bookingErrors');
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

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

    function validateDate(value) {
        if (!value) {
            return 'Date is required';
        }
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            return 'Date cannot be in the past';
        }
        return '';
    }

    function validateTime(value) {
        if (!value || value === '') {
            return 'Time is required';
        }
        return '';
    }

    function validateClassType(value) {
        if (!value || value === '') {
            return 'Class type is required';
        }
        const validTypes = ['Starter', 'Flow', 'Restore'];
        if (!validTypes.includes(value)) {
            return 'Please select a valid class type';
        }
        return '';
    }

    function validatePhone(value) {
        if (!value || value.trim() === '') {
            return 'Phone number is required';
        }
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
        return '';
    }

    function validateParticipants(value) {
        if (!value || value === '') {
            return 'Number of participants is required';
        }
        const num = parseInt(value);
        if (isNaN(num) || num < 1 || num > 10) {
            return 'Number of participants must be between 1 and 10';
        }
        return '';
    }

    function validateNotes(value) {
        if (value && value.length > 500) {
            return 'Notes must not exceed 500 characters';
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

        // Validate Date
        const date = document.getElementById('date').value;
        const dateError = validateDate(date);
        if (dateError) {
            showFieldError('date', dateError);
            errors.push('Date: ' + dateError);
            isValid = false;
        } else {
            clearFieldError('date');
        }

        // Validate Time
        const time = document.getElementById('time').value;
        const timeError = validateTime(time);
        if (timeError) {
            showFieldError('time', timeError);
            errors.push('Time: ' + timeError);
            isValid = false;
        } else {
            clearFieldError('time');
        }

        // Validate Class Type
        const type = document.getElementById('type').value;
        const typeError = validateClassType(type);
        if (typeError) {
            showFieldError('type', typeError);
            errors.push('Class Type: ' + typeError);
            isValid = false;
        } else {
            clearFieldError('type');
        }

        // Validate Phone
        const phone = document.getElementById('phone').value;
        const phoneError = validatePhone(phone);
        if (phoneError) {
            showFieldError('phone', phoneError);
            errors.push('Phone: ' + phoneError);
            isValid = false;
        } else {
            clearFieldError('phone');
        }

        // Validate Participants
        const participants = document.getElementById('participants').value;
        const participantsError = validateParticipants(participants);
        if (participantsError) {
            showFieldError('participants', participantsError);
            errors.push('Participants: ' + participantsError);
            isValid = false;
        } else {
            clearFieldError('participants');
        }

        // Validate Notes
        const notes = document.getElementById('notes').value;
        const notesError = validateNotes(notes);
        if (notesError) {
            showFieldError('notes', notesError);
            errors.push('Notes: ' + notesError);
            isValid = false;
        } else {
            clearFieldError('notes');
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
    const fields = ['fname', 'lname', 'email', 'date', 'time', 'type', 'phone', 'participants', 'notes'];
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
                    case 'date':
                        error = validateDate(value);
                        break;
                    case 'time':
                        error = validateTime(value);
                        break;
                    case 'type':
                        error = validateClassType(value);
                        break;
                    case 'phone':
                        error = validatePhone(value);
                        break;
                    case 'participants':
                        error = validateParticipants(value);
                        break;
                    case 'notes':
                        error = validateNotes(value);
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
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            type: document.getElementById('type').value,
            phone: document.getElementById('phone').value.trim(),
            participants: parseInt(document.getElementById('participants').value),
            notes: document.getElementById('notes').value.trim()
        };

        // Disable submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            // Send data to API
            const response = await fetch('http://localhost:3000/api/booking/process', {
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
                window.location.href = 'booking-success.html?success=1';
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
                submitBtn.textContent = 'Confirm';
            }
        } catch (error) {
            console.error('Error:', error);
            errorContainer.innerHTML = '<ul><li>An error occurred. Please try again later.</li></ul>';
            errorContainer.classList.add('show');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Confirm';
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

