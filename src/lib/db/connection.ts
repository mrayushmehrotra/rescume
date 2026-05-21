import mongoose from "mongoose";
import { RescumeSchema, UserSchema } from "./schema";

const MONGODB_URI = process.env.MONGODB_URI;

const globalStore = globalThis as typeof globalThis & {
  mongoose?: { conn: null; promise: null };
};

if (!globalStore.mongoose) {
  globalStore.mongoose = { conn: null, promise: null };
}

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Rescume =
  mongoose.models.Rescume || mongoose.model("Rescume", RescumeSchema);

export default dbConnect;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  await mongoose.connect(MONGODB_URI);
  return mongoose;
}
