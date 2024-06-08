import type { Difficulty, Level } from "./types";

export const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1"
export const APPWRITE_PROJECT_ENDPOINT = "665d7490003e64abf620"
export const APPWRITE_DATABASE_ID = "665d74be00248ec07494"
export const APPWRITE_USERS_COLLECTION_ID ="665d74ca00052720b944"

export function getRandomNumbers(difficulty: Difficulty): number[] {
  // Destructure the range and rounds from the difficulty object
  const {
    range: { from, to },
    quantity: { min, max },
  } = difficulty;

  // DeterMath.abs(min)e a random number of times within the Math.abs(min) and Math.abs(max) range
  const times = Math.floor(Math.random() * (Math.abs(max) - Math.abs(min) + 1)) + Math.abs(min);

  const numbers = [];
  let lastNumber = null;

  for (let i = 0; i < times; i++) {
    let randomValue;
    do {
      // Generate random number between Math.abs(from) and Math.abs(to) (inclusive)
      randomValue = Math.floor(Math.random() * (Math.abs(to) - Math.abs(from) + 1)) + Math.abs(from);
      // Randomly determine positive or negative
      randomValue = Math.random() < 0.5 ? -randomValue : randomValue;
    } while (randomValue === lastNumber);

    numbers.push(randomValue);
    lastNumber = randomValue;
  }

  return numbers;
}

export const getAnswer = (numbers: number[]): number => {
  return numbers.reduce((a, b) => a + b, 0);
};

export const difficulties = [
  {
    difficulty: "Beginner",
    range: { from: 1, to: 10 },
    quantity: { min: 3, max: 5 },
    interval: 1,
    timer: 5
  },
  {
    difficulty: "Junior",
    range: { from: 1, to: 20 },
    quantity: { min: 5, max: 7 },
    interval: 0.9,
    timer: 5
  },
  {
    difficulty: "Aspiring",
    range: { from: 1, to: 50 },
    quantity: { min: 7, max: 10 },
    interval: 0.7,
    timer: 5
  },
  {
    difficulty: "Developing",
    range: { from: 10, to: 100 },
    quantity: { min: 9, max: 12 },
    interval: 0.75,
    timer: 5
  },
  {
    difficulty: "Proficient",
    range: { from: 20, to: 200 },
    quantity: { min: 12, max: 15 },
    interval: 0.5,
    timer: 5
  },
  {
    difficulty: "Adept",
    range: { from: 30, to: 300 },
    quantity: { min: 15, max: 18 },
    interval: 0.45,
    timer: 5
  },
  {
    difficulty: "Advanced",
    range: { from: 40, to: 400 },
    quantity: { min: 17, max: 20 },
    interval: 0.4,
    timer: 7
  },
  {
    difficulty: "Expert",
    range: { from: 50, to: 500 },
    quantity: { min: 19, max: 22 },
    interval: 0.4,
    timer: 7
  },
  {
    difficulty: "Ace",
    range: { from: 60, to: 600 },
    quantity: { min: 22, max: 25 },
    interval: 0.35,
    timer: 8
  },
  {
    difficulty: "Mastermind",
    range: { from: 70, to: 700 },
    quantity: { min: 25, max: 30 },
    interval: 0.3,
    timer: 10
  },
  {
    difficulty: "Custom",
    range: { from: 1, to: 9 },
    quantity: { min: 5, max: 7 },
    interval: 1,
    timer: 6
  },
] satisfies Difficulty[];

export const difficultyList = difficulties.map(diff => diff.difficulty)

export const wait = (secs = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, secs);
  });
};

