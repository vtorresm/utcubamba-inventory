import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { corsConfig } from './config/cors';
import { connectDB } from './config/db';

// import fileUpload from 'express-fileupload';
// import Client from 'ssh2-sftp-client';

import authRoutes from './routes/authRoutes';

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig));

app.use(express.json());

//TODO: Routes
app.use('/api/auth', authRoutes);


export default app;
