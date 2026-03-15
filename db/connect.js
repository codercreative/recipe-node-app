const mongoose = require("mongoose");

const connectDB = async (mongoURL) => {
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log(error, "MongoDB connection failed");
  }
};

module.exports = connectDB;
