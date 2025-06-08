import { Delete, Timer } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useActions, useAnswer, useDifficulty } from './flow-game-store'
import { Button } from '../../ui/button'

const CustomKeyPad = ({
  onCharacterClicked,
  onMinusClicked,
  onDeleteClicked,
}: {
  onCharacterClicked: (character: string) => void
  onMinusClicked: () => void
  onDeleteClicked: () => void
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-xs mt-4">
      {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map((key) => (
        <button
          key={key}
          className="text-2xl p-4 bg-muted rounded-lg active:bg-muted/80 shadow-md"
          onClick={() => onCharacterClicked(key)}
        >
          {key}
        </button>
      ))}
      <button
        onClick={onMinusClicked}
        className="text-2xl font-bold p-4 bg-muted rounded-lg active:bg-muted/80 shadow-md"
      >
        −
      </button>
      <button
        onClick={onDeleteClicked}
        className="p-4 bg-destructive rounded-lg active:bg-destructive/90 shadow-md flex items-center justify-center"
      >
        <Delete className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}

const Answer = ({ onResult }: { onResult: (status: "correct" | "wrong" | "timeout") => void }) => {
  const [currentAnswer, setCurrentAnswer] = useState('')
  const difficulty = useDifficulty()
  const [timer, setTimer] = useState(difficulty.duration * 100)
  const { setState, setTimeUsed } = useActions()
  const answer = useAnswer()

  const handleCharacterClicked = useCallback((character: string) => {
    setCurrentAnswer((prevAnswer) => prevAnswer.concat(character))
  }, [])

  const handleMinusClicked = useCallback(() => {
    setCurrentAnswer((prevAnswer) => {
      if (prevAnswer.startsWith('-')) {
        return prevAnswer.slice(1)
      }
      return '-'.concat(prevAnswer)
    })
  }, [])

  const handleDeleteClicked = useCallback(() => {
    setCurrentAnswer((prevAnswer) => prevAnswer.slice(0, -1))
  }, [])

  const handleSubmit = useCallback(() => {
    const remainingTime = timer;
    const timeTaken = difficulty.duration * 100 - remainingTime;
    
    if (parseInt(currentAnswer) === answer) {
      setTimeUsed(timeTaken)
      onResult("correct")
      setState('correct')
    } else {
      setState('wrong')
      onResult("wrong")
    }
  }, [answer, currentAnswer, difficulty.duration, setState, setTimeUsed, timer, onResult])

  useEffect(() => {
    if (timer <= 0) {
      setTimeUsed(difficulty.duration * 100)
      setState('timeout')
      requestAnimationFrame(() => onResult("timeout"))
      return
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 10)

    return () => clearInterval(interval)
  }, [difficulty.duration, setState, setTimeUsed, timer, onResult])

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-between px-4 py-10 text-white">
      <div className="flex items-center gap-2 text-lg font-semibold bg-muted px-4 py-2 rounded-lg">
        <Timer className="text-yellow-400 w-6 h-6" />
        <span className="text-yellow-400 text-xl">
          {(timer / 100).toFixed(2)}s
        </span>
      </div>

      {/* Answer Display */}
      <div className="w-full max-w-xs text-center bg-muted text-4xl font-bold py-3 h-16 rounded-lg shadow-md">
        {currentAnswer}
      </div>

      {/* Custom Keypad */}
      <CustomKeyPad
        onCharacterClicked={handleCharacterClicked}
        onDeleteClicked={handleDeleteClicked}
        onMinusClicked={handleMinusClicked}
      />

      <Button
        onClick={handleSubmit}
        className="w-full max-w-xs text-xl shadow-md"
      >
        Submit
      </Button>
    </div>
  )
}

export default Answer
