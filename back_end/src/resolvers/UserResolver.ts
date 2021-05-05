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
  getUser(@Arg("id")id:string) {
    return UserService.getUser(id); 
  }

  @Query(() => [User])
  getUsers() {
    return UserService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Arg("info", () => UserInput) info: UserInput) {
    const user: User = new User(info.username, info.password);
    await UserService.createUser(user);
    return user;
  }
}
