import { EQuestionDifficulty } from './questions';

export interface ISettings {
  difficulty: EQuestionDifficulty;
}

export const DEFAULT_SETTINGS: ISettings = {
  difficulty: EQuestionDifficulty.medium,
};

export enum STORAGE_KEYS {
  settings = 'settings',
}
