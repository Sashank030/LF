import { router } from '../router.js';

export const registerView = () => `
    <main>
        <section class="register-form container">
            <h2>Register</h2>
            <form id="register-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirmPassword" required>
                </div>
                <button type="submit" class="btn">Register</button>
            </form>
        </section>
    </main>
`;

document.addEventListener('submit', async (e) => {
    if (e.target.id === 'register-form') {
        e.preventDefault();
        const formData = new FormData(e.target);
        const registerData = Object.fromEntries(formData.entries());

        if (registerData.password !== registerData.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                alert('Registration successful!');
                router.navigateTo('/login');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }
});
