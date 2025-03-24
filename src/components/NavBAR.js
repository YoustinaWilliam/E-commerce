import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBAR() {
    const favorites = useSelector((state) => state.fav.favorites || []);
    const cart = useSelector((state) => state.cart.cart || []);
    const favoritesCount = favorites.length;
    const cartCount = cart.length;

    const history = useHistory();
    const isLoggedIn = sessionStorage.getItem("userEmail") !== null;
    const isAdmin = sessionStorage.getItem("isAdmin") === "1";

    const handleLogout = () => {
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("isAdmin");
        history.push("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <i className="fas fa-shopping-cart me-2"></i>
                    Ecommerce
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button
                                    className="nav-link btn btn-link text-danger"
                                    onClick={handleLogout}
                                    style={{ border: "none", background: "none", cursor: "pointer" }}>
                                    Logout
                                </button>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorites">
                                Wishlist
                                {favoritesCount > 0 && (
                                    <span className="badge bg-danger ms-2">{favoritesCount}</span>
                                )}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link position-relative" to="/shoppingcart">
                                <i className="fa-solid fa-cart-shopping"></i>
                                {cartCount > 0 && (
                                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link position-relative" to="/admin">
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBAR;
