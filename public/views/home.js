import { isLoggedIn } from '../auth.js';
import { router } from '../router.js';

export function home() {
    return `
        <main>
            <section class="hero">
                <h1>Lost&<span>Found</span></h1>
                <p>Manage LOST & FOUND items easily. Add and update items, release items to customers, and capture customer information.</p>
                <div class="cta-buttons">
                    <button id="lost-btn" class="btn">Lost</button>
                    <button id="found-btn" class="btn">Found</button>
                </div>
            </section>
        </main>
    `;
}

document.addEventListener('click', (e) => {
    if (e.target.id === 'lost-btn') {
        router.navigateTo('/lost');
    } else if (e.target.id === 'found-btn') {
        if (isLoggedIn()) {
            router.navigateTo('/found');
        } else {
            router.navigateTo('/login');
        }
    }
});
