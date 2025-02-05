import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import Faq from '../model/faq.js';

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
});
  

export const admin = new AdminJS({
    resources: [
        {
            resource: Faq,
            options: {
                listProperties: ['question', 'answer'], // Show only question and answer in the list view
                editProperties: ['question', 'answer'], // Allow editing question and answer
                showProperties: ['question', 'answer'],
                properties: {
                    question_hi: {
                        isVisible: { list: false, show: false, edit: false },
                    },
                    question_bn: {
                        isVisible: { list: false, show: false, edit: false },
                    },
                }
            },
        },
    ],
    branding: {
        companyName: 'FAQ manager',
    },
    
});
