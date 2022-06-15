import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private storageService: StorageService) {}

  getToken(): Promise<string> {
    return this.storageService.get(ACCESS_TOKEN);
  }

  getRefreshToken(): Promise<string> {
    return this.storageService.get(REFRESH_TOKEN);
  }

  saveToken(token: string): void {
    this.storageService.set(ACCESS_TOKEN, token);
  }

  saveRefreshToken(refreshToken: string): void {
    this.storageService.set(REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    this.storageService.remove(ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    this.storageService.remove(REFRESH_TOKEN);
  }
}
