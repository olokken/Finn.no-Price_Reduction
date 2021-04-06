import * as mongoose from "mongoose";

export interface ICar extends mongoose.Document {
  username: string;
  password: string;
}

export const CarSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "Tesla" }
);

const Car = mongoose.model<ICar>("Car", CarSchema);
export default Car;
