import { Document, Model, Schema, model, Types } from "mongoose";

export const PostSchema = new Schema(
  {
    userId: {
      // the id of the user who makes this post
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    carMake: String,
    carModel: String,
    carYear: String,
    zipCode: String,
    radius: Number,
    mileage: Number,
    trim: String,
    color: String,
    vin: String,
    drivetrain: String,
    price: { type: Number, required: true }, // price is required
    additionalInformation: String,
  },
  {
    timestamps: true,
  }
);

export interface IPost extends Document {
  userId: Types.ObjectId;
  carMake?: string;
  carModel?: string;
  carYear?: string;
  zipCode?: string;
  radius?: number;
  mileage?: number;
  trim?: string;
  color?: string;
  price: number;
  vin: String;
  drivetrain: String;
  additionalInformation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const PostModel: Model<IPost> = model("Post", PostSchema);
