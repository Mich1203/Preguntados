import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.scss'],
})
export class GameSummaryComponent implements OnInit {
  @Input() score: number;
  @Input() timeRemaining: number;
  @Input() difficulty: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  goPlay() {
    this.router.navigate(['tabs', 'playTab']);
  }

}
