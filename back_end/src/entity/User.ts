import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Person {
  @Field({ nullable: true })
  id?: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => [String])
  favorites: string[];

  constructor(
    username: string,
    password: string,
    favorites: string[],
    id?: string
  ) {
    this.username = username;
    this.password = password;
    this.favorites = favorites;
    this.id = id;
  }
}
