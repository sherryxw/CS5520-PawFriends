import { Document, Model, Schema, model, Types } from "mongoose";

export const PostSchema = new Schema(
  {
    userId: {
      // the id of the user who makes this post
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    carMake: String,
    carModel: String,
    carYear: String,
    zipCode: String,
    radius: Number,
    mileage: Number,
    trim: String,
    color: String,
    drivetrain: String,
    image: String,
    price: { type: Number, required: true }, // price is required
    additionalInformation: String,
  },
  {
    timestamps: true,
  }
);

export interface IPost extends Document {
  userId: string;
  title: string;
  carMake?: string;
  carModel?: string;
  carYear?: string;
  zipCode?: string;
  radius?: number;
  mileage?: number;
  trim?: string;
  color?: string;
  image?: string;
  price: number;
  drivetrain?: string;
  additionalInformation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const PostModel: Model<IPost> = model("Post", PostSchema);

// export const mockPost: IPost[] = [
//   {
//     _id: "1",
//     userId: "1",
//     title: "I NEED A CAR",
//     carMake: "honda",
//     carModel: "civic",
//     carYear: "2010",
//     zipCode: "95123",
//     radius: 50,
//     mileage: 100000,
//     trim: "",
//     color: "",
//     image:
//       "https://static.cargurus.com/images/forsale/2016/01/31/13/14/2010_honda_civic-pic-6792191355056441752-1024x768.jpeg",
//     price: 7000,
//     drivetrain: "automatic",
//     additionalInformation:
//       "I want a car so much. Life without a car in the bay area is totally a nightmare and I can't stand with it.",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "2",
//     userId: "2",
//     title: "Car for fun",
//     carMake: "mazda",
//     carModel: "mx-5",
//     carYear: "2017",
//     zipCode: "95123",
//     radius: 50,
//     mileage: 60000,
//     trim: "",
//     color: "",
//     image:
//       "https://static.cargurus.com/images/forsale/2020/11/06/08/34/2017_mazda_mx-5_miata-pic-3580021094246541612-1024x768.jpeg",
//     price: 25000,
//     drivetrain: "automatic",
//     additionalInformation:
//       "I want a roadster for fun. My budget is sufficient. So, if you have a good option, please give me an offer.",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: "3",
//     userId: "3",
//     title: "SUV is a good option for road trip",
//     carMake: "cadillac",
//     carModel: "XT5",
//     carYear: "2017 ",
//     zipCode: "95123",
//     radius: 50,
//     mileage: 50000,
//     trim: "",
//     color: "",
//     image:
//       "https://static.cargurus.com/images/forsale/2021/03/27/07/13/2017_cadillac_xt5-pic-7354959512710244799-1024x768.jpeg",
//     price: 30000,
//     drivetrain: "automatic",
//     additionalInformation:
//       "I believe a good suv suits me a lot since driving on highway for a long-distance road trip always excites me.",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];
