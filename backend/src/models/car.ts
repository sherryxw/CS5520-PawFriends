import { Document, Model, Schema, model } from "mongoose";

export const CarSchema = new Schema(
  {
    vin: {
      type: String,
      required: true,
      unique: true,
    },
    make: {
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
    additionalInformation: String,
  },
  {
    timestamps: true,
  }
);

export interface ICar extends Document {
  vin: string;
  make: string;
  carModel: string;
  mileage: number;
  color: string;
  price: number;
  year: string;
  trim?: string;
  additionalInformation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CarModel: Model<ICar> = model("Car", CarSchema);
