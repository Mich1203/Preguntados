import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IQuestionItem } from 'src/app/interfaces/questions';
import { shuffle } from 'src/app/utils/utils';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input() question: IQuestionItem;
  @Output() selectAnswer: EventEmitter<boolean> = new EventEmitter();
  possibleAnswers: string[];
  selectedAnswer: string;

  constructor() {}

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.currentValue.question) {
      this.init();
    }
  }

  init() {
    this.selectedAnswer = null;
    this.possibleAnswers = shuffle([
      this.question.correct_answer,
      ...this.question.incorrect_answers,
    ]);
  }

  handleButtonClick(answer: string) {
    if (this.selectedAnswer) {
      return;
    }
    this.selectedAnswer = answer;
    this.selectAnswer.emit(
      this.selectedAnswer === this.question.correct_answer
    );
  }

  getButtonColor(answer: string) {
    if (this.selectedAnswer && answer === this.question.correct_answer) {
      return 'success';
    } else if (
      this.selectedAnswer === answer &&
      this.selectedAnswer !== this.question.correct_answer
    ) {
      return 'danger';
    }
    return 'light';
  }
}
