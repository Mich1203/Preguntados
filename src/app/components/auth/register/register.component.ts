import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuth: boolean) => {
      if (!isAuth) {
        // this.authService
        //   .buildAuthorizeUrl()
        //   .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
        //   .subscribe();
      } else {
        this.router.navigate(['tabs', 'homeTab']);
      }
    });
  }

  login() {
    this.authService
      .buildAuthorizeUrl()
      .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
      .subscribe();
  }
}
