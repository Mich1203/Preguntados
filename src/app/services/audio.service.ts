import { Injectable } from '@angular/core';
import { AUDIOS } from '../interfaces/audio';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audios = {};
  constructor() {}

  init() {
    for (const key in AUDIOS) {
      if (Object.prototype.hasOwnProperty.call(AUDIOS, key)) {
        const element = AUDIOS[key];
        this.audios[element] = new Audio(`assets/audio/${element}`);
      }
    }
  }

  play(id: AUDIOS) {
    this.audios[id].play(id);
  }
}
