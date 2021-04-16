import { ICar } from "src/types/car";
import client from "./client";
import { mockCar } from "./mock";

export const getInventory = (dealerId: string): Promise<ICar[]> => {
  return Promise.resolve(mockCar);
};

export const create = (car: ICar): Promise<ICar> => {
  return Promise.resolve(car);
};
