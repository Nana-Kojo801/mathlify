import { useState } from 'react'
import FindRapidMatch from './find-rapid-match'
import Play from './play'

const Rapid = () => {
  const [rapidState, setRapidState] = useState<'searching' | 'playing'>(
    'searching',
  )

  return (
    <>
      {rapidState === 'searching' && (
        <FindRapidMatch setRapidState={setRapidState} />
      )}
      {rapidState === 'playing' && <Play setRapidState={setRapidState} />}
    </>
  )
}

export default Rapid
