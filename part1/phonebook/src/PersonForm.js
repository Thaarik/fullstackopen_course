import React from 'react'

const PersonForm = ({name,number,submit,valueName,valueNumber}) => {
  return (
    <form>
        <div>
          name: <input onChange={name} value={valueName}/>
        </div>
        <div>
          number: <input onChange={number} value={valueNumber}/>
        </div>
        <div>
          <button type="submit" onClick={submit}>
            add
          </button>
        </div>
      </form>
  )
}

export default PersonForm
