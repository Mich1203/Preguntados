import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { filter, takeWhile, tap } from 'rxjs/operators';
import { ICategoryItem } from 'src/app/interfaces/questions';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  categories: ICategoryItem[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    public apiService: ApiService,
    public authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.apiService.categories.subscribe((cats) => (this.categories = cats))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
