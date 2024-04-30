import chalk from "chalk";
import mongoose from "mongoose";
import { MONGODB_NAME, MONGODB_URI } from "../shared/constants/env.mjs";

const dbPath = `${MONGODB_URI}/${MONGODB_NAME}`;

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

async function connectMongo() {
  try {
    await mongoose.connect(dbPath, options);

    mongoose.set("debug", true);

    console.log(chalk.green("[MongoDB] Connect successfully! \n"));
  } catch (error) {
    console.log(error);
  }
}

export default connectMongo;
