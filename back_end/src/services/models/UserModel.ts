import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  favorites: string[];
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  favorites: { type: [], required: true },
});

const UserModel = mongoose.model<IUser>("Users", UserSchema, "Users");
export default UserModel;
