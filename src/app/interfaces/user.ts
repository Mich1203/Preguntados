export interface IUser {
  _id: string;
  email: string;
  name: string;
  hi_score_classic: {
    time_left: number;
    score: number;
  };
  hi_score_rush: {
    time_left: number;
    score: number;
  };
}
