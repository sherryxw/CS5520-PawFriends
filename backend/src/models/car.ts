import { Document, Model, Schema, model } from "mongoose";

export const CarSchema = new Schema(
  {
    dealerId: {
      type: String,
      required: true,
    },
    vin: {
      type: String,
      required: true,
      unique: true,
    },
    carMake: {
      type: String,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    trim: String,
    description: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export interface ICar extends Document {
  dealerId: string;
  vin: string;
  carMake: string;
  carModel: string;
  mileage: number;
  color: string;
  price: number;
  year: string;
  trim?: string;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CarModel: Model<ICar> = model("Car", CarSchema);
