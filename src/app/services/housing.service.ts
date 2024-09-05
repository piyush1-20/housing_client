import { NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';
import { Property } from '../model/property';
import { Ikeyvaluepair } from '../model/ikeyvaluepair';
import { environment } from '../../environments/environment';

interface IPropertyBaseDictionary {
  [key: string]: IPropertyBase;
}

@Injectable({
  providedIn: 'root'
})
export class HousingService {
      private  base_url = environment.apiUrl;
      constructor(private http: HttpClient) { }

      getAllCities():Observable<string[]>{
        return this.http.get<string[]>(this.base_url+'/City');
      }
      getPropertyTypes():Observable<Ikeyvaluepair[]>{
        return this.http.get<Ikeyvaluepair[]>(this.base_url+'/PropertyType/list');
      }
      getFurnishingTypes():Observable<Ikeyvaluepair[]>{
        return this.http.get<Ikeyvaluepair[]>(this.base_url+ '/FurnishingType/list');
      }

      getProperty(id:number){
         return this.http.get<Property>(this.base_url+ "/Property/detail/" +id.toString());
      }

      getAllProperties(SellRent?: number): Observable<Property[]> {
        return this.http.get<Property[]>(this.base_url+ "/Property/list/" + SellRent?.toString());
      }


      addProperty(property: Property) {
        const httpOptions = {
          headers:new HttpHeaders({
            Authorization: 'Bearer '+ localStorage.getItem('token')
          })
        };
        return this.http.post(this.base_url +"/Property/add",property,httpOptions);
      }
      addPropertyPhoto(formData:FormData,propId:number) {
        const httpOptions = {
          headers:new HttpHeaders({
            Authorization: 'Bearer '+ localStorage.getItem('token')
          })
        };
        return this.http.post(this.base_url+ "/Property/add/photo/"+propId,formData,httpOptions);
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
      setPrimaryPhoto(propId:number,propPhotoId:string){
        const httpOptions = {
          headers:new HttpHeaders({
            Authorization: 'Bearer '+ localStorage.getItem('token')
          })
        };
        return this.http.post(this.base_url + "/property/set-primary-photo/" +(propId)+'/' + propPhotoId,{},httpOptions);

      }

      deletePhoto(propId:number,propPhotoId:string){
        const httpOptions = {
          headers:new HttpHeaders({
            Authorization: 'Bearer '+ localStorage.getItem('token')
          })
        };
        return this.http.delete(this.base_url + "/property/delete-photo/" +(propId)+'/' + propPhotoId,httpOptions);

      }

}
