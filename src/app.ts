import express from 'express';

const app = express();

app.get('/faqs', (req, res) => {
  
  res.json([]);
});

export { app };