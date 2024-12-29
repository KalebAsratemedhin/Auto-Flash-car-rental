import 'dotenv/config'; 
import express from 'express';
import connectDatabase from './config/db.js'; 
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import responseMiddleware from './middleware/responseMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    exposedHeaders: ['Content-Type'],
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDatabase();

app.use(responseMiddleware);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', (await import('./routes/auth.js')).default);
app.use('/users', (await import('./routes/user.js')).default);
app.use('/posts', (await import('./routes/post.js')).default);
app.use('/rents', (await import('./routes/rent.js')).default);
app.use('/ratings', (await import('./routes/rating.js')).default);
app.use('/comments', (await import('./routes/comment.js')).default);


app.listen(5000, () => {
    console.log("Successfully running on port 5000");
});
