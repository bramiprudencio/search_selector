import { useState } from 'react'
import './App.css'
import Result from './components/Result'

function App() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [order, setOrder] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAll, setIsAll] = useState(false); // Track if "All" is selected
  const [searched, setSearched] = useState(false);

  const resultsPerPage = 16;
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = isAll ? results : results.slice(indexOfFirstResult, indexOfLastResult);

  const api = 'https://itunes.apple.com/search?country=BO&limit=52&term='

  function search() {
    fetch(`${api}${input}&media=${filter}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults([]); // Clear previous results
        if (order === "az") data.results.sort((a, b) => a.trackName.localeCompare(b.trackName));
        else data.results.sort((a, b) => b.trackName.localeCompare(a.trackName));
        setResults(data.results); // Store results in state
        searched = true;
      })
      .catch((error) => console.error("Error fetching data:", error));
    setSearched(true);
  }

  function orderResults(event) {
    setOrder(event.target.value);
    if (event.target.value == "az") results.sort((a, b) => a.trackName.localeCompare(b.trackName));
    else results.sort((a, b) => b.trackName.localeCompare(a.trackName));
  }

  const showAll = () => {
    setIsAll(true);
    setCurrentPage(1); // Reset to first page if "All" is selected
  };

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
    setIsAll(false);
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
        <select id="order" value={order} onChange={orderResults}>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>
      <div hidden={results.length > 0 || !searched}>
        <h2>No results</h2>
      </div>
      <div id="results" className="results">
        {currentResults.map((result, index) => (<Result key={index} data={result} />))}
      </div>
      <div className="pagination" hidden={results.length === 0}>
        <button onClick={showAll} className={isAll ? "active" : ""}>All</button>
        {Array.from({ length: Math.ceil(results.length / resultsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={(currentPage === index + 1 && !isAll) ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </>
  )
}

export default App
