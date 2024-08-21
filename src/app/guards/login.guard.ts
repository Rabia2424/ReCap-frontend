import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  if(authService.isAuthenticated()){
    return true;
  }else{
    router.navigate(["login"]);
    toastrService.info("You have to login!");
    return false;
  }
};
