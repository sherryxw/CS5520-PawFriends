export interface IPost {
  _id: string;
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
