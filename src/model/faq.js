import { model, Schema } from 'mongoose';
import translateTextTo from '../utils/translate.js';
import { logger } from '../utils/logger.js';

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
                { key: 'question', value: await translateTextTo(faq.question, 'hi') },
                { key: 'answer', value: await translateTextTo(faq.answer, 'hi') }
            ];

            // Translate question and answer for Bengali
            faq.question_bn = [
                { key: 'question', value: await translateTextTo(faq.question, 'bn') },
                { key: 'answer', value: await translateTextTo(faq.answer, 'bn') }
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
