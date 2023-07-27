import React from 'react'

const Button = ({func,text}) => {
  return (
    <div>
      <button onClick={func}>{text}</button>
    </div>
  )
}

export default Button