export const levels = Array.from({ length: 500 }, (_, i) => {
  const level = i + 1;
  let range, quantity, interval, timer;

  if (level <= 50) {
    range = { from: 1, to: level * 2 };
    quantity = { min: 3, max: 5 };
    interval = 1.25 - (level - 1) * 0.025; // Starts at 1.25 and decreases by 0.025 per level
    timer = Math.min(10, 5 + Math.floor((level - 1) / 10)); // Starts at 5 and increases every 10 levels up to 10
  } else if (level <= 100) {
    range = { from: level, to: level * 3 };
    quantity = { min: 5, max: 7 };
    interval = 1.0 - (level - 51) * 0.01; // Starts at 1.0 and decreases by 0.01 per level
    timer = Math.min(10, 5 + Math.floor((level - 1) / 10)); // Starts at 5 and increases every 10 levels up to 10
  } else if (level <= 200) {
    range = { from: level, to: level * 4 };
    quantity = { min: 7, max: 10 };
    interval = 0.75 - (level - 101) * 0.005; // Starts at 0.75 and decreases by 0.005 per level
    timer = Math.min(10, 5 + Math.floor((level - 1) / 10)); // Starts at 5 and increases every 10 levels up to 10
  } else if (level <= 300) {
    range = { from: level, to: level * 5 };
    quantity = { min: 9, max: 12 };
    interval = 0.5 - (level - 201) * 0.0025; // Starts at 0.5 and decreases by 0.0025 per level
    timer = Math.min(10, 5 + Math.floor((level - 1) / 10)); // Starts at 5 and increases every 10 levels up to 10
  } else if (level <= 400) {
    range = { from: level, to: level * 6 };
    quantity = { min: 12, max: 15 };
    interval = 0.25 - (level - 301) * 0.001; // Starts at 0.25 and decreases by 0.001 per level
    timer = Math.min(10, 5 + Math.floor((level - 1) / 10)); // Starts at 5 and increases every 10 levels up to 10
  } else {
    range = { from: level, to: level * 7 };
    quantity = { min: 15, max: 18 };
    interval = Math.max(0.1, 0.1 - (level - 401) * 0.0005); // Starts at 0.1 and decreases by 0.0005 per level, with a minimum of 0.1
    timer = Math.min(10, 5 + Math.floor((level - 1) / 10)); // Starts at 5 and increases every 10 levels up to 10
  }

  return {
    level,
    difficulty: {
      difficulty: "Custom",
      range,
      quantity,
      interval,
      timer
    }
  };
}) satisfies Level[]

export function getDifficulty(round: number): Difficulty {
  let range, quantity, interval, timer;

  if (round <= 50) {
    range = { from: 1, to: round * 2 };
    quantity = { min: 3, max: 5 };
    interval = 1.25 - (round - 1) * 0.025; // Starts at 1.25 and decreases by 0.025 per round
    timer = Math.min(10, Math.floor(5 + (round - 1) / 10)); // Starts at 5 and increases by 1 every 10 rounds
  } else if (round <= 100) {
    range = { from: round, to: round * 3 };
    quantity = { min: 5, max: 7 };
    interval = 1.0 - (round - 51) * 0.01; // Starts at 1.0 and decreases by 0.01 per round
    timer = Math.min(10, Math.floor(5 + (round - 50) / 10)); // Starts at 5 and increases by 1 every 10 rounds
  } else if (round <= 200) {
    range = { from: round, to: round * 4 };
    quantity = { min: 7, max: 10 };
    interval = 0.75 - (round - 101) * 0.005; // Starts at 0.75 and decreases by 0.005 per round
    timer = Math.min(10, Math.floor(5 + (round - 100) / 20)); // Starts at 5 and increases by 1 every 20 rounds
  } else if (round <= 300) {
    range = { from: round, to: round * 5 };
    quantity = { min: 9, max: 12 };
    interval = 0.5 - (round - 201) * 0.0025; // Starts at 0.5 and decreases by 0.0025 per round
    timer = Math.min(10, Math.floor(5 + (round - 200) / 20)); // Starts at 5 and increases by 1 every 20 rounds
  } else if (round <= 400) {
    range = { from: round, to: round * 6 };
    quantity = { min: 12, max: 15 };
    interval = 0.25 - (round - 301) * 0.001; // Starts at 0.25 and decreases by 0.001 per round
    timer = Math.min(10, Math.floor(5 + (round - 300) / 20)); // Starts at 5 and increases by 1 every 20 rounds
  } else {
    range = { from: round, to: round * 7 };
    quantity = { min: 15, max: 18 };
    interval = Math.max(0.1, 0.1 - (round - 401) * 0.0005); // Starts at 0.1 and decreases by 0.0005 per round, with a minimum of 0.1
    timer = Math.min(10, Math.floor(5 + (round - 400) / 20)); // Starts at 5 and increases by 1 every 20 rounds
  }

  return {
    difficulty: "Custom",
    range,
    quantity,
    interval,
    timer
  };
}



