import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

export const adminPanelGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  const token = localStorage.getItem("token")
  if(token){
    const decodedToken: any = jwtDecode(token);
    const roles:string[] = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log(roles);
    const expectedRoles: string[] = route.data['expectedRoles'] || [];

    // if(roles && roles.includes('car.add')){
    //   return true;
    // }
    const rolesArray = Array.isArray(roles)? roles:[roles];
    if(rolesArray && rolesArray.some(role => expectedRoles.includes(role))){
      return true;
    }
    toastrService.info("Authorization denied!");
    router.navigate(['/unauthorized']);
    return false;
  }
  toastrService.info("You have to login!");
  router.navigate(['/login']);
  return false;
};
