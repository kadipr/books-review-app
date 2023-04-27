import {NavLink} from 'react-router-dom';

export default function Navbar() {
    
    const pages = [
        {path: "/", title: "explore books"},
        {path: "/to-be-read", title: "To be read"},
        {path: "/five-stars", title: "5 stars"},
        {path: "/four-stars", title: "4 stars"},
        {path: "/three-stars", title: "3 stars"},
        {path: "/two-stars", title: "2 stars"},
        {path: "/one-star", title: "1 star"},
    ] 

    const toggleNavbar = () => {
        const navbar = document.querySelector("nav");
        navbar.classList.toggle("visible");
    }

    return (
        <header>
            <div className="hamburger" onClick={toggleNavbar}>
                <div className="hamburger-part"></div>
                <div className="hamburger-part"></div>
                <div className="hamburger-part"></div>
            </div>
            <p className="page-title">All books</p>
            <nav className="visible">
                <div>
                    {pages.map(el => {
                        return <NavLink to={el.path}>{el.title}</NavLink>
                    })}
                </div>
            </nav>
        </header>
    )
}