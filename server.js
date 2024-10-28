const express = require('express');
const loggerMiddleware = require('./middleware/logger'); 
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(loggerMiddleware);

let users = [
    { id: 1, username: 'Mbappe' },
    { id: 2, username: 'Haaland' },
];
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the index.html file
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, username: req.body.username };
    users.push(newUser);
    res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex >= 0) {
        users[userIndex].username = req.body.username;
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex >= 0) {
        users.splice(userIndex, 1);
        res.status(204).send(); // No content
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
