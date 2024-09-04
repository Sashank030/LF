import { router } from './router.js';
import { isLoggedIn } from './auth.js';

const app = document.getElementById('app');

function renderNavigation() {
    return `
        <header>
            <nav class="container">
                <div class="logo">Lost&<span>Found</span></div>
                <ul>
                    <li><a href="/" data-link>Home</a></li>
                    <li><a href="/lost" data-link>Lost Items</a></li>
                    <li><a href="/found" data-link>Report Found</a></li>
                    ${isLoggedIn() ? `<li><a href="/logout" data-link>Logout</a></li>` 
                                   : `<li><a href="/login" data-link>Login</a></li>
                                      <li><a href="/register" data-link>Register</a></li>`}
                </ul>
            </nav>
        </header>
    `;
}

// Keep only one version of renderContent
export function renderContent(content) {
    console.log('Rendering content:', content);
    app.innerHTML = renderNavigation() + content;

    // Add event listeners for links
    document.querySelectorAll("[data-link]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            router.navigateTo(e.target.href);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    router.init();
});
