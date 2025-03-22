import { useState } from 'react'
import './App.css'
import Result from './components/Result'

function App() {
  return (
    <>
      <h1>Search & Selector</h1>
      <div className="card">
        <input type="text" placeholder="What are you looking for" />
        <select name="filter" id="filter">
          <option value="All">All</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Series">Series</option>
        </select>
        <button onClick={() => search(() => {
          console.log('searching...')

        })}>
          Search
        </button>
      </div>
      <Result result="No results" />
    </>
  )
}

export default App
