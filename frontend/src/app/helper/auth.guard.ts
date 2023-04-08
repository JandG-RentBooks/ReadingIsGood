import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  // @ts-ignore
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if (this.authService.isAuthenticated()) {
      return true
    } else {
      this.router.navigate(['/login']).then(r => null)
    }
  }
}
