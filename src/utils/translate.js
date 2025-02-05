import { LT_HOST, LT_PORT } from '../config/config.js';
import { logger } from './logger.js';

const translate = async (text, lang, format) => {
    // Perform the translation using the self-hosted LibreTranslate API
    const res = await fetch(`http://${LT_HOST}:${LT_PORT}/translate`, {
        method: 'POST',
        body: JSON.stringify({
            q: text,       // The text to translate
            source: 'en',
            target: lang,
            format: format
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
        const errorData = await res.json();
        logger.log('error', `Translate failed: ${JSON.stringify(errorData)}`);
        throw new Error(`Translate failed: ${JSON.stringify(errorData)}`);

    }

    const data = await res.json();

    return data.translatedText;
};

export default translate;