import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean | Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
