import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Books from "./components/Books";
import "./App.css";
import "./css/Navbar.css";
import "./css/Search.css";
import "./css/Books.css";
import { useState, useEffect } from "react";


function App() {
  const [query, setQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);


  // klucz
  const API_Key = "";

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputValue}&key=${API_Key}`)
      .then(res => res.json())
      .then(data => setSearchResult(data))
      .catch(err => console.log(err))
  }, [query])
  

  return (
    <div className="App">
      <Navbar />
      <main>
        <Search 
          searchInputValue={searchInputValue} 
          setSearchInputValue={setSearchInputValue}
          query={query}
          setQuery={setQuery}
        />
        <Books searchResult={searchResult} />
      </main>
    </div>
  );
}

export default App;
