import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from '../models/carImage';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44392/api/";

  constructor(private httpClient: HttpClient) { }

  getAllCarImages():Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl + 'carImages/getall');
  }

  add(formData:FormData):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'carImages/add',formData);
  }

  update(formData:FormData):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'carImages/update',formData);
  }

  delete(formData:FormData):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'carImages/delete',formData);
  }
}
