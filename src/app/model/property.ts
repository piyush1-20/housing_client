import { IPropertyBase } from './ipropertybase';
import { Photo } from './photo';

export class Property implements IPropertyBase {
  id!: number;
  sellRent!: number;
  name!: string;
  propertyTypeId:number=1;
  propertyType!: string;
  bhk!: number;
  furnishingTypeId:number=1;
  furnishingType!: string;
  price: number = 0;
  builtArea: number=0;
  carpetArea: number=0;
  address!: string;
  address2?: string;
  cityId!:number;
  city!: string;
  floorNo?: number;
  totalFloors?: number;
  readyToMove: boolean =true;
  age!: number;
  mainEntrance?: string;
  security?: number;
  gated: boolean = true;
  maintenance: number=0;
  estPossesionOn!: Date;
  photo!: string ;
  description?: string;
  photos?:Photo[];
  postedBy!:number;
}
