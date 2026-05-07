import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing MongoDB connection string. Set `MONGO_URI` in your .env.');
  }

  const maxRetries = Number(process.env.MONGO_CONNECT_RETRIES ?? 5);
  const baseDelayMs = Number(process.env.MONGO_CONNECT_RETRY_DELAY_MS ?? 1000);

  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      // serverSelectionTimeoutMS prevents mongoose from hanging too long on DNS/connection issues.
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      lastError = error;
      const delay = baseDelayMs * attempt; // simple backoff
      console.error(
        `❌ MongoDB connection attempt ${attempt}/${maxRetries} failed: ${error.message}`
      );
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
};

export default connectDB;