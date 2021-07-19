import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import User from "../entity/User";
import { UserService } from "../services/users.service";
import { MyContext } from "src/MyContext";
import { createAcesstoken, createRefreshToken, isAuth } from "../utils/auth";

@InputType()
class UserInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field()
  id: string;
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  isVerified() {
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("info", () => UserInput) info: UserInput,
    @Ctx() { res }: MyContext
  ) {
    const user = await UserService.login(info.username, info.password);
    if (user) {
      res.cookie("rt", createRefreshToken(user.id));
      return {
        accessToken: createAcesstoken(user.id),
        id: user.id,
      };
    }
    return null;
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addFavorite(@Arg("userId") userId: string, @Arg("code") code: string) {
    return UserService.addFavorite(userId, code);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async removeFavorite(
    @Arg("userId") userId: string,
    @Arg("code") code: string
  ) {
    return UserService.removeFavorite(userId, code);
  }
}
