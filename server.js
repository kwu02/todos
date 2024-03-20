// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection string
const MONGODB_URI = "mongodb+srv://kwu2:ca94134@cluster0.ojjpz8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

// Define a schema for the Todo model
const todoSchema = new mongoose.Schema({
    todo: String
});

// Define the Todo model
const Todo = mongoose.model('Todo', todoSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to fetch all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add a new todo
app.post('/todos', async (req, res) => {
    const todoText = req.body.todo;
    const todo = new Todo({ todo: todoText });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


