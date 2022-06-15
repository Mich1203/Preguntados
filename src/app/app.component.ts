import { Component, OnInit } from '@angular/core';
import {
  DEFAULT_SETTINGS,
  ISettings,
  STORAGE_KEYS,
} from './interfaces/storage';
import { ApiService } from './services/api.service';
import { AudioService } from './services/audio.service';
import { StorageService } from './services/storage.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private audioService: AudioService,
    private screenOrientation: ScreenOrientation,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.storageService.init().then(() => this.initSettings());
    this.audioService.init();
    const platforms = {
      desktop: this.platform.is('desktop'),
      pwa: this.platform.is('pwa'),
      cordova: this.platform.is('cordova'),
      capacitor: this.platform.is('capacitor'),
      hybrid: this.platform.is('hybrid'),
      android: this.platform.is('android'),
      mobile: this.platform.is('mobile'),
      mobileWeb: this.platform.is('mobileweb'),
      tablet: this.platform.is('tablet'),
    };
    console.log(platforms);
    if (platforms.desktop || platforms.pwa || platforms.mobileWeb) {
      return;
    }
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
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
