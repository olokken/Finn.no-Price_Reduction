//import { ApolloError } from "apollo-server-express";
import User from "../entity/User";
import UserModel from "./models/UserModel";
import { v4 as uuidv4 } from "uuid";
import { ApolloError } from "apollo-server-express";
import { compare, hash } from "bcryptjs";

const createUser = async (user: User) => {
  const hashed: string = await hash(user.password, 10);
  await UserModel.create({
    id: uuidv4(),
    username: user.username,
    password: hashed,
    favorites: [],
  }).catch((err) => {
    console.log(err);
  });
};

const getUsers = async () => {
  const users = await UserModel.find().exec();
  return users.map((user) => {
    return new User(user.username, user.password, user.favorites, user.id);
  });
};

const getUser = async (id: string): Promise<User | null> => {
  const user = await UserModel.findOne({ id: id });
  if (user) {
    return new User(user.username, user.password, user.favorites, user.id);
  }
  return null;
};

const login = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username: username });
  if (user) {
    const valid = await compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new ApolloError("Feil passord");
  }
  throw new ApolloError("Finner ingen brukere med dette brukernavnet");
};

const addFavorite = async (userId: string, code: string) => {
  const doc = await UserModel.findOne({ id: userId });
  const update = { $push: { favorites: code } };
  if (doc != null) {
    await doc.updateOne(update);
    return true;
  } else {
    throw new ApolloError("Du er ikke innlogget");
  }
};

const removeFavorite = async (userId: string, code: string) => {
  const doc = await UserModel.findOne({ id: userId });
  const update = { $pull: { favorites: code } };
  if (doc != null) {
    await doc.updateOne(update);
    return true;
  } else {
    throw new ApolloError("Du er ikke innlogget");
  }
};

export const UserService = {
  createUser,
  getUsers,
  getUser,
  login,
  addFavorite,
  removeFavorite,
};
