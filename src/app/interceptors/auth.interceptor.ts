import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = null;
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
  }

  let newRequest: HttpRequest<any>;
  if (token) {
    newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  } else {
    newRequest = req.clone();
  }
  return next(newRequest);
};
