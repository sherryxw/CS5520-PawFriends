export interface ICar {
  _id: string;
  dealerId: string;
  vin: string;
  carMake: string;
  carModel: string;
  mileage: number;
  color: string;
  price: number;
  carYear: string;
  trim?: string;
  description?: string;
  image?: string;
}
