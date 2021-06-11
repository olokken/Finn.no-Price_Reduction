import User from "../entity/User";
import UserModel, { IUser } from "./models/UserModel";

const createUser = async (user: User) => {
  await UserModel.create({ username: user.username, password: user.password });
};

const getUsers = async () => {
  const users = await UserModel.find().exec();
  return users.map((user) => {
    console.log(user.id);
    return new User(user.username, user.password, user._id);
  });
};

const getUser = async (id: string): Promise<User | null> => {
  const user = await UserModel.findById({ _id: id }).exec();
  if (user) {
    return new User(user.username, user.password, user._id);
  }
  return null;
};

const getUserByUsernameAndPassword = async (
  username: string,
  password: string
) => {
  const user: IUser[] = await UserModel.find({
    username: username,
    password: password,
  });
  return user[0];
};

export const UserService = {
  createUser,
  getUsers,
  getUser,
  getUserByUsernameAndPassword,
};
