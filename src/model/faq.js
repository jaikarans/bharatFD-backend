import { model, Schema } from 'mongoose';
import { logger } from '../utils/logger.js';
import translate from '../utils/translate.js';

// Define the schema with arrays instead of Map
const faqSchema = new Schema({
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    question_hi: [
        { key: { type: String, required: true }, value: { type: String, required: true } }
    ], // don't use map here adminjs can't handdle map data structure
    question_bn: [
        { key: { type: String, required: true }, value: { type: String, required: true } }
    ]
});

// Pre-save hook to auto-generate translations
faqSchema.pre('save', async function (next) {
    const faq = this;

    // Generate translations for question and answer if they are modified
    if (faq.isModified('question') || faq.isModified('answer')) {
        try {
            // Translate question and answer for Hindi
            faq.question_hi = [
                { key: 'question', value: await translate(faq.question, 'hi', 'text') },
                { key: 'answer', value: await translate(faq.answer, 'hi', 'html') }
            ];

            // Translate question and answer for Bengali
            faq.question_bn = [
                { key: 'question', value: await translate(faq.question, 'bn', 'text') },
                { key: 'answer', value: await translate(faq.answer, 'bn', 'html') }
            ];

        } catch (error) {
            logger.log('error', `Translation failed: ${error}`);
        }
    }

    next();
});

// Create the FAQ model based on the schema
const Faq = model('Faq', faqSchema);

export default Faq;
