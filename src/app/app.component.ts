import { Component, OnInit } from '@angular/core';
import {
  DEFAULT_SETTINGS,
  ISettings,
  STORAGE_KEYS,
} from './interfaces/storage';
import { ApiService } from './services/api.service';
import { AudioService } from './services/audio.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.storageService.init().then(() => this.initSettings());
    this.audioService.init();
    this.apiService.fetchCategories();
  }

  async initSettings() {
    const currentSettings = await this.storageService.get(
      STORAGE_KEYS.settings
    );
    if (!currentSettings) {
      await this.storageService.set<ISettings>(
        STORAGE_KEYS.settings,
        DEFAULT_SETTINGS
      );
    }
  }
}
