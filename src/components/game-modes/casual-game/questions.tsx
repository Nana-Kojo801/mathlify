import { useEffect, useState } from 'react'
import { useActions, useDifficulty, useQuestions } from './casual-game-store'

const Questions = () => {
  const questions = useQuestions()
  const difficulty = useDifficulty()
  const { setState } = useActions()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex > questions.length - 1) return setState('answer')

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }, 1000 * difficulty.timeInterval)

    return () => clearInterval(interval)
  }, [currentIndex, difficulty.timeInterval, questions.length, setState])

  return <p className="text-6xl font-bold">{questions[currentIndex]}</p>
}

export default Questions
