export interface IPropertyBase {
    id: number|null;
    sellRent: number|null;
    name: string;
    propertyType: string|null;
    furnishingType: string;
    price: number|null;
    bhk: number;
    builtArea: number;
    city: string;
    readyToMove: number;
    image: string ;
    estPossesionOn?: Date;
  }
