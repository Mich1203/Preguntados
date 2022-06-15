import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { AUDIOS } from 'src/app/interfaces/audio';
import { IQuestionItem } from 'src/app/interfaces/questions';
import { ApiService } from 'src/app/services/api.service';
import { AudioService } from 'src/app/services/audio.service';

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
    private apiService: ApiService,
    private audioService: AudioService,
    private platform: Platform,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.apiService.fetchQuestions({ amount: 1 });
    this.subscriptions.add(
      this.platform.backButton.subscribeWithPriority(10, (next) => {
        this.presentAlert(next);
      })
    );
    this.subscriptions.add(
      this.apiService.questions
        .pipe(
          filter((qs) => qs.length > 0),
          map((qs) => qs[0])
        )
        .subscribe((qs) => this.questions.push(qs))
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

  startGameCounter(fetchNextQuestion = true) {
    if (fetchNextQuestion) {
      this.apiService.fetchQuestions({ amount: 1 });
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
        this.startGameCounter(false);
        clearInterval(this.questionCounter.interval);
      }
    }, ONE_SEC_MS);
  }

  handleSelectAnswer(correct: boolean) {
    this.stopGameCounter();

    if (correct) {
      ++this.score;
      this.audioService.play(AUDIOS.correct_answer);
      setTimeout(() => {
        ++this.currentQuestionIndex;
        if (this.currentQuestionIndex === 1) {
          this.finishGame();
        } else {
          this.startGameCounter();
        }
      }, ONE_SEC_MS * 3.5);
    } else {
      this.audioService.play(AUDIOS.wrong_answer);
      setTimeout(() => this.finishGame(), ONE_SEC_MS * 3);
    }
  }

  finishGame() {
    this.gameOver = true;
  }
}
