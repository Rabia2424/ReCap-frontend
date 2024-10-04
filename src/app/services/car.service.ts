import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/car-detail';
import { DataResponseModel } from '../models/dataResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44392/api/';

  constructor(private httpClient: HttpClient) { }


  getCars():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByMinandMaxPrice(minPrice:number|null,maxPrice:number|null):Observable<ListResponseModel<CarDetail>>{
    let params = new HttpParams();

    if (minPrice !== null) {
      params = params.set('minPrice', minPrice.toString());
    }

    if (maxPrice !== null) {
      params = params.set('maxPrice', maxPrice.toString());
    }
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + "cars/getcarsbyminandmaxprice", {params});
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcarsbybrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcarsbycolorid?Id=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(carId:number):Observable<DataResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getdetailsbycarid?id=" + carId;
    return this.httpClient.get<DataResponseModel<CarDetail>>(newPath);
  }

  getCarByBrandAndColor(brandId:number, colorId:number): Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + 'cars/getcarbybrandandcolor?brandId=' + brandId + '&colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/add',car);
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/update',car);
  }

  delete(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/delete",car);
  }

}
