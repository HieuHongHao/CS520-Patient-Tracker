import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import ApiRoutes from './routes/index.js';

const app = express();

dotenv.config();

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/patient-tracker';
const PORT = process.env.PORT || 5001;

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

app.use('/', express.static('client'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', ApiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
