import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategoryItem } from 'src/app/interfaces/questions';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  categories: ICategoryItem[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.apiService.categories.subscribe((cats) => (this.categories = cats))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
