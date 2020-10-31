import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AgriculturistGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser && currentUser.type === "agriculturist") {
      return true;  // Authorised so return true.
    }

    // Not logged in so redirect to login page with the return url.
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
