import express from 'express';

const router = express.Router();

router.get('/events', async (req, res) => {
  try {
    const db = req.db;
    const allEvents = await db.collection('events').find().toArray();
    res.json(allEvents);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;

