import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import personalProfileRoutes from './routes/personalProfile/personalProfile.routes.js';

dotenv.config();

const app = express();

// Enable CORS for all origins (dev-friendly)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use('/api/profile', personalProfileRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        let mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            console.log('No MONGO_URI found. Starting in-memory MongoDB instance...');
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
        }
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
