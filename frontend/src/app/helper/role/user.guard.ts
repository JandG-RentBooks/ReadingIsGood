import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    // @ts-ignore
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isUser()) {
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
