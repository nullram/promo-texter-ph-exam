import request from 'supertest';
import app, { dataStore } from '../server';

describe('User API', () => {
  beforeEach(() => {
    // Reset users before each test
    dataStore.users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ];
    dataStore.nextId = 4;
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ]);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by id', async () => {
      const response = await request(app).get('/api/users/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, name: 'Alice' });
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app).get('/api/users/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = { name: 'David' };
      const response = await request(app).post('/api/users').send(newUser);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: 4, name: 'David' });
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app).post('/api/users').send({});
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name is required' });
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const updatedUser = { name: 'Alice Updated' };
      const response = await request(app).put('/api/users/1').send(updatedUser);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, name: 'Alice Updated' });
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app).put('/api/users/999').send({ name: 'Test' });
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app).put('/api/users/1').send({});
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name is required' });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const response = await request(app).delete('/api/users/1');
      expect(response.status).toBe(204);
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app).delete('/api/users/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });
});