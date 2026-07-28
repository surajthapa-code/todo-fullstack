import mongoose from "mongoose";

export async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    if (connectionInstance) {
      console.log("DB connection sucess", connectionInstance.connection.host);
    }
  } catch (err) {
    console.log(`Error while connecting to DB \n ${err}`);
    throw err;
  }
}
