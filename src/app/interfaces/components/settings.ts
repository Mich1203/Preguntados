import { AbstractControl } from '@angular/forms';
import { EQuestionDifficulty } from '../questions';

export interface ISettingsForm {
  difficulty: AbstractControl<EQuestionDifficulty | ''>;
}
