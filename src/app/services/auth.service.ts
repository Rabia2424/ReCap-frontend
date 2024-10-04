import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';
import { DataResponseModel } from '../models/dataResponseModel';
import { LoginModel } from '../models/loginModel';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/registerModel';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';
import { UserPasswordModel } from '../models/userPasswordModel';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44392/api/auth/";



  constructor(private httpClient:HttpClient,
    private localStorageService:LocalStorageService,
    private toastrService: ToastrService,
     private router: Router
  ) { }

  login(user:LoginModel):Observable<DataResponseModel<TokenModel>>{
    return this.httpClient.post<DataResponseModel<TokenModel>>(this.apiUrl + "login",user);
  }

  logOut(){
    this.localStorageService.removeAll();
  }

  register(user:RegisterModel):Observable<DataResponseModel<TokenModel>>{
    return this.httpClient.post<DataResponseModel<TokenModel>>(this.apiUrl + "register",user);
  }

  updatePassword(userPasswordModel:UserPasswordModel):Observable<DataResponseModel<TokenModel>>{
    return this.httpClient.post<DataResponseModel<TokenModel>>(this.apiUrl + "updatepassword",userPasswordModel);
  }

  isAuthenticated():boolean{
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }


  getUserId(): number | null {
    const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          console.log('Decoded Token:', decodedToken); // Token'ın içeriğini kontrol edin
          const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          return userId ? Number(userId) : null;
        } catch (error) {
          console.error('Token decoding error:', error); // Hata olup olmadığını kontrol edin
        }
    }
    return null;
  }

  checkTokenExpiration() {
    const expirationDate = this.localStorageService.getItem('expirationDate');
    if (expirationDate) {
      const expirationTime = new Date(expirationDate).getTime();
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        this.localStorageService.remove('token');
        this.localStorageService.remove('expirationDate');
        this.toastrService.warning(
          'Your session has expired. Please log in again.'
        );
        this.router.navigate(['/account/login']);
      }
    }
  }



  // verifyEmail(token:string){
  //   let newPath= `https://localhost:44392/api/emailVerification/email-verify/${token}`;
  //   return this.httpClient.get(newPath);
  // }


}
