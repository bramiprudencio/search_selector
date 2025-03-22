import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Search & Selector</h1>
      <div className="card">
        <input type="text" placeholder="What are you looking for" />
        <select name="cars" id="cars">
          <option value="volvo">All</option>
          <option value="saab">Music</option>
          <option value="mercedes">Movies</option>
          <option value="audi">Series</option>
        </select>
        <button onClick={() => search(() => {
          console.log('searching...')

        })}>
          Search
        </button>
      </div>
    </>
  )
}

export default App
