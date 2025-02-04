import express from 'express';
import generateTranslations from '../utils/translation.js';
import FAQ from '../model/qa.schema.js';
import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.error('Redis error:', err));

(async () => {
    await client.connect();
})();

const router = express.Router();

router.post('/add', async (req, res) => {
    const { question, answer } = req.body;
    try {
        const translations = await generateTranslations(question, answer);
        console.log('Translations:', translations);
        
        const newFAQ = new FAQ({ question, answer, translations });
        await newFAQ.save();
        
        res.status(201).json({ newFAQ, message: 'FAQ created successfully' });
    } catch (err) {
        console.log('Error:', err);
        res.status(400).json({ error: 'Failed to create FAQ' });
    }
});

router.get('/translate', async (req, res) => {
    const lang = req.query.lang || 'en';
    console.log('Language:', lang);
    const cacheKey = `faqs:${lang}`;

    try {
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            res.json(JSON.parse(cachedData));
            return;
        }

        const faqs = await FAQ.find().select('question answer translations').lean();
        const translatedFAQs = faqs.map(faq => ({
            question: faq.translations?.[lang]?.question || faq.question,
            answer: faq.translations?.[lang]?.answer || faq.answer,
        }));

        await client.setEx(cacheKey, 3600, JSON.stringify(translatedFAQs));
        res.json(translatedFAQs);
    } catch (err) {
        console.error('Error fetching FAQs:', err);
        res.status(500).json({ error: 'Failed to fetch FAQs' });
    }
});

export default router;
