export default function Search({ searchInputValue, setSearchInputValue, query, setQuery }) {

    const submitForm = (e) => {
        e.preventDefault();
        setQuery(e.target.children[0].value)
    }

    const handleInputValue = (e) => {
        setSearchInputValue(e.target.value)
    }

    return(
        <form onSubmit={submitForm}>
            <input 
                onChange={handleInputValue} className="search-input" 
                type="text" value={searchInputValue} 
            />
            <input className="submit-input" type="submit" value="submit" />
        </form>
    )
}