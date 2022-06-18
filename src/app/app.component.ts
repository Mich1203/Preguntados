import { Component, NgZone, OnInit } from '@angular/core';
import {
  DEFAULT_SETTINGS,
  ISettings,
  STORAGE_KEYS,
} from './interfaces/storage';
import { AudioService } from './services/audio.service';
import { StorageService } from './services/storage.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './services/user.service';
import { filter, tap, takeWhile, mergeMap } from 'rxjs/operators';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { callbackUri } from './auth.config';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private storageService: StorageService,
    private audioService: AudioService,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$
      .pipe(
        filter((isAuth) => isAuth),
        tap(() => this.userService.fetchProfile()),
        takeWhile((isAuth) => !isAuth)
      )
      .subscribe();
    this.storageService.init().then(() => this.initSettings());
    this.audioService.init();
    this.handleUrlOpen();
    const platforms = {
      desktop: this.platform.is('desktop'),
      pwa: this.platform.is('pwa'),
      mobileWeb: this.platform.is('mobileweb'),
    };
    if (platforms.desktop || platforms.pwa || platforms.mobileWeb) {
      return;
    }
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  handleUrlOpen() {
    App.addListener('appUrlOpen', ({ url }) => {
      // Must run inside an NgZone for Angular to pick up the changes
      // https://capacitorjs.com/docs/guides/angular
      this.ngZone.run(() => {
        if (url?.startsWith(callbackUri)) {
          if (
            url.includes('state=') &&
            (url.includes('error=') || url.includes('code='))
          ) {
            this.authService
              .handleRedirectCallback(url)
              .pipe(mergeMap(() => Browser.close()))
              .subscribe();
          } else {
            Browser.close();
          }
        }
      });
    });
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
