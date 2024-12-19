import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login/login.service';

export const authenticationGuard: CanActivateFn = () => {
  const loginService: LoginService = inject(LoginService);
  const router : Router = inject(Router);
  if (loginService.isAuthenticaded()) {

    return true;
  }else{

    router.navigate(['/login']);
    return false;
  }
};
