import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
    NAME_KEY = 'name';
    TOKEN_KEY = 'token'

    constructor(private router: Router) { }
 
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('Can Active called');
        if (localStorage.getItem(this.TOKEN_KEY)) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}