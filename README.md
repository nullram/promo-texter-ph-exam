# Q1
Identify **ALL** the issues and explain how to fix them [Q1](Q1.md)

# Q2
Identify **ALL** the issues and explain how to fix them [Q2](Q2.md)

# Practical Application

This project demonstrates a RESTful API with CRUD operations and a utility for generating phone number letter combinations.

## RESTful API with CRUD Operations
I created a RESTful API using Node.js with Express.js in TypeScript. The API provides CRUD operations for managing users, with endpoints for GET (read all and single), POST (create), PUT (update), and DELETE (delete).

### Files created:
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `jest.config.js`: Jest configuration for testing.
- `server.ts`: The main API server code.
- `server.test.ts`: Unit tests for the API.

### API Endpoints:
- `GET /api/users`: Returns all users.
- `GET /api/users/:id`: Returns a single user by ID.
- `POST /api/users`: Creates a new user (requires name in body).
- `PUT /api/users/:id`: Updates a user by ID (requires name in body).
- `DELETE /api/users/:id`: Deletes a user by ID.

### a. Explanation of Logic/Approach

Referencing the code/pseudo code from item #1 (the React component in Q1.md), which fetches data from `/api/users` every 2 seconds to display a list of users with filtering, I designed the API to provide the backend data source that the frontend consumes. The approach was to implement a simple in-memory data store (using an array of users) to simulate a database, allowing full CRUD operations so that the frontend can not only read but also manage the user data.

The logic follows REST principles:
- **Resource-based**: Users are the resource, accessed via `/api/users`.
- **HTTP Methods**: GET for reading, POST for creating, PUT for updating, DELETE for deleting.
- **Stateless**: Each request contains all necessary information.
- **JSON responses**: Consistent data format.
- **Error handling**: Proper HTTP status codes (200, 201, 204 for success; 400, 404 for errors).

This approach ensures the API is scalable, testable, and aligns with the frontend's needs for fetching and potentially modifying user data.

### b. Unit Test with AAA Pattern
The unit tests are written in TypeScript using Jest and Supertest, following the AAA (Arrange-Act-Assert) pattern. Each test:

- **Arrange**: Sets up the initial state (resets the data store).
- **Act**: Performs the API call.
- **Assert**: Verifies the response status and body.

The tests cover all CRUD operations, including edge cases like missing users or invalid input.

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the API

1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`.

## Running Tests

From the backend directory:
```bash
npm test
```
## Explanation of Approach

### API Logic
The API was designed to complement the React component from Q1.md, which fetches user data from `/api/users`. By implementing a full CRUD API, the frontend can read, create, update, and delete users, providing a complete data management solution. The in-memory storage simulates a database for simplicity, while the RESTful design ensures scalability and standard HTTP practices.

### Unit Tests
Tests follow the AAA pattern for clarity:
- **Arrange**: Reset the data store to a known state.
- **Act**: Perform the HTTP request.
- **Assert**: Verify the response status and data.

### Phone Combinations
Using backtracking, the function explores all possible combinations by iterating through each digit's letters recursively. This approach is efficient for the small input constraints (digits 2-9, up to 4 digits typically).
