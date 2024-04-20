import { CanActivateFn } from '@angular/router';
import { AuthUserService } from '../services/auth/auth-user.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  return true;
  
};
