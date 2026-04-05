// display contacts messages 
document.addEventListener('DOMContentLoaded', async function() {
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const container = document.getElementById('messages-container');
    const tbody = document.getElementById('messages-tbody');

    try {
        const response = await fetch('/api/contact/all');
        const result = await response.json();

        loading.style.display = 'none';

        if (result.success && result.data) {
            if (result.data.length === 0) {
                container.innerHTML = '<p>No messages found.</p>';
                container.style.display = 'block';
                return;
            }

            result.data.forEach(message => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${message.id}</td>
                    <td>${message.first_name} ${message.last_name}</td>
                    <td>${message.email}</td>
                    <td>${message.phone || '-'}</td>
                    <td>${message.subject}</td>
                    <td>${message.message}</td>
                    <td>${formatDateTime(message.created_at)}</td>
                `;
                tbody.appendChild(row);
            });

            container.style.display = 'block';
        } else {
            errorDiv.textContent = result.message || 'Error loading messages';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        loading.style.display = 'none';
        errorDiv.textContent = 'An error occurred while loading messages. Please try again later.';
        errorDiv.style.display = 'block';
    }
});


function formatDateTime(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (window.innerWidth <= 576) {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

