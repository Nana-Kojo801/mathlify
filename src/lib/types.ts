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
  $id: string;
  username: string;
  completed_levels: number[];
  highest_round: number;
  email: string;
  password: string;
  image: string;
  average_time: number;
};