import { Field,  ObjectType } from "type-graphql";

@ObjectType()
export default class Person {
  @Field()
  username: string;

  @Field()
  password: string;

  constructor(username: string, password:string) {
    this.username = username;
    this.password = password; 
  }
}
