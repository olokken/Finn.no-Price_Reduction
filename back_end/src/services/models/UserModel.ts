import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  id: string;
  username: string;
  password: string;
  favorites: string[];
}

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  favorites: { type: [], required: true },
});

const UserModel = mongoose.model<IUser>("Users", UserSchema, "Users");
export default UserModel;
