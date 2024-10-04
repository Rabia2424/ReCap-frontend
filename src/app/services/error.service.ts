import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService:ToastrService) { }

  handleValidationError(errorResponse: any) {
    if(errorResponse.Errors && errorResponse.Errors.length > 0){
      for(let i = 0;i < errorResponse.Errors.length;i++){
        this.toastrService.error(errorResponse.Errors[i].ErrorMessage,"Validation Exception!");
      }
    }
  };

  // handleErrorResponseFromBackend(err:any){
  //   if(err.message){
  //     this.toastrService.error(err.message);
  //   }
  // }

}
