import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { AUDIOS } from 'src/app/interfaces/audio';
import { IQuestionItem } from 'src/app/interfaces/questions';
import { IUser } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { AudioService } from 'src/app/services/audio.service';
import { UserService } from 'src/app/services/user.service';

const COUNTER_INITIAL = 3;
const ONE_SEC_MS = 1000;

@Component({
  selector: 'app-rush-mode',
  templateUrl: './rush-mode.page.html',
  styleUrls: ['./rush-mode.page.scss'],
})
export class RushModePage implements OnInit, OnDestroy {
  TOTAL_GAME_TIME = 60;
  gameOver = false;
  currentUser: IUser;

  questionCounter = {
    show: false,
    interval: null,
    value: COUNTER_INITIAL,
  };
  gameCounter = {
    interval: null,
    value: this.TOTAL_GAME_TIME,
  };
  questions: IQuestionItem[] = [];
  currentQuestionIndex = 0;
  score = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private audioService: AudioService,
    private platform: Platform,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.apiService.resetQuestions();
    this.apiService.fetchQuestions({ amount: 5 });
    this.subscriptions.add(
      this.platform.backButton.subscribeWithPriority(10, (next) => {
        this.presentAlert(next);
      })
    );
    this.subscriptions.add(
      this.apiService.questions
        .pipe(filter((qs) => qs.length > 0))
        .subscribe((qs) => this.questions.push(...qs))
    );
    this.subscriptions.add(
      this.userService.profile.subscribe(
        (profile) => (this.currentUser = profile)
      )
    );
    this.startQuestionCounter();
  }

  ngOnDestroy(): void {
    if (this.gameCounter.interval) {
      clearInterval(this.gameCounter.interval);
    }
    if (this.questionCounter.interval) {
      clearInterval(this.questionCounter.interval);
    }
    this.subscriptions.unsubscribe();
  }

  async presentAlert(callback: () => void) {
    const alert = await this.alertController.create({
      header: 'Salir del juego ?',
      message: 'Esta seguro que desea salir del juego?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          handler: callback,
        },
      ],
    });

    await alert.present();
  }

  startGameCounter() {
    if (this.score % 4 === 0) {
      this.apiService.fetchQuestions({ amount: 5 });
    }
    this.gameCounter.interval = setInterval(() => {
      --this.gameCounter.value;
      this.audioService.play(AUDIOS.clock_tick);
      if (this.gameCounter.value === 0) {
        this.audioService.play(AUDIOS.wrong_answer);
        this.stopGameCounter();
        setTimeout(() => this.finishGame(), ONE_SEC_MS * 3);
      }
    }, ONE_SEC_MS);
  }

  stopGameCounter() {
    clearInterval(this.gameCounter.interval);
  }

  startQuestionCounter() {
    this.questionCounter.value = COUNTER_INITIAL;
    this.questionCounter.show = true;
    this.questionCounter.interval = setInterval(() => {
      --this.questionCounter.value;
      if (this.questionCounter.value === 0) {
        this.questionCounter.show = false;
        this.startGameCounter();
        clearInterval(this.questionCounter.interval);
      }
    }, ONE_SEC_MS);
  }

  handleSelectAnswer(correct: boolean) {
    this.stopGameCounter();

    if (correct) {
      ++this.score;
      this.audioService.play(AUDIOS.correct_answer);
      if (this.score % 5 === 0) {
        this.gameCounter.value += 10;
      }
      setTimeout(() => {
        ++this.currentQuestionIndex;
        this.startGameCounter();
      }, ONE_SEC_MS * 3.5);
    } else {
      this.audioService.play(AUDIOS.wrong_answer);
      setTimeout(() => this.finishGame(), ONE_SEC_MS * 3);
    }
  }

  finishGame() {
    this.gameOver = true;
    const { score, time_left } = this.currentUser.hi_score_rush;
    if (this.score > score || this.gameCounter.value < time_left) {
      this.userService.saveUserScore(
        this.gameCounter.value,
        this.score,
        'rush'
      );
    }
  }
}
