import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Person {
  @Field({nullable:true})
  id?: string;

  @Field()
  username: string;

  @Field()
  password: string;

  constructor(username: string, password: string, id?: string) {
    this.username = username;
    this.password = password;
    this.id = id;
  }
}
