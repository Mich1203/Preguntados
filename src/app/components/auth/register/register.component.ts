import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

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
        this.authService.loginWithRedirect({
          redirect_uri: document.location.origin + '/tabs/homeTab',
        });
      } else {
        this.router.navigate(['tabs', 'homeTab']);
      }
    });
  }
}
