import { expect } from 'chai';
import request from 'supertest';
import { app } from '../index.js'; 

describe('FAQs API', () => {
  
  it('should create a new FAQ', async () => {
    const newFAQ = {
      question: 'What is Node.js?',
      answer: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
    };

    const res = await request(app)
      .post('/api/faqs/add')  
      .send(newFAQ);

    expect(res.status).to.equal(201); 
    expect(res.body).to.have.property('newFAQ');
    expect(res.body.message).to.equal('FAQ created successfully');
  });

  
  it('should fetch FAQs with translations in English', async () => {
    const res = await request(app)
      .get('/api/faqs/translate')
      .query({ lang: 'en' });  

    expect(res.status).to.equal(200);  
    expect(res.body).to.be.an('array');  
  });

 
  it('should return a 404 for an invalid endpoint', async () => {
    const res = await request(app)
      .get('/invalid-path');  

    expect(res.status).to.equal(404); 
  });
});
