import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Price {
  @Field()
  sum: number;
  @Field()
  date: number;

  constructor(sum: number, date: number) {
    this.sum = sum;
    this.date = date;
  }
}
