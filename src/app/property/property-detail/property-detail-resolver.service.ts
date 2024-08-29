import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Property } from '../../model/property';
import { HousingService } from '../../services/housing.service';

@Injectable({ providedIn: 'root' })
export class PropertyDetailResolver implements Resolve<Property> {

  constructor(private housing : HousingService){}

  resolve(route: ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<Property> | Promise<Property> | Property {
    const propId =route.params['id']
    
     return this.housing.getProperty(+propId).pipe(
      map((property) => {
        if (property) {
          return property;
        } else {
          // Handle property not found
          throw new Error('Property not found');
        }
      }),
      catchError((error) => {
        // Optionally log the error or navigate to an error page
        console.error(error);
        // You might want to return a default value or redirect here
        return throwError(error);
      })
    );
  }  
}