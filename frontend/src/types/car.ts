export interface ICar {
  _id: string;
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
  imageUrl?: string;
}
