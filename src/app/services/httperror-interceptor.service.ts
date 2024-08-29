import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, count, Observable, of, retry, retryWhen, throwError } from "rxjs";
import { AlertifyService } from "./alertify.service";

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptorService implements HttpInterceptor{

  constructor(private alertify:AlertifyService){};

  intercept(request:HttpRequest<any>,next:HttpHandler){

    console.log("HTTP request started");
    return next.handle(request)
    .pipe(
      retryWhen(error =>
        error.pipe(
        concatMap((checkErr:HttpErrorResponse,count:number)=>{
          if(checkErr.status===0 && count<=10){
            return of(checkErr);
          }
          return throwError(checkErr);
        })
      )),
      catchError((error:HttpErrorResponse)=>{
        // console.error(error);
        const errorMessage = this.setError(error);
        this.alertify.error(errorMessage);
        // console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  setError(error :HttpErrorResponse):string{
    let errorMessage = "Unknown error occurred";
    if(error.error instanceof ErrorEvent){
      //client error
      errorMessage = error.error.message;
    }else{
      //server error
      if(error.status!==0){
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }

}
