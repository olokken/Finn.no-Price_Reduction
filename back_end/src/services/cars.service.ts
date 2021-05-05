import Car from "../entity/Car";
import Price from "../entity/Price";
import CarModel from "./models/CarModel";

const getCars = async () => {
  const cars = await CarModel.find().exec();
  return cars.map((car) => {
    const prices: Price[] = car.priser.map((pris) => {
      let sum = pris.sum;
      if (isNaN(sum)) sum = 0;
      const dato = pris.dato;
      return new Price(sum, dato);
    });

    return new Car(
      car._id,
      car.finnkode,
      car.forsidebilde,
      car.modellnavn,
      car.årsmodell,
      car.kilometerstand,
      prices
    );
  });
};

const getCar = async (id: string): Promise<Car | null> => {
  const car = await CarModel.findById({ _id: id }).exec();
  if (car) {
    const prices: Price[] = car.priser.map((pris) => {
      let sum = pris.sum;
      if (isNaN(sum)) sum = 0;
      const dato = pris.dato;
      return new Price(sum, dato);
    });
    return new Car(
      car._id,
      car.finnkode,
      car.forsidebilde,
      car.modellnavn,
      car.årsmodell,
      car.kilometerstand,
      prices
    );
  }
  return null;
};

export const CarService = { getCars, getCar };
