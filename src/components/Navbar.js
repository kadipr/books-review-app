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
                    <p>All books</p>
                    <p>To be read</p>
                    <p>5 stars</p>
                    <p>4 stars</p>
                    <p>3 stars</p>
                    <p>2 stars</p>
                    <p>1 stars</p>
                </div>
            </nav>
        </header>
    )
}