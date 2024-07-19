import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44392/api/payments/";
  constructor(private httpClient:HttpClient) { }
  
  add(payment:Payment):Observable<ResponseModel>{
    let newPath=this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  delete(payment:Payment):Observable<ResponseModel>{
    let newPath=this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  pay(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl + "pay";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  checkIfThisCardIsAlreadySavedForThisCustomer(payment: Payment) {
    let newPath = this.apiUrl + 'checkifthiscardisalreadysavedforthiscustomer';
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }

  getAllByCustomerId(customerId:number):Observable<ListResponseModel<Payment>>{
    let newPath= this.apiUrl + 'getallbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }
  
}
