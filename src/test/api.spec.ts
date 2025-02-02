import request from 'supertest';
import { app } from '../app'; 

describe('FAQs API', () => {
  it('should fetch FAQs in English by default', async () => {
    const res = await request(app).get('/faqs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a 404 for an invalid endpoint', async () => {
    const res = await request(app).get('/invalid-path');
    expect(res.status).toBe(404);
  });
});
