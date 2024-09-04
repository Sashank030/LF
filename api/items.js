const itemsKey = 'items';

export async function fetchItems() {
    const items = JSON.parse(localStorage.getItem(itemsKey)) || [];
    return items;
}

export async function addItem(item) {
    const items = await fetchItems();
    items.push(item);
    localStorage.setItem(itemsKey, JSON.stringify(items));
}

export async function loginUser(credentials) {
    // Mock login logic
    if (credentials.username === 'admin' && credentials.password === 'admin') {
        return { token: 'mock-token' };
    } else {
        throw new Error('Invalid credentials');
    }
}
