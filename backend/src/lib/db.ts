import { config } from "dotenv";
import mongoose from "mongoose";

config();

const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("ENV VARIABLE NOT PROVIDED : MONGO_URI");
    }

    const conn = await mongoose.connect(MONGO_URI, {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(
      `Database connection successful! Host: ${conn.connection.host}`,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Database connection failed! Error: ", error.message);
    } else {
      console.error("Database connection failed! Error: Unknown");
    }
    process.exit(1);
  }
};

export { connectDB };
