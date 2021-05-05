import Car from "../entity/Car";
//import { CarService } from "src/services/cars.service";
import { Arg, Query, Resolver } from "type-graphql";
import { CarService } from "../services/cars.service";

@Resolver()
export class CarResolver {
  @Query(() => [Car])
  getCars() {
    return CarService.getCars();
  }

  @Query(() => Car)
  getCar(@Arg("id") id: string) {
    return CarService.getCar(id);
  }
}
