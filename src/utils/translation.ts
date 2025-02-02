import { Translate } from '@google-cloud/translate/build/src/v2';
import exp from 'constants';
import dotenv from 'dotenv';
dotenv.config();

const KEY = process.env.API_KEY?.trim(); 

if (!KEY) {
  throw new Error('Missing API Key! Please set API_KEY in .env file.');
}

const translate = new Translate({ key: KEY });


async function generateTranslations(question: string, answer: string) {
  const languages = ['en', 'hi', 'bn']; 
  const translations: Record<string, any> = {};

  for (const lang of languages) {
    const [translatedQuestion] = await translate.translate(question, lang);
    const [translatedAnswer] = await translate.translate(answer, lang);

    translations[lang] = { question: translatedQuestion, answer: translatedAnswer };
    console.log(`Translated to ${lang}`);
  }

  return translations;
}

export default generateTranslations;
