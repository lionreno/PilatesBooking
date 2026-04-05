// display all bookings 
document.addEventListener('DOMContentLoaded', async function() {
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const container = document.getElementById('bookings-container');
    const tbody = document.getElementById('bookings-tbody');

    try {
        const response = await fetch('/api/booking/all');
        const result = await response.json();

        loading.style.display = 'none';

        if (result.success && result.data) {
            if (result.data.length === 0) {
                container.innerHTML = '<p>No bookings found.</p>';
                container.style.display = 'block';
                return;
            }

            result.data.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.first_name} ${booking.last_name}</td>
                    <td>${booking.email}</td>
                    <td>${formatDate(booking.booking_date)}</td>
                    <td>${booking.booking_time}</td>
                    <td>${booking.class_type}</td>
                    <td>${booking.phone}</td>
                    <td>${booking.participants}</td>
                    <td>${booking.notes || '-'}</td>
                    <td>${formatDateTime(booking.created_at)}</td>
                `;
                tbody.appendChild(row);
            });

            container.style.display = 'block';
        } else {
            errorDiv.textContent = result.message || 'Error loading bookings';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        loading.style.display = 'none';
        errorDiv.textContent = 'An error occurred while loading bookings. Please try again later.';
        errorDiv.style.display = 'block';
    }
});

// Using this resource 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (window.innerWidth <= 576) {
        return date.toLocaleDateString(
            'en-US',
            { month: 'short', day: 'numeric' }
        );
    }
    return date.toLocaleDateString('en-US',
        { year: 'numeric', month: 'short', day: 'numeric' }
    );
}

function formatDateTime(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (window.innerWidth <= 576) {
        return date.toLocaleDateString(
            'en-US',
            { month: 'short', day: 'numeric' }
        );
    }
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

