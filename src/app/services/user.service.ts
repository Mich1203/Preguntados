import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _profile: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
  constructor(private authService: AuthService, private http: HttpClient) {}

  get profile() {
    return this._profile.asObservable();
  }

  fetchProfile() {
    this.http
      .get<IUser>(`${environment.API_URL}/user/profile`)
      .pipe(tap((user) => this._profile.next(user)))
      .subscribe();
  }

  saveUserScore(
    timeRemaining: number,
    questionsAnswered: number,
    mode: 'classic' | 'rush'
  ) {
    this.http
      .put<IUser>(
        `${environment.API_URL}/user/score/${this._profile.getValue()._id}`,
        { timeRemaining, questionsAnswered, mode }
      )
      .pipe(tap((user) => this._profile.next(user)))
      .subscribe();
  }
}
