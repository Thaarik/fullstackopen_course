import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood=()=>{
    const totalgood = good+1
    setGood(totalgood)
  }
  const handleNeutral=()=>{
    const totalneutral = neutral+1
    setNeutral(totalneutral)
  }
  const handleBad=()=>{
    const totalbad = bad+1
    setBad(totalbad)
  }

  return (
    <>
      <h2>Give Feedback</h2>
      <Button func={handleGood} text='good'/>
      <Button func={handleNeutral} text='neutral'/>
      <Button func={handleBad} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={good+bad+neutral}  />
    </>
  )
}

export default App