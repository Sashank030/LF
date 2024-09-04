import { router } from '../router.js';

export const loginView = () => `
    <main>
        <section class="login-form container">
            <h2>Login</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn">Login</button>
            </form>
        </section>
    </main>
`;

document.addEventListener('submit', async (e) => {
    if (e.target.id === 'login-form') {
        e.preventDefault();
        const formData = new FormData(e.target);
        const loginData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('token', token);
                router.navigateTo('/');
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }
});
