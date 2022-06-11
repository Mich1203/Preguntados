export enum EQuestionType {
  multiple = 'multiple',
  trueOrFalse = 'boolean',
}

export enum EQuestionDifficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export interface ICategoryItem {
  id: number;
  name: string;
}

export interface IQuestionItem {
  category: string;
  type: EQuestionType;
  difficulty: EQuestionDifficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IFetchCatsResponse {
  trivia_categories: ICategoryItem[];
}

export interface IFetchQuestionsResponse {
  response_code: number;
  results: IQuestionItem[];
}

export interface IFetchQuestionsArgs {
  amount?: number;
  type?: string;
  category?: number;
  difficulty?: EQuestionDifficulty;
}
