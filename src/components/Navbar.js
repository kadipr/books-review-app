import {NavLink} from 'react-router-dom';

export default function Navbar() {
    return (
        <header>
            <div className="hamburger">
                <div className="hamburger-part"></div>
                <div className="hamburger-part"></div>
                <div className="hamburger-part"></div>
            </div>
            <p className="page-title">All books</p>
            <nav className="visible">
                <div>
                    <NavLink to="/">explore books</NavLink>
                    <NavLink to="/all-books">all books</NavLink>
                    <NavLink to="/to-be-read">To be read</NavLink>
                    <NavLink to="/five-stars">5 stars</NavLink>
                    <NavLink to="/four-stars">4 stars</NavLink>
                    <NavLink to="/three-stars">3 stars</NavLink>
                    <NavLink to="/two-stars">2 stars</NavLink>
                    <NavLink to="/one-star">1 star</NavLink>
                </div>
            </nav>
        </header>
    )
}