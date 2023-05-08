export default function Books(props) {
    const { itemsInCategory, isMainPage, API_Key, books, setBooks, categoryIdx } = props;

    const toggleInfoPopup = (e) => {
        const popupDiv = e.target.parentNode.parentNode.children[1];

        if (!popupDiv.classList.contains("show")) {
            const selectedPopups = document.querySelectorAll('.info-popup');
            selectedPopups.forEach(el => {
                el.classList.remove('show');
            })
        }

        popupDiv.classList.toggle("show");
    }

    let resultArr = new Array(itemsInCategory.length);

    if (isMainPage) {
        resultArr = itemsInCategory.items;
    }
    
    const buttonsValues = ['to be read', '1/5', '2/5', '3/5', '4/5', '5/5'];

    const fetchBook = (bookId, categoryId) => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_Key}`)
            .then(res => res.json())
            .then(data => {
                const newArr = [...books]
                newArr[categoryId].push(data);
                setBooks(newArr);
            })
    }

    const addToCategory = (bookEl, number) => {
        if (!books[number].some(book => book.id === bookEl.id)) {
            fetchBook(bookEl.id, number);
        }         
    }

    function Book({toggleInfoPopup, bookEl, buttonsValues, addToCategory}) {
    return (
        <div>
             <div onClick={toggleInfoPopup} className="book">
                <img src={bookEl.volumeInfo?.imageLinks?.thumbnail} alt={bookEl.volumeInfo?.title} />
            </div>
             <div className="info-popup">
                 <div className="add-to-category">
                     {buttonsValues.map((btn, categoryId) => {
                        return (
                            <button onClick={() => addToCategory(bookEl, categoryId)}>{btn}</button>
                        )
                    })}
                </div>
                <p><span className="bold">title:</span> {bookEl.volumeInfo?.title}</p>
                <p><span className="bold">author:</span> {bookEl.volumeInfo?.authors}</p>
                <p><span className="bold">categories:</span> {bookEl.volumeInfo?.categories}</p>
                <p><span className="bold">publish date:</span> {bookEl.volumeInfo?.publishedDate}</p>
                <p><span className="bold">info:</span> 
                    {bookEl.volumeInfo?.description !== undefined ? bookEl.volumeInfo?.description : ''}
                </p>
            </div>
        </div>
    )
}

    return (
        <div className="books-container">
            {isMainPage ? (resultArr !== undefined ? resultArr.map(bookEl => {
                return (
                    <Book 
                        toggleInfoPopup={toggleInfoPopup}
                        bookEl={bookEl}
                        buttonsValues={buttonsValues}
                        addToCategory={addToCategory}
                    />
                )

            }): "") :  books[categoryIdx] !== undefined ? books[categoryIdx].map(bookEl => {
                return (
                    <Book 
                        toggleInfoPopup={toggleInfoPopup}
                        bookEl={bookEl}
                        buttonsValues={buttonsValues}
                        addToCategory={addToCategory}
                    />
                )
            }): ""}
        </div>
    )
}