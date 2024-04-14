import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

// POST: Create a new applicant
router.post('/', async (req: Request, res: Response) => {
    const { name, bio, skills } = req.body;
    try {
        const result = await db.query('INSERT INTO applicant (name, bio, skills) VALUES ($1, $2, $3) RETURNING *', [name, bio, skills]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// GET: Retrieve all applicants
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM applicant');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// GET: Retrieve a single applicant by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM applicant WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Applicant not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// PUT: Update an existing applicant
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, bio, skills } = req.body;
    try {
        const result = await db.query(
            'UPDATE applicant SET name = $1, bio = $2, skills = $3 WHERE id = $4 RETURNING *',
            [name, bio, skills, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Applicant not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// DELETE: Remove an applicant
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM applicant WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(204).json({ message: 'Applicant deleted' });
        } else {
            res.status(404).send('Applicant not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;