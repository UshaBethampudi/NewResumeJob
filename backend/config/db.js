
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB CONNECTED');
  } catch (error) {
    console.error('DB CONNECTION ERROR:', error);
    process.exit(1);
  }
};

export default connectDB;