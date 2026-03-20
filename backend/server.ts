import express from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for users (for simplicity)
export interface User {
  id: number;
  name: string;
}

export const dataStore = {
  users: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ] as User[],
  nextId: 4
};

// GET /api/users - Read all users
app.get('/api/users', (req, res) => {
  res.json(dataStore.users);
});

// GET /api/users/:id - Read a single user
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = dataStore.users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// POST /api/users - Create a new user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const newUser: User = { id: dataStore.nextId++, name };
  dataStore.users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id - Update a user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const userIndex = dataStore.users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  dataStore.users[userIndex].name = name;
  res.json(dataStore.users[userIndex]);
});

// DELETE /api/users/:id - Delete a user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = dataStore.users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  dataStore.users.splice(userIndex, 1);
  res.status(204).send();
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;