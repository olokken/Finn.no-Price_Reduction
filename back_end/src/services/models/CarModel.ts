import * as mongoose from "mongoose";
//import Price from "../../entity/Price";

export interface ICar extends mongoose.Document {
  _id: string;
  code: string;
  picture: string;
  modelName: string;
  yearModel: number;
  mileage: number;
  isSold: boolean;
  prices: [
    {
      sum: number;
      date: number;
    }
  ];
}

export const CarSchema = new mongoose.Schema({
  id: { type: String, required: true },
  code: { type: String, required: true },
  picture: { type: String, required: true },
  modelName: { type: String, required: true },
  yearModel: { type: Number, required: true },
  mileage: { type: Number, required: true },
  prices: { type: [], required: false },
});

const CarModel = mongoose.model<ICar>("Cars", CarSchema, "Cars");
export default CarModel;
