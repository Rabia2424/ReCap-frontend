import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';
import { DataResponseModel } from '../models/dataResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44392/api/rentals/";

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "getrentaldetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getCheckRentalCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl + "checkrentalcarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }


  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",rental)
  }

  checkRental(rental:Rental):Observable<ResponseModel>{
    let newPath= this.apiUrl + "checkrental";
    return this.httpClient.post<ResponseModel>(newPath,rental).pipe(
      catchError(this.handleError));
  }

}
