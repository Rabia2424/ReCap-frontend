import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);

  let token = null;
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
    //console.log('Token from localStorage:', token); // Add this line
  }
  let newRequest: HttpRequest<any>;
  if (token) {
    newRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  } else {
    newRequest = req.clone();
  }
  return next(newRequest);
};
