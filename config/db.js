import mongoose from 'mongoose';
import { DB_PASSWORD, DB_NAME } from './secret.js';

const URI = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.7l46zlg.mongodb.net/?retryWrites=true&w=majority`;

mongoose
    .connect(URI)
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));
