import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error(" DB_URL is not defined in .env file");
    }

    const connectionInstance = await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(" MongoDB Connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
