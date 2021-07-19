import Car from "../entity/Car";
//import { CarService } from "src/services/cars.service";
import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { CarService } from "../services/cars.service";
import { isAuth } from "../utils/auth";

@Resolver()
export class CarResolver {
  @Query(() => [Car])
  @UseMiddleware(isAuth)
  getCars() {
    return CarService.getCars();
  }

  @Query(() => Car)
  @UseMiddleware(isAuth)
  getCar(@Arg("id") id: string) {
    return CarService.getCar(id);
  }
}
