const express = require('express');
const router = express.Router();

// In-memory todos array (for testing/demo purposes)
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build a todo app', completed: true }
];

// GET all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// POST a new todo
router.post('/', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'Title is required and must be a string' });
  }

  const newTodo = {
    id: Date.now(), // Simple unique ID
    title,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// TOGGLE completed status
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    completed: !todos[todoIndex].completed
  };

  res.json(todos[todoIndex]);
});

// DELETE a todo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  const deletedTodo = todos[todoIndex];
  todos = todos.filter(todo => todo.id !== id);
  
  res.json(deletedTodo);
});

module.exports = router;