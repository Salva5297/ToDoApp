import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { Controller } from './controllers/Controller';

const app = express(); // Create an Express application
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pass',
  port: 5432,
}); // Create a new pool for connecting to the PostgreSQL database

const controller = new Controller(pool); // create controller with the pool information for connecting to the postgres database

app.get('/', controller.getAllDuties); // GET request to fetch all duties
app.post('/', controller.createDuty); // POST request to create a new duty
app.put('/:id', controller.updateDuty); // PUT request to update an existing duty
app.delete('/:id', controller.deleteDuty); // DELETE request to delete a duty

app.listen(8080, () => {
  console.log('Server running on port 8080');
});

export default app;