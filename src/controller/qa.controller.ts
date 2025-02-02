import express, { Request, Response, Router } from 'express';
import generateTranslations from '../utils/translation';
import FAQ from '../model/qa.schema';
import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.error('Redis error:', err));
(async () => {
    await client.connect(); 
})();

const router: Router = Router(); 

interface FAQDocument {
    question: string;
    answer: string;
    translations: {
        [key: string]: {
            question: string;
            answer: string;
        };
    };
}

interface TranslatedFAQ {
    question: string;
    answer: string;
}


router.post('/add', async (req: Request, res: Response): Promise<void> => {
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


router.get('/translate', async (req: Request, res: Response): Promise<void> => {
    const lang = (req.query.lang as string) ?? 'en';
    console.log('Language:', lang);
    const cacheKey = `faqs:${lang}`;

    try {
        const cachedData = await client.get(cacheKey);
       
        if (cachedData) {
            res.json(JSON.parse(cachedData));
            return;
        }

        
         const faqs: FAQDocument[] = await FAQ.find().select('question answer translations').lean();
      
        const translatedFAQs: TranslatedFAQ[] = await Promise.all(faqs.map(async (faq: FAQDocument) => {
            console.log('FAQ Translations:', faq.translations);
            return {
                question: faq.translations?.[lang]?.question,
                answer: faq.translations?.[lang]?.answer,
            };
        }));
         

        await client.setEx(cacheKey, 3600, JSON.stringify(translatedFAQs));
        res.json(translatedFAQs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch FAQs' });
    }
});

export default router;
