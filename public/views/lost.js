import { getToken } from '../auth.js';

// Function to fetch and display lost items
async function fetchItems() {
    try {
        const token = getToken(); // Ensure you're using a valid token
        if (!token) {
            window.location.href = '/login'; // Redirect to login if not authenticated
            return;
        }

        const response = await fetch('/api/items', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const items = await response.json();
        const grid = document.getElementById('lost-items-grid');
        grid.innerHTML = items.map(item => createItemCard(item)).join('');
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Function to create HTML for an item card
function createItemCard(item) {
    return `
        <div class="item-card">
            <img src="${item.image ? `/uploads/${item.image}` : 'placeholder-image.jpg'}" alt="${item.name}">
            <div class="item-card-content">
                <h3>${item.name}</h3>
                <p>Location: ${item.location}</p>
                <p>Date: ${new Date(item.dateFound).toLocaleDateString()}</p>
                <button class="btn contact-btn" data-contact="${item.contactInfo}">Contact</button>
            </div>
        </div>
    `;
}

// Add event listener for contact buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('contact-btn')) {
        alert(`Contact information: ${e.target.dataset.contact}`);
    }
});

// Fetch items when the page loads
window.onload = fetchItems;

export default fetchItems;
