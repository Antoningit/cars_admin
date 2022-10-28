import {
  SERVER_HOST,
  CarBodysValues,
  CarsEnginesValues,
  CarsDrivesValues,
  CarsKppsValues,
  CarsTitles,
  CarsWheelsValues,
} from "./constants";

export const resolveMappedData = (data) => {
  return data.map((car) => {
    return {
      ...car,
      body: CarBodysValues[car.body],
      drive: CarsDrivesValues[car.drive],
      kpp: CarsKppsValues[car.kpp],
      title: CarsTitles[car.title],
      wheel: CarsWheelsValues[car.wheel],
      newImage: `${SERVER_HOST}uploads/${car.image}`,
      newImages: car.images.map((image) => `${SERVER_HOST}uploads/${image}`),
      engine: CarsEnginesValues[car.car_engine],
      mod: car.car_mod,
      auction: car.auction ? "Да" : "Нет",
      latest: car.latest ? "Да" : "Нет",
      promo: car.promo ? "Да" : "Нет",
      year_from: String(car.year_from),
      owners_by_pts: String(car.owners_by_pts),
    };
  });
};

export const resolveMappedCar = (car) => {
  car.body = CarBodysValues[car.body];
  car.drive = CarsDrivesValues[car.drive];
  car.kpp = CarsKppsValues[car.kpp];
  car.title = CarsTitles[car.title];
  car.wheel = CarsWheelsValues[car.wheel];
  car.newImage = `${SERVER_HOST}uploads/${car.image}`;
  car.newImages = car.images.map((image) => `${SERVER_HOST}uploads/${image}`);
  car.engine = CarsEnginesValues[car.car_engine];
  car.mod = car.car_mod;
  car.auction = car.auction ? "Да" : "Нет";
  car.latest = car.latest ? "Да" : "Нет";
  car.promo = car.promo ? "Да" : "Нет";
  car.year_from = String(car.year_from);
  car.owners_by_pts = String(car.owners_by_pts);
  return car;
};

/**
 * @param {array} cars
 * @param {number} param
 * @return {object|null}
 */

export const getCar = (cars, param) => {
  const car = cars.find(({ id }) => Number(id) === Number(param));
  return car != null ? car : null;
};
