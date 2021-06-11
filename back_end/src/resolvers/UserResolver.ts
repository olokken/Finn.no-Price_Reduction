import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import User from "../entity/User";
import { UserService } from "../services/users.service";

@InputType()
class UserInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  getUser(@Arg("id") id: string) {
    return UserService.getUser(id);
  }

  @Query(() => [User])
  getUsers() {
    return UserService.getUsers();
  }

  @Query(() => Boolean)
  sheesh() {
    return true;
  }

  @Query(() => User)
  async login(@Arg("info", () => UserInput) info: UserInput) {
    let user: User = new User("", "", [], "");
    await UserService.getUserByUsernameAndPassword(
      info.username,
      info.password
    ).then((data) => {
      user = new User(data.username, data.password, data.id);
    });
    return user;
  }

  @Mutation(() => Boolean)
  async createUser(@Arg("info", () => UserInput) info: UserInput) {
    const user: User = new User(info.username, info.password, []);
    try {
      await UserService.createUser(user);
      return true;
    } catch {
      return false;
    }
  }
}
