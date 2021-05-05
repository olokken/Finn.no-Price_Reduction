import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Price {
  @Field()
  sum: number;
  @Field()
  date: Date;

  constructor(sum: number, date: Date) {
    this.sum = sum;
    this.date = date;
  }
}
