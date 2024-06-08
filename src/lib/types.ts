export type Difficulty = {
  difficulty?: string;
  range: { from: number; to: number };
  quantity: { min: number; max: number };
  interval: number;
  timer: number;
};

export type Level = {
  level: number;
  difficulty: {
    difficulty: string;
    range: { from: number; to: number };
    quantity: { min: number; max: number };
    interval: number;
    timer: number;
  };
};

export type User = {
  id: string;
  username: string;
  completed_levels: number[];
  highest_round: number;
};

export type AppwriteUser = {
  $id: string;
  username: string;
  email: string;
  password: string;
  completed_levels: number[];
  image: string;
  rank: number;
  highest_round: number;
};