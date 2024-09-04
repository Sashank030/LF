document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        document.body.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Button hover animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.05, duration: 0.2 });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.2 });
        });
    });

    // Handle found item form submission
    const foundItemForm = document.getElementById('found-item-form');
    if (foundItemForm) {
        foundItemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(foundItemForm);
            const itemData = Object.fromEntries(formData.entries());
            
            // Store the item data in localStorage (for demo purposes)
            const storedItems = JSON.parse(localStorage.getItem('lostItems') || '[]');
            storedItems.push(itemData);
            localStorage.setItem('lostItems', JSON.stringify(storedItems));

            alert('Item reported successfully!');
            foundItemForm.reset();
        });
    }

    // Display lost items
    const lostItemsGrid = document.getElementById('lost-items-grid');
    if (lostItemsGrid) {
        const storedItems = JSON.parse(localStorage.getItem('lostItems') || '[]');
        storedItems.forEach(item => {
            const itemCard = createItemCard(item);
            lostItemsGrid.appendChild(itemCard);
        });
    }
});

function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';

    const img = document.createElement('img');
    img.src = item['item-image'] || 'placeholder-image.jpg';
    img.alt = item['item-name'];

    const content = document.createElement('div');
    content.className = 'item-card-content';

    const title = document.createElement('h3');
    title.textContent = item['item-name'];

    const location = document.createElement('p');
    location.textContent = `Location: ${item.location}`;

    const date = document.createElement('p');
    date.textContent = `Date: ${item['date-found']}`;

    const contactBtn = document.createElement('button');
    contactBtn.className = 'btn';
    contactBtn.textContent = 'Contact';
    contactBtn.addEventListener('click', () => {
        alert(`Contact information: ${item['contact-info']}`);
    });

    content.appendChild(title);
    content.appendChild(location);
    content.appendChild(date);
    content.appendChild(contactBtn);

    card.appendChild(img);
    card.appendChild(content);

    return card;
}
