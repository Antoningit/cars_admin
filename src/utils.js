import { SERVER_HOST } from "./constants";

export const resolveMappedData = (data) => {
  return data.map((car) => {
    const image = `${SERVER_HOST}${car.image}`;
    return {
      ...car,
      newImage: image,
      newImages: JSON.parse(car.images).map(
        (image) => `${SERVER_HOST}${image}`
      ),
      engine: car.car_engine,
      mod: car.car_mod,
    };
  });
};

export const resolveMappedCar = (car) => {
  const image = `${SERVER_HOST}${car.image}`;
  car.newImage = image;
  car.newImages = JSON.parse(car.images).map(
    (image) => `${SERVER_HOST}${image}`
  );
  car.engine = car.car_engine;
  car.mod = car.car_mod;
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
