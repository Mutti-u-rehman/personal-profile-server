import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        let mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            console.log('No MONGO_URI found. Starting in-memory MongoDB instance...');
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
        }
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
