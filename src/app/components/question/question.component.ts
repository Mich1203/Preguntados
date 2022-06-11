import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQuestionItem } from 'src/app/interfaces/questions';
import { shuffle } from 'src/app/utils/utils';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: IQuestionItem;
  @Output() selectAnswer: EventEmitter<boolean> = new EventEmitter();
  possibleAnswers: string[];
  selectedAnswer: string;

  constructor() {}

  ngOnInit() {
    this.possibleAnswers = shuffle([
      this.question.correct_answer,
      ...this.question.incorrect_answers,
    ]);
  }

  handleButtonClick(answer: string) {
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
