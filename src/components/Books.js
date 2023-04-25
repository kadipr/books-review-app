import { useEffect } from "react";

export default function Books({ searchResult, idsOfBooks, setIdsOfBooks, isMainPage, API_Key, books, setBooks, currentID, setCurrentID, addingCategory, setAddingCategory }) {
    const togglePopup = (e) => {
        // dodac kod, w przypadku gdy dana ksiazka nie ma img
        const popupDiv = e.target.parentNode.parentNode.children[1];

        if (!popupDiv.classList.contains("show")) {
            const selectedPopups = document.querySelectorAll('.info-popup');
            selectedPopups.forEach(el => {
                el.classList.remove('show');
            })
        }

        popupDiv.classList.toggle("show");
    }

    let resultArr = new Array(searchResult.length);

    if (isMainPage) {
        resultArr = searchResult.items;
    }
    
    const buttonsValues = ['to be read', '1/5', '2/5', '3/5', '4/5', '5/5'];

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${currentID}?key=${API_Key}`)
            .then(res => res.json())
            .then(data => {
                const newArr = [...books]
                newArr[addingCategory].push(data);
                setBooks(newArr);
            })
    }, [currentID, API_Key, setBooks, addingCategory])

    const addToCategory = (el, number) => {
        if (!idsOfBooks[number].includes(el.id)) {
            const newArr = [...idsOfBooks];
            newArr[number].push(el.id);
            setIdsOfBooks(newArr);
        }
        
        setCurrentID(el.id);
        setAddingCategory(number);
    }
        


    return (
        <div className="books-container">
            {isMainPage ? (resultArr !== undefined ? resultArr.map(el => {
                // stworzyc komponent Book
                return (
                    // zmienic klucz
                    <div>
                        <div onClick={togglePopup} className="book"><img src={el.volumeInfo.imageLinks?.thumbnail} alt={el.volumeInfo.title} /></div>
                        <div className="info-popup">
                            <div className="add-to-category">
                                {buttonsValues.map((btn, id) => {
                                    return (
                                        <button onClick={() => addToCategory(el, id)}>{buttonsValues[id]}</button>
                                    )
                                })}
                            </div>
                            <p><span className="bold">title:</span> {el.volumeInfo.title}</p>
                            <p><span className="bold">author:</span> {el.volumeInfo.authors}</p>
                            <p><span className="bold">categories:</span> {el.volumeInfo.categories}</p>
                            <p><span className="bold">publish date:</span> {el.volumeInfo.publishedDate}</p>
                            <p><span className="bold">info:</span> {el.volumeInfo.description !== undefined ? el.volumeInfo.description : ''}</p>
                        </div>
                    </div>
                )

            // zmienic indeks listy, tak aby wyswietlal sie zgodny z dana podstrona
            }): "") :  books[1] !== undefined ? books[1].map(el => {
                return (
                    // zmienic klucz
                    <div>
                        <div onClick={togglePopup} className="book"><img src={el.volumeInfo.imageLinks?.thumbnail} alt={el.volumeInfo.title} /></div>
                        <div className="info-popup">
                            <div className="add-to-category">
                                {buttonsValues.map((btn, id) => {
                                    return (
                                        <button onClick={() => addToCategory(el, id)}>{buttonsValues[id]}</button>
                                    )
                                })}
                            </div>
                            <p><span className="bold">title:</span> {el.volumeInfo.title}</p>
                            <p><span className="bold">author:</span> {el.volumeInfo.authors}</p>
                            <p><span className="bold">categories:</span> {el.volumeInfo.categories}</p>
                            <p><span className="bold">publish date:</span> {el.volumeInfo.publishedDate}</p>
                            <p><span className="bold">info:</span> {el.volumeInfo.description !== undefined ? el.volumeInfo.description : ''}</p>
                        </div>
                    </div>
                )
            }): ""}
        </div>
    )
}