import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "SpotifyDB",
    });

    console.log("MongoDb Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
