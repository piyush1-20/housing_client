import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';
import { Property } from '../model/property';
import { Ikeyvaluepair } from '../model/ikeyvaluepair';

interface IPropertyBaseDictionary {
  [key: string]: IPropertyBase;
}

@Injectable({
  providedIn: 'root'
})
export class HousingService {
      constructor(private http: HttpClient) { }

      getAllCities():Observable<string[]>{
        return this.http.get<string[]>('http://localhost:5192/api/city');
      }
      getPropertyTypes():Observable<Ikeyvaluepair[]>{
        return this.http.get<Ikeyvaluepair[]>('http://localhost:5192/api/PropertyType/list');
      }
      getFurnishingTypes():Observable<Ikeyvaluepair[]>{
        return this.http.get<Ikeyvaluepair[]>('http://localhost:5192/api/FurnishingType/list');
      }

      getProperty(id:number){
         return this.http.get<Property>("http://localhost:5192/api/Property/detail/" +id.toString());
      }

      getAllProperties(SellRent?: number): Observable<Property[]> {
        return this.http.get<Property[]>("http://localhost:5192/api/Property/list/" + SellRent?.toString());
      }


      addProperty(property: Property) {
         let nProp = [];
          let savedProperty = localStorage.getItem('newProp');
         if(savedProperty){
          nProp = JSON.parse(savedProperty)
          nProp = [property,...nProp]
         }else{
          nProp = [property]
         }
        localStorage.setItem('newProp', JSON.stringify(nProp));
      }

      newPropID(): number {
        const currentIDString = localStorage.getItem('PID');
        if (currentIDString !== null) {
          const currentID = parseInt(currentIDString, 10);
          const newID = currentID + 1;
          localStorage.setItem('PID', String(newID));
          return newID;
        } else {
          const initialID = 101;
          localStorage.setItem('PID', String(initialID));
          return initialID;
        }
      }

      getPropertyAge(dateofEstablishment:Date):string{
        const today = new Date();
        const estDate = new Date(dateofEstablishment);
        let age = today.getFullYear() - estDate.getFullYear();
        const m = today.getMonth() - estDate.getMonth();
        if(m<0 || (m===0 && today.getDate()<estDate.getDate())){
          age--;
        }
        if(today<estDate){
          return '0';
        }
        if(age===0){
          return 'Less than a year';
        }
        return age.toString();
      }

}
