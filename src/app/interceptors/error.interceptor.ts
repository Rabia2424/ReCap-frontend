import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ErrorHandler, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  const toastrService = inject(ToastrService);


  return next(req).pipe(catchError(
    (err:HttpErrorResponse)=>{

      console.log(err);
      let message="Error happened!";
      if(err.error.Errors && err.error.Errors.length >0){
        errorService.handleValidationError(err.error);
      }
      if(err.error.message){
        message = err.error.message;
        toastrService.error(message);
      }
      if(!navigator.onLine){
        message = "There is no internet connection."
        return throwError(() => message);
      }
      return throwError(() => message);
    }
  ));
};




