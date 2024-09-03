import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponseModel } from '../models/dataResponseModel';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44392/api/users/";
  constructor(private httpClient:HttpClient) { }

  getAllUsers():Observable<ListResponseModel<User>>{
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl + "getall");
  }

  getUserByEmail(email:string):Observable<DataResponseModel<User>>{
    return this.httpClient.get<DataResponseModel<User>>(this.apiUrl + "getbymail?email=" + email);
  }

  updateUserNames(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "updateusernames",user);
  }

  getUserById(userId:number):Observable<DataResponseModel<User>>{
    let newPath = this.apiUrl + "getbyid?userId=" + userId;
    return this.httpClient.get<DataResponseModel<User>>(newPath);
  }
}
