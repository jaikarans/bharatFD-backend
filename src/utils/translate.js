import { translate } from '@vitalets/google-translate-api';
import { logger } from './logger';

const translateTextTo = async (text, targetLang) => {
    return translate(text, { to: targetLang })
        .then(res => res.text)
        .catch(err => {
            logger.log('error', `Translation is failed: ${err}`);
            return null;
        });
};

export default translateTextTo;