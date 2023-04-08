import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    // @ts-ignore
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAdmin()) {
            return true
        } else {
            if (this.authService.isAuthenticated()) {
                this.router.navigate(['/forbidden']).then(r => null)
            } else {
                this.router.navigate(['/login']).then(r => null)
            }
        }
    }

}
