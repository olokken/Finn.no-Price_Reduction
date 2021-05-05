import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("Users", UserSchema, "Users");
export default UserModel;
