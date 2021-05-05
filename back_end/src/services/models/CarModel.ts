import * as mongoose from "mongoose";
//import Price from "../../entity/Price";

export interface ICar extends mongoose.Document {
  _id: string;
  finnkode: string;
  forsidebilde: string;
  modellnavn: string;
  årsmodell: number;
  kilometerstand: number;
  priser: [{
    sum:number,
    dato:Date
  }];
}

export const CarSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    finnkode: { type: String, required: true },
    forsidebilde: { type: String, required: true },
    modellnavn: { type: String, required: true },
    årsmodell: { type: Number, required: true },
    kilometerstand: { type: Number, required: true },
    priser: { type: [], required: false }
  },
);

const CarModel = mongoose.model<ICar>("Tesla", CarSchema, "Tesla");
export default CarModel;

