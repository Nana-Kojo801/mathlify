import { useState, useMemo } from 'react'
import FindRapidMatch from './find-rapid-match'
import Play from './play'
import { useActiveRapidMatch } from '../hooks'

const Rapid = () => {
  const [rapidState, setRapidState] = useState<'searching' | 'playing'>(
    'searching',
  )
  const match = useActiveRapidMatch()
  const isInMatch = useMemo(() => (match && match.status !== "result") ?? false, [match])

  return (
    <>
      {(rapidState === 'searching' && !isInMatch) && (
        <FindRapidMatch setRapidState={setRapidState} />
      )}
      {(rapidState === 'playing' || isInMatch) && <Play setRapidState={setRapidState} />}
    </>
  )
}

export default Rapid
