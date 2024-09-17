import { Request, Response } from 'express';
import { Pool } from 'pg';
import { Duty } from '../models/Duty';

export class Controller {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  getAllDuties = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.pool.query('SELECT * FROM duties ORDER BY id');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching duties:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  createDuty = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    try {
      const result = await this.pool.query(
        'INSERT INTO duties (name) VALUES ($1) RETURNING *',
        [name]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating duty:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  updateDuty = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    try {
      const result = await this.pool.query(
        'UPDATE duties SET name = $1 WHERE id = $2 RETURNING *',
        [name, id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Duty not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error updating duty:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  deleteDuty = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
      const result = await this.pool.query('DELETE FROM duties WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Duty not found' });
      } else {
        res.json({ message: 'Duty deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting duty:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
