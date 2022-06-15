export interface IUser {
  _id: string;
  email: string;
  hi_score: {
    time_left: number;
    score: number;
  };
}
