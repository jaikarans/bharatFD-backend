import express from 'express';
import { buildRouter } from '@adminjs/express';
import { admin } from './admin/adminjs.js';

const app = express();

const adminRouter = buildRouter(admin);
// default path is /admin
app.use(admin.options.rootPath, adminRouter);

export default app;