import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../_services/token.service";
import {routesNames} from "../app/app.routes";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isAuthenticated()) {
    return true;
  } else {
    router.navigate([routesNames.login]);
    return false;
  }
};
