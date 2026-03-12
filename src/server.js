import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import cookieParser from 'cookie-parser';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { errors } from 'celebrate';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());

await connectMongoDB();

app.use(logger);
app.use(cors());
app.use(express.json());

app.use('/notes', notesRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
