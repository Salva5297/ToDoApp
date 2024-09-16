import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { Controller } from './controllers/Controller';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pass',
  port: 5432,
});

const controller = new Controller(pool);

app.get('/', controller.getAllDuties);
app.post('/', controller.createDuty);
app.put('/:id', controller.updateDuty);
app.delete('/:id', controller.deleteDuty);

app.listen(8080, () => {
  console.log('Server running on port 8080');
});

export default app;