import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Books from "./components/Books";
import "./App.css";
import "./css/Navbar.css";
import "./css/Search.css";
import "./css/Books.css";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [query, setQuery] = useState("");
  
  // books shown on a specific page
  const [searchResult, setSearchResult] = useState([]); 
  const [books, setBooks] = useState([[],[],[],[],[],[]]);

  const routesParams = [
    {
      path: "/",
      isMainPage: true,
      itemsInCategory: searchResult
    },
    {
      path: "/to-be-read",
      isMainPage: false,
      itemsInCategory: searchResult
    },
    {
      path: "/one-star",
      isMainPage: false,
      itemsInCategory: searchResult
    },
    {
      path: "/two-stars",
      isMainPage: false,
      itemsInCategory: searchResult
    },
    {
      path: "/three-stars",
      isMainPage: false,
      itemsInCategory: searchResult
    },
    {
      path: "/four-stars",
      isMainPage: false,
      itemsInCategory: searchResult
    },
    {
      path: "/five-stars",
      isMainPage: false,
      itemsInCategory: searchResult
    }
  ]

  const API_Key = process.env.REACT_APP_KEY;

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_Key}`)
      .then(res => res.json())
      .then(data => {
        setSearchResult(data);
      })
      .catch(err => console.log(err))
  }, [query, API_Key])

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main>
          <Search setQuery={setQuery} />
          
          <Routes>
            {routesParams.map((el, idx) => {
              return (
                <Route path={el.path} element={<Books
                  itemsInCategory={el.itemsInCategory} 
                  isMainPage={el.isMainPage}
                  books={books}
                  setBooks={setBooks}
                  API_Key={API_Key}
                  categoryIdx={idx - 1}
                />}/>
              )
            })}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
