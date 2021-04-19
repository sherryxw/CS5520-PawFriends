import faker from "faker";
import { IPost } from "../../src/types/post";
import _ from "lodash";

export const buildPost = ({ ...override }: Partial<IPost>): IPost => {
  return _.merge(
    {
      _id: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
      title: "I want a car",
      carMake: "ford",
      carModel: "f-150",
      carYear: faker.datatype.number({ min: 1990, max: 2020 }).toString(),
      zipCode: faker.address.zipCode,
      radius: 50,
      mileage: faker.datatype.number({
        min: 30000,
        max: 100000,
        precision: 0,
      }),
      trim: "",
      color: faker.commerce.color(),
      imageUrl: "",
      price: faker.datatype.number({ min: 4000, max: 50000 }),
      drivetrain: "",
      additionalInformation: "",
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    },
    override
  );
};
