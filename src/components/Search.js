import { useState } from "react";

export default function Search({ setQuery }) {
    const [inputValue, setInputValue] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        setQuery(inputValue);
    }

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    }

    return(
        <form onSubmit={submitForm}>
            <input 
                type="text" className="search-input"
                onChange={handleInputValue} value={inputValue} 
            />
            <input 
                type="submit" className="submit-input"
                value="submit" 
            />
        </form>
    )
}