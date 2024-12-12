import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.DB_URL}`);
    console.log(`
            \n Mongodb Connected Successfully !! DB HOST:${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error is connecting To DB", error);
    process.exit(1);
  }
};

export default connectDb;
