import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AUDIOS } from 'src/app/interfaces/audio';
import { IQuestionItem } from 'src/app/interfaces/questions';
import { ApiService } from 'src/app/services/api.service';
import { AudioService } from 'src/app/services/audio.service';

const COUNTER_INITIAL = 5;
const ONE_SEC_MS = 1000;

@Component({
  selector: 'app-classic-mode',
  templateUrl: './classic-mode.page.html',
  styleUrls: ['./classic-mode.page.scss'],
})
export class ClassicModePage implements OnInit {
  TOTAL_GAME_TIME = 60;

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

  constructor(
    private apiService: ApiService,
    private audioService: AudioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.apiService.fetchQuestions();
    this.apiService.questions.subscribe((qs) => (this.questions = qs));
    this.startQuestionCounter();
  }

  startGameCounter() {
    this.gameCounter.interval = setInterval(() => {
      --this.gameCounter.value;
      this.audioService.play(AUDIOS.clock_tick);
      if (this.gameCounter.value === 0) {
        this.stopGameCounter();
        alert('Game over');
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
      setTimeout(() => {
        this.startQuestionCounter();
        ++this.currentQuestionIndex;
      }, ONE_SEC_MS * 3);
    } else {
      this.audioService.play(AUDIOS.wrong_answer);
      setTimeout(() => this.router.navigate(['tabs', 'playTab']), ONE_SEC_MS * 3);
    }
  }
}
