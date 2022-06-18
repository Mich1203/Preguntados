import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  EQuestionDifficulty,
  ICategoryItem,
  IFetchCatsResponse,
  IFetchQuestionsArgs,
  IFetchQuestionsResponse,
  IQuestionItem,
} from '../interfaces/questions';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../interfaces/storage';
import { IUser } from '../interfaces/user';
import { ILeaderboardData } from '../interfaces/leaderboard';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private questionsArr: BehaviorSubject<IQuestionItem[]> = new BehaviorSubject(
    []
  );
  private categoriesArr: BehaviorSubject<ICategoryItem[]> = new BehaviorSubject(
    []
  );
  private leaderboardArr: BehaviorSubject<IUser[]> = new BehaviorSubject([]);
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  get categories() {
    return this.categoriesArr.asObservable();
  }

  get questions() {
    return this.questionsArr.asObservable();
  }

  get leaderboard() {
    return this.leaderboardArr.asObservable();
  }

  get loading() {
    return this._loading.asObservable();
  }

  fetchLeaderboard(mode: string = 'classic') {
    this._loading.next(true);
    this.http
      .get<ILeaderboardData>(`${environment.API_URL}/user/leaderboard`, {
        params: { mode },
      })
      .pipe(
        tap((response) => {
          this.leaderboardArr.next(response);
          this._loading.next(false);
        })
      )
      .subscribe();
  }

  fetchCategories() {
    this._loading.next(true);
    this.http
      .get<IFetchCatsResponse>(`${environment.OPEN_API_URL}/api_category.php`)
      .pipe(
        tap((response) => {
          this.categoriesArr.next(response.trivia_categories);
          this._loading.next(false);
        })
      )
      .subscribe();
  }

  resetQuestions() {
    this.questionsArr.next([]);
  }

  fetchQuestions({
    amount = 10,
    type = 'multiple',
    ...args
  }: IFetchQuestionsArgs = {}) {
    this._loading.next(true);
    from(
      !args.difficulty
        ? this.storageService.get(STORAGE_KEYS.settings)
        : Promise.resolve(args.difficulty)
    )
      .pipe(
        switchMap(({ difficulty }: { difficulty: EQuestionDifficulty }) =>
          this.http.get<IFetchQuestionsResponse>(
            `${environment.OPEN_API_URL}/api.php`,
            {
              params: { type, amount, difficulty, ...args },
            }
          )
        ),
        tap((response) => {
          this.questionsArr.next(response.results);
          this._loading.next(false);
        })
      )
      .subscribe();
  }
}
