const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://SashankAsapu:Sashank30@cluster0.6cbaufs.mongodb.net/BDMS?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const itemSchema = new mongoose.Schema({
    name: String,
    location: String,
    dateFound: Date,
    description: String,
    contactInfo: String,
    image: String,
});

const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Register user
app.post('/api/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
            res.json({ token });
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Report found item
app.post('/api/items', authenticateToken, async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send('Item reported successfully');
    } catch (error) {
        res.status(500).send('Error reporting item');
    }
});

// Get all items
app.get('/api/items', authenticateToken, async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).send('Error fetching items');
    }
});

// Catch-all route to serve the main HTML file for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/uploads');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
});

app.post('/api/items', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const item = new Item({
            name: req.body.name,
            location: req.body.location,
            image: req.file.filename // Save the filename of the uploaded image
        });
        await item.save();
        res.status(201).send('Item reported successfully');
    } catch (error) {
        res.status(500).send('Error reporting item');
    }
});

app.get('/api/items', authenticateToken, async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).send('Error fetching items');
    }
});
