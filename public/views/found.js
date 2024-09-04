import { getToken } from '../auth.js';
import { router } from '../router.js';

export function found() {
    return `
        <main>
            <section class="found-items-form container">
                <h2>Report a Found Item</h2>
                <form id="found-item-form">
                    <div class="form-group">
                        <label for="item-name">Item Name</label>
                        <input type="text" id="item-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="location">Location Found</label>
                        <input type="text" id="location" name="location" required>
                    </div>
                    <div class="form-group">
                        <label for="date-found">Date Found</label>
                        <input type="date" id="date-found" name="dateFound" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="contact-info">Your Contact Information</label>
                        <input type="text" id="contact-info" name="contactInfo" required>
                    </div>
                    <div class="form-group">
                       <label for="image">Image</label>
                      <input type="file" id="image" name="image" required>
                     </div>
                 <button type="submit" class="btn">Submit Found Item</button>
                </form>
            </section>
        </main>
    `;
}

document.addEventListener('submit', async (e) => {
    if (e.target.id === 'found-item-form') {
        e.preventDefault();
        const formData = new FormData(e.target);
        const itemData = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify(itemData)
            });
            
            if (response.ok) {
                alert('Item reported successfully!');
                router.navigateTo('/lost');
            } else {
                alert('Error reporting item. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }
});
