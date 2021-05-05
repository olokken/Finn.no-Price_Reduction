import User from "../entity/User";
import UserModel from "./models/UserModel";

const createUser = async (user: User) => {
  await UserModel.create({ username: user.username, password: user.password });
};

const getUsers = async() => {
  const users = await UserModel.find().exec();
  return users.map(user => {
    return new User(user.username, user.password, user._id);
  })
};

const getUser = async (id: string): Promise<User | null> => {
  const user = await UserModel.findById({ _id: id }).exec();
  if (user) {
    return new User(user.username, user.password, user._id);
  }
  return null;
};

export const UserService = { createUser, getUsers, getUser};
