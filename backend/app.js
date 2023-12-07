import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { dbUrl, PORT, FRONTEND_URL } from './config.js';

import ApiRoutes from './routes/index.js';

dotenv.config();

const app = express();

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

app.use('/', express.static('client'));

app.use(cors({
  // remove trailing slash '/'
  origin: FRONTEND_URL.replace(/\/$/, ''),
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', ApiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
