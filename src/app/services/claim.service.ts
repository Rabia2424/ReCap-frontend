import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from '../models/claim';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  apiUrl="https://localhost:44392/api/";
  constructor(private httpClient:HttpClient) { }

  getAllClaims():Observable<ListResponseModel<Claim>>{
    return this.httpClient.get<ListResponseModel<Claim>>(this.apiUrl + "operationClaims/getall");
  }
}
