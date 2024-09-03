import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserClaim } from '../models/user-claim';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserClaimDto } from '../models/user-claim-dto';

@Injectable({
  providedIn: 'root'
})
export class UserClaimService {
  apiUrl = 'https://localhost:44392/api/';
  constructor(private httpClient:HttpClient) { }

  getAllUserClaims():Observable<ListResponseModel<UserClaim>>{
    return this.httpClient.get<ListResponseModel<UserClaim>>(this.apiUrl + "useroperationClaims/getall");
  }

  getAllUserClaimsWithDetails():Observable<ListResponseModel<UserClaimDto>>{
    return this.httpClient.get<ListResponseModel<UserClaimDto>>(this.apiUrl + "useroperationClaims/getalluserclaimwithdetails");
  }

  getClaimsByUserId(userId:number):Observable<ListResponseModel<UserClaim>>{
    let newPath = this.apiUrl + "useroperationClaims/getbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<UserClaim>>(newPath);
  }

  addUserClaim(userClaim:UserClaim):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"useroperationClaims/add",userClaim);
  }

  deleteUserClaim(userClaim:UserClaim):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"useroperationClaims/delete",userClaim);
  }
}
