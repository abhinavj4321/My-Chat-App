import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Redis } from "@upstash/redis";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", userRoutes);

export const redisClient = Redis.fromEnv();

const startServer = async () => {
    try {
        // MongoDB
        await connectDB();
        console.log("MongoDB connected");
        await connectRabbitMQ();

        // Redis
        await redisClient.set("test", "hello");
        const value = await redisClient.get("test");
        console.log("Redis value:", value);

        // Start server only after dependencies are ready
        const port = process.env.PORT || 5000;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();