import { useEffect, useState } from 'react'
import { Timer, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  useActions,
  useDifficulty,
  useQuestion,
  useScore,
  useWrongs,
} from './speed-solve-game-store'

const Questions = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const score = useScore()
  const wrongs = useWrongs()
  const question = useQuestion()!
  const difficulty = useDifficulty()!
  const { setScore, setWrongs, setState, generateQuestion } = useActions()
  const [timer, setTimer] = useState(difficulty.duration)
  const [reveal, setReveal] = useState(false)

  const handleOptionClicked = (answer: number, index: number) => {
    if (selected !== null) return

    setReveal(true)
    setSelected(index)

    if (answer === question.correctAnswer) setScore(score + 1)
    else setWrongs(wrongs + 1)

    setTimeout(() => {
      setSelected(null)
      setReveal(false)
      generateQuestion()
    }, 500)
  }

  useEffect(() => {
    if (timer <= 0) return

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  // New useEffect to safely update state
  useEffect(() => {
    if (timer === 0) {
      setState('result')
    }
  }, [timer, setState])

  return (
    <div className="w-full min-h-screen bg-background text-white flex flex-col px-4 py-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 bg-card px-5 py-3 rounded-xl text-lg font-semibold shadow-md">
          <Trophy className="text-yellow-400 w-6 h-6" />
          <span>{score}</span>
        </div>
        <div className="flex items-center gap-2 bg-card px-5 py-3 rounded-xl text-lg font-semibold shadow-md">
          <Timer className="text-red-400 w-6 h-6" />
          <span>{timer}s</span>
        </div>
      </div>

      {/* Question */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-card text-center p-6 rounded-2xl shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-snug">
            {question.question}
          </h2>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-5 w-full max-w-3xl mx-auto mt-8">
        {question.options.map((answer, index) => {
          const isCorrect = answer === question.correctAnswer
          const isSelected = selected !== null

          return (
            <button
              key={index}
              disabled={isSelected}
              onClick={() => handleOptionClicked(answer, index)}
              className={cn(
                'text-lg sm:text-xl md:text-2xl font-semibold py-6 px-4 rounded-2xl shadow-md transition-all duration-300 w-full focus:outline-none',
                reveal ? isCorrect ? 'bg-green-500' : 'bg-red-500' : 'bg-primary')}
            >
              {answer}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Questions
