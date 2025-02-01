import express from 'express';
import FAQ from '../model/qa.schema';

const router = express.Router();

router.post('/add', async (req, res) => {
  const { question, answer, translations } = req.body;
  try {
    const newFAQ = new FAQ({ question, answer, translations });
    await newFAQ.save();
    res.status(201).json({ newFAQ, message: 'FAQ created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create FAQ' });
  }
});

export default router;
