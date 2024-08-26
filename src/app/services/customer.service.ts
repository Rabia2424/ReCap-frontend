import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44392/api/customers/";

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl + "getall");
  }

  getCustomerByUserId(userId:number):Observable<DataResponseModel<Customer>>{
    let newPath = this.apiUrl + "getcustomerbyuserid?userId=" + userId;
    return this.httpClient.get<DataResponseModel<Customer>>(newPath);
  }
}
