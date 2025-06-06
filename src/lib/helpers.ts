import type { CasualGameDifficulty, SpeedSolveDifficulty } from "@/types"

export const generateSpeedSolveMarathonQuestions = (difficulty: SpeedSolveDifficulty, score: number) => {
  const duration = Math.max(difficulty.duration - Math.log2(score + 1), 3) // Minimum 3 seconds

  // Scale difficulty based on score
  const scaledDifficulty: SpeedSolveDifficulty = {
    range: {
      min: difficulty.range.min,
      max: Math.min(difficulty.range.max + Math.floor(score / 5), 100), // Increase max by 1 every 5 points, cap at 100
    },
    quantity: {
      min: Math.min(difficulty.quantity.min + Math.floor(score / 10), 8), // Increase min by 1 every 10 points, cap at 8
      max: Math.min(difficulty.quantity.max + Math.floor(score / 10), 12), // Increase max by 1 every 10 points, cap at 12
    },
    duration: difficulty.duration, // Keep the base duration from the difficulty
  }

  // Generate the question using the scaled difficulty
  const question = generateSpeedSolveQuestions(scaledDifficulty)

  return {
    ...question,
    duration, // Override with the calculated duration for this specific question
  }
}

export const calculateSpeedSolveMarathonScore = (totalTime: number, score: number) => {
  if (score === 0) return 0  // No points if no questions answered

  // Base score: 100 points per question answered
  const baseScore = score * 100

  // Time penalty: Longer total time reduces score
  // Using average time per question to scale penalty
  const averageTimePerQuestion = totalTime / score
  const timePenalty = Math.max(0, averageTimePerQuestion - 3) * 10

  // Final score calculation
  return Math.max(0, Math.round(baseScore - timePenalty))
}

export const generateSpeedSolveQuestions = (
  difficulty: SpeedSolveDifficulty,
) => {
  const { range, quantity } = difficulty!
  const operators = ['+', '-']
  const numTerms =
    Math.floor(Math.random() * (quantity.max - quantity.min + 1)) + quantity.min

  let question = ''
  let result = 0

  for (let i = 0; i < numTerms; i++) {
    const num =
      Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
    const operator = i === 0 ? '' : operators[Math.floor(Math.random() * 2)]

    if (operator === '-') result -= num
    else result += num

    question += `${operator} ${num} `
  }

  question = question.trim()

  // Generate options
  const options = new Set([result])
  while (options.size < 4) {
    options.add(result + (Math.floor(Math.random() * 11) - 5)) // Slight variation for distractors
  }

  return {
    question,
    correctAnswer: result,
    options: [...options].sort(() => Math.random() - 0.5), // Shuffle options
  }
}

export const generateCasualGameQuestions = (
  difficulty: CasualGameDifficulty,
): number[] => {
  const { range, quantity } = difficulty!
  const length =
    Math.floor(Math.random() * (quantity.max - quantity.min + 1)) + quantity.min

  const questions: number[] = []
  const possibleNumbers: number[] = []

  for (let i = range.min; i <= range.max; i++) {
    possibleNumbers.push(i, -i)
  }

  while (questions.length < length) {
    const num =
      possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)]

    if (questions.length === 0 || num !== questions[questions.length - 1]) {
      questions.push(num)
    }
  }

  return questions
}

export const generateCasualGameDifficultyWithRound = (round: number) => {
  return {
    range: {
      min: 1,
      max: Math.min(10 + round * 2, 100), // Caps at 100
    },
    quantity: {
      min: Math.min(2 + Math.floor(round / 5), 10), // Increases every 5 rounds, max 10
      max: Math.min(4 + Math.floor(round / 5), 15), // Slightly higher max limit
    },
    timeInterval: Math.max(3 - round * 0.1, 0.5), // Decreases, min 0.5s
    duration: Math.max(10 - round * 0.5, 3), // Decreases, min 3s
  }
}

export const calculateCasualCompetitionScore = (averageTime: number, round: number) => {
  if (round === 0) return 0 // Prevent division by zero

  // Base score: The higher the round, the more points
  const baseScore = round * 10

  // Time bonus: Faster average time gives more points (scaled inversely)
  const timeBonus = 5000 / (averageTime + 1) // +1 to avoid division by zero

  // Final score is a combination of base score and time bonus
  return Math.round(baseScore + timeBonus)
}
