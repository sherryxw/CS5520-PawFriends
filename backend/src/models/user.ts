import { Document, Model, Schema, model } from "mongoose";

// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
// Check this url for more details: https://mongoosejs.com/docs/guide.html
export const UserSchema = new Schema(
  {
    auth0Id: {
      type: String,
      index: true,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      // The type field in a schema object is not Typescript type. It's mongoose SchemaType.
      // Check this url: https://mongoosejs.com/docs/schematypes.html
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["BUYER", "DEALER"],
    },
  },
  {
    // this option allows mongoose to automatically add and manage `createdAt` and `updatedAt` fields of documents
    timestamps: true,
  }
);

type UserRole = "BUYER" | "DEALER";

// IUser describes the type information of the following UserModel
// Common fields of mongo collections, like "_id", are defined in Document

// You may wonder why we define the structure of User objects twice.
// The reason is that mongoose does not support typescript very well. A model cannot infer type information from its schema correctly.
// So, we define this interface to let the Typescript compiler know the type definition of User objects.
export interface IUser extends Document {
  // type information here is Typescript type
  auth0Id: string;
  username: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel: Model<IUser> = model("User", UserSchema);
