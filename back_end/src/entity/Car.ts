import { Field, ObjectType } from "type-graphql";
import Price from "./Price";

@ObjectType()
export default class Car {
  @Field()
  id: string;

  @Field()
  code: string;

  @Field()
  picture: string;

  @Field()
  model_name: string;

  @Field()
  year_model: number;

  @Field()
  mileage: number;

  @Field(() => [Price])
  prices:Price[]

  constructor(id:string, code:string, picture:string, model_name: string, year_model:number, mileage:number, prices:Price[]) {
    this.id = id; 
    this.code = code; 
    this.picture = picture; 
    this.model_name = model_name; 
    this.year_model = year_model; 
    this.mileage = mileage; 
    this.prices = prices; 
  }
}
