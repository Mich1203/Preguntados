import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchProfile() {
    this.authService.getUser().pipe(
      switchMap((user) =>
        this.http.get<IUser>(`${environment.API_URL}/user/profile`, {
          headers: {
            Authorization: 'Bearer ' + user.email,
          },
        })
      )
    ).subscribe();
  }
}
