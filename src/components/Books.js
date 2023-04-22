export default function Books({ searchResult }) {
    const togglePopup = (e) => {

        // dodac kod, w przypadku gdy nie ma img
        const popupDiv = e.target.parentNode.parentNode.children[1];
        if (!popupDiv.classList.contains("show")) {
            // usunac wszystkie kalsy show z inncyh div
        }

        popupDiv.classList.toggle("show");
    }

    const resultArr = searchResult.items;
    // console.log(resultArr)

    return (
        <div className="books-container">
            {resultArr !== undefined ? resultArr.map(el => {
                return (
                    // zmienic klucz
                    <div>
                        <div onClick={togglePopup} className="book"><img src={el.volumeInfo.imageLinks?.thumbnail} alt={el.volumeInfo.title} /></div>
                        <div className="info-popup">
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