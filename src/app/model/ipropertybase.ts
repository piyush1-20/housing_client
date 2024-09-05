import { Photo } from "./photo";

export interface IPropertyBase {
    id: number;
    sellRent: number;
    name: string;
    propertyType: string;
    furnishingType: string;
    price: number|null;
    bhk: number;
    builtArea: number|null;
    city: string;
    readyToMove: boolean;
    photo: string ;
    estPossesionOn: Date|null;
  }
