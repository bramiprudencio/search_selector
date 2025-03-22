import { useState } from 'react'
import './App.css'
import Result from './components/Result'

function App() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [order, setOrder] = useState("az");

  const api = 'https://itunes.apple.com/search?country=BO&term='

  function search() {
    fetch(`${api}${input}&media=${filter}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults([]); // Clear results
        if (order === "az") data.results.sort((a, b) => a.trackName.localeCompare(b.trackName));
        else data.results.sort((a, b) => b.trackName.localeCompare(a.trackName));
        setResults(data.results); // Store results in state
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  return (
    <>
      <h1>Search & Selector</h1>
      <div>
        <input id='input' type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What are you looking for?" />
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="podcast">Podcasts</option>
          <option value="music">Music</option>
          <option value="musicVideo">Music videos</option>
          <option value="audiobook">Audiobooks</option>
          <option value="shortFilm">Short FIlms</option>
          <option value="tvShow">TV shows</option>
          <option value="software">Software</option>
          <option value="eBook">eBooks</option>
        </select>
        <button onClick={search}>Search</button>
      </div>
      <div hidden={results.length === 0}>
        <label htmlFor="order">Order by:</label>
        <select id="order" value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>
      <div id="results" className="results">
        {results.map((result, index) => (<Result key={index} data={result} />))}
      </div>
    </>
  )
}

export default App
