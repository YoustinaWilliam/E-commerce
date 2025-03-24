
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../Redux/Action/CartAction";
import { toggleFavorite } from "../Redux/Action/FavoriteAction";
import { Link, useHistory } from "react-router-dom"; 
import MyCard from "../components/MyCard";
import Confirm from "../components/Confirm";
import Button from "../components/Button";

function ShoppingCart() {
    const history = useHistory(); 
    const isLoggedIn = sessionStorage.getItem("userEmail"); 
    const cart = useSelector((state) => state.cart.cart || []);
    const favorites = useSelector((state) => state.fav.favorites || []);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); 
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleToggleCart = (product) => {
        const isInCart = cart.some((item) => item.id === product.id);
        if (isInCart) {
            setSelectedProduct(product);
            setModalType("cart");
            setShowModal(true);
        } else {
            dispatch(toggleCart(product));
        }
    };

    const handleToggleFavorite = (product) => {
        const isFavorited = favorites.some((item) => item.id === product.id);
        if (isFavorited) {
            setSelectedProduct(product);
            setModalType("favorite");
            setShowModal(true);
        } else {
            dispatch(toggleFavorite(product));
        }
    };

    const confirmRemoveItem = () => {
        if (selectedProduct) {
            if (modalType === "cart") {
                dispatch(toggleCart(selectedProduct));
            } else if (modalType === "favorite") {
                dispatch(toggleFavorite(selectedProduct));
            }
            setShowModal(false);
            setSelectedProduct(null);
        }
    };

    const handleBuyNow = () => {
        if (!isLoggedIn) {
            history.push(`/login?redirect=/buy`);
        } else {
            history.push("/buy");
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Shopping Cart</h2>

            {cart.length === 0 ? (
                <p className="text-center">Your shopping cart is empty.</p>
            ) : (
                <div className="row">
                    {cart.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <MyCard
                                name={product.title}
                                img={product.thumbnail}
                                path={`/productdetails/${product.id}`}
                                price={product.price}
                                rating={product.rating}
                                stock={product.stock}
                                isInCart={true}
                                onToggleCart={() => handleToggleCart(product)}
                                isFavorited={favorites.some((item) => item.id === product.id)}
                                onToggleFavorite={() => handleToggleFavorite(product)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {selectedProduct && showModal && (
                <Confirm
                    show={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedProduct(null);
                    }}
                    onConfirm={confirmRemoveItem}
                    title={`Remove from ${modalType === "cart" ? "Cart" : "Favorites"}`}
                    message={`Are you sure you want to remove "${selectedProduct.title}" from your ${modalType === "cart" ? "cart" : "wishlist"}?`}
                />
            )}

            <Button
                color="danger"
                size="large"
                btnName={<><i className="fa-solid fa-rocket"></i> Buy </>}
                rounded={true}
                onClick={handleBuyNow} 
                style={{ position: "fixed", bottom: "20px", right: "20px" }}
            />
        </div>
    );
}

export default ShoppingCart;
