import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { EQuestionDifficulty } from '../interfaces/questions';
import { ISettings, STORAGE_KEYS } from '../interfaces/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  set<T>(key: string, value: T) {
    return this._storage?.set(key, value);
  }

  remove(key: string) {
    return this._storage?.remove(key);
  }

  get<T>(key: string): Promise<T> {
    return this._storage?.get(key);
  }

  clear() {
    return this._storage?.clear();
  }
}
