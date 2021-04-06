import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Car {
  @Field()
  id: string;

  @Field()
  finnkdoe: string;

  @Field()
  forsidebilde: string;

  @Field()
  modellnavn: string;

  @Field()
  årsmodell: number;

  @Field()
  kilometerstand: number;

  constructor(username: string, password: string) {
    
  }
}
