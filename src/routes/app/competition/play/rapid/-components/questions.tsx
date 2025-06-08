import { useEffect, useState, useRef } from 'react'
import { Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateRapidMarathonQuestions } from '@/lib/helpers'
import { useActions, useDifficulty, useScore } from '@/components/game-modes/rapid-game/rapid-game-store'

const Questions = ({ onResult }: { onResult: (totalTime: number) => void }) => {
  const [selected, setSelected] = useState<number | null>(null)
  const score = useScore()
  const baseDifficulty = useDifficulty()!
  const [difficulty, setDifficulty] = useState(generateRapidMarathonQuestions(baseDifficulty, score))
  const { setScore, setState } = useActions()
  const [remainingTime, setRemainingTime] = useState(difficulty.duration)
  const [totalTime, setTotalTime] = useState(0)
  const timerRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number>(Date.now())

  const handleOptionClicked = (answer: number, index: number) => {
    if (selected !== null) return

    setSelected(index)

    if (answer === difficulty.correctAnswer) {
      setScore(score + 1)
      console.log('time', totalTime + (difficulty.duration - remainingTime));
      
      setTotalTime(prev => prev + (difficulty.duration - remainingTime))
      const newDifficulty = generateRapidMarathonQuestions(baseDifficulty, score + 1)
      setDifficulty(newDifficulty)
      setRemainingTime(newDifficulty.duration)
      startTimeRef.current = Date.now()
    } else {
      onResult(totalTime)
      setState('result')
    }

    setSelected(null)
  }

  useEffect(() => {
    const updateTimer = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const remaining = Math.max(difficulty.duration - elapsed, 0)
      
      setRemainingTime(Math.ceil(remaining))

      if (remaining > 0) {
        timerRef.current = requestAnimationFrame(updateTimer)
      } else {
        onResult(totalTime)
        setState('result')
      }
    }

    startTimeRef.current = Date.now()
    timerRef.current = requestAnimationFrame(updateTimer)

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current)
      }
    }
  }, [difficulty.duration, setState])

  // Calculate the circumference of the circle
  const radius = 42
  const circumference = 2 * Math.PI * radius

  return (
    <div className="w-full min-h-screen bg-background text-white flex flex-col px-4 py-6">
      {/* Header with Circular Progress */}
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 bg-card px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold shadow-md">
          <Trophy className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
          <span>{score}</span>
        </div>
        <div className="relative w-12 h-12">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="stroke-card/20"
              strokeWidth="8"
              fill="none"
              cx="50"
              cy="50"
              r={radius}
            />
            {/* Progress circle */}
            <circle
              className="stroke-primary origin-center -rotate-90"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              cx="50"
              cy="50"
              r={radius}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference * (1 - remainingTime / difficulty.duration),
                transition: 'stroke-dashoffset 0.1s linear'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
            {remainingTime}s
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-card text-center p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-3xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-snug">
            {difficulty.question}
          </h2>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full max-w-3xl mx-auto mt-6 sm:mt-8">
        {difficulty.options.map((answer, index) => {
          const isSelected = selected !== null

          return (
            <button
              key={index}
              disabled={isSelected}
              onClick={() => handleOptionClicked(answer, index)}
              className={cn(
                'text-base sm:text-lg md:text-xl lg:text-2xl font-semibold py-4 sm:py-6 px-4 rounded-2xl shadow-md transition-all duration-300 w-full focus:outline-none',
                'bg-card hover:bg-card/80 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'
              )}
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
