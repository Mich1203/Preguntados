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

  fetchCategories() {
    this.http
      .get<IFetchCatsResponse>(`${environment.OPEN_API_URL}/api_category.php`)
      .pipe(
        tap((response) => this.categoriesArr.next(response.trivia_categories))
      )
      .subscribe();
  }

  fetchQuestions({
    amount = 10,
    type = 'multiple',
    ...args
  }: IFetchQuestionsArgs = {}) {
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
        tap((response) => this.questionsArr.next(response.results))
      )
      .subscribe();
  }
}
