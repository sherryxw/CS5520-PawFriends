import faker from "faker";
import { ICar } from "../../src/types/car";
import _ from "lodash";

export const buildCar = ({ ...override }: Partial<ICar>): ICar => {
  return _.merge(
    {
      _id: faker.datatype.uuid(),
      dealerId: faker.datatype.uuid(),
      vin: faker.datatype.uuid(),
      carMake: "honda",
      carModel: "civic",
      mileage: faker.datatype.number({
        min: 30000,
        max: 100000,
      }),
      color: faker.commerce.color(),
      price: faker.datatype.number({ min: 4000, max: 50000 }),
      year: faker.datatype.number({ min: 1990, max: 2020 }).toString(),
    },
    {
      ...override,
    }
  );
};
