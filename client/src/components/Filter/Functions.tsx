import Car from '../../interfaces/Car';

const priceFilter = (cars: Car[], prices: number[]) => {
  return cars.filter((car) => {
    if (prices.length != 2) {
      return car;
    } else {
      if (
        car.prices[car.prices.length - 1].sum >= prices[0] &&
        car.prices[car.prices.length - 1].sum <= prices[1]
      ) {
        return car;
      }
    }
  });
};

const mileageFilter = (cars: Car[], mileages: number[]) => {
  return cars.filter((car) => {
    if (mileages.length != 2) {
      return car;
    } else {
      if (car.mileage >= mileages[0] && car.mileage <= mileages[1]) {
        return car;
      }
    }
  });
};

const yearModelFilter = (cars: Car[], yearModels: number[]) => {
  return cars.filter((car) => {
    if (yearModels.length != 2) {
      return car;
    } else {
      if (car.year_model >= yearModels[0] && car.year_model <= yearModels[1]) {
        return car;
      }
    }
  });
};

const searchFilter = (cars: Car[], search: string) => {
  return cars.filter((car) => {
    if (search == '') {
      return car;
    } else if (
      car.model_name != null &&
      car.model_name.toLowerCase().includes(search.toLocaleLowerCase())
    ) {
      return car;
    }
  });
};

const priceAdjustmentFilter = (cars: Car[], bol: boolean) => {
  return cars.filter((car) => {
    if (bol) {
      if (car.prices.length > 1) {
        return car;
      }
    } else {
      return car;
    }
  });
};

export const FilterFunctions = {
  priceFilter,
  searchFilter,
  mileageFilter,
  yearModelFilter,
  priceAdjustmentFilter,
};
