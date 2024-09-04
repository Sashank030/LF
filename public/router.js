import { renderContent } from './app.js';
import { isLoggedIn, logout } from './auth.js';
import home from './views/home.js';
import lost from './views/lost.js';
import found from './views/found.js';
import loginView from './views/login.js'; 
import registerView from './views/register.js';

const routes = {
    '/': home,
    '/lost': lost,
    '/found': found,
    '/login': loginView,
    '/register': registerView,
    '/logout': () => {
        logout();
        router.navigateTo('/');
    }
};

class Router {
    init() {
        console.log('Router initialized');
        window.addEventListener('popstate', () => this.route());
        this.route();
    }

    route() {
        const path = window.location.pathname;
        console.log('Routing to:', path);
        const view = routes[path] ? routes[path] : () => `<h1>404 Not Found</h1>`;
        renderContent(view());
    }

    navigateTo(url) {
        console.log('Navigating to:', url);
        window.history.pushState(null, null, url);
        this.route();
    }
}

export const router = new Router();
router.init(); 
