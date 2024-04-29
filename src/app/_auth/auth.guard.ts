import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userAuthService: UserAuthService, private router: Router, private userService: UserService){}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (this.userAuthService.getToken() !== '') {
      const role = route.data['roles'] as Array<string>
      if(role){
        const match = this.userService.matchRole(role);
        if(match){
          return true;
        } else{
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }

    this.router.navigate(['/login'])
    return false;
  }
}
