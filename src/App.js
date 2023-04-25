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
  // uporzadkowac usestate'y
  const [query, setQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [idsOfBooks, setIdsOfBooks] = useState([[],[],[],[],[],[]]);
  const [books, setBooks] = useState([[],[],[],[],[],[]]);
  // const [booksInCategory, setBooksInCategory] = useState([]);
  // const [categoryName, setCategoryName] = useState("");
  const [currentID, setCurrentID] = useState("");
  const [addingCategory, setAddingCategory] = useState(null);

  const routesParams = [
    {
      path: "/",
      isMainPage: true,
      searchResult: searchResult
    },
    {
      path: "/to-be-read",
      isMainPage: false,
      searchResult: idsOfBooks[0]
    },
    {
      path: "/one-star",
      isMainPage: false,
      searchResult: idsOfBooks[1]
    },
    {
      path: "/two-stars",
      isMainPage: false,
      searchResult: idsOfBooks[2]
    },
    {
      path: "/three-stars",
      isMainPage: false,
      searchResult: idsOfBooks[3]
    },
    {
      path: "/four-stars",
      isMainPage: false,
      searchResult: idsOfBooks[4]
    },
    {
      path: "/five-stars",
      isMainPage: false,
      searchResult: idsOfBooks[5]
    }
  ]

  // klucz
  const API_Key = "YOUR_KEY";

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_Key}`)
      .then(res => res.json())
      .then(data => {
        setSearchResult(data);
      })
      .catch(err => console.log(err))
  }, [query])

  //napisac kod, ktory bedzie fetchowal elementy od razu po dodaniu ich do danej listy (???)
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main>
          <Search 
            searchInputValue={searchInputValue} 
            setSearchInputValue={setSearchInputValue}
            query={query}
            setQuery={setQuery}
          />
          
{/* dodać route do all books (?) */}

          <Routes>
            {routesParams.map(el => {
              return (
                <Route path={el.path} element={<Books
                  searchResult={el.searchResult} 
                  idsOfBooks={idsOfBooks} 
                  setIdsOfBooks={setIdsOfBooks}
                  isMainPage={el.isMainPage}
                  books={books}
                  setBooks={setBooks}
                  currentID={currentID}
                  setCurrentID={setCurrentID}
                  API_Key={API_Key}
                  addingCategory={addingCategory}
                  setAddingCategory={setAddingCategory}
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
