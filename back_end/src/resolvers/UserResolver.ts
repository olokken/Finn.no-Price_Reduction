import  User from "../entity/User";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => User)
  hello() {
    return new User("Ole", "Fotball");
  }

  @Mutation(() => Int)
  hore(@Arg("penis") tall:number) {
    return tall*3; 
  }
}


