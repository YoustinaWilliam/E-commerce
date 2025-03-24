import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../Redux/Action/FavoriteAction";
import { toggleCart } from "../Redux/Action/CartAction"; 
import MyCard from "../components/MyCard";
import Confirm from "../components/Confirm"; 


function Favorites() {
    const favorites = useSelector((state) => state.fav.favorites || []);
    const cart = useSelector((state) => state.cart.cart || []); 
    const dispatch = useDispatch();

    const [showFavoriteModal, setShowFavoriteModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleToggleFavorite = (product) => {
        setSelectedProduct(product);
        setShowFavoriteModal(true);
    };

    const handleToggleCart = (product) => {
        if (cart.some((item) => item.id === product.id)) {
            setSelectedProduct(product);
            setShowCartModal(true);
        } else {
            dispatch(toggleCart(product));
        }
    };

    const confirmRemoveFavorite = () => {
        if (selectedProduct) {
            dispatch(toggleFavorite(selectedProduct));
            setShowFavoriteModal(false);
            setSelectedProduct(null);
        }
    };

    const confirmRemoveCart = () => {
        if (selectedProduct) {
            dispatch(toggleCart(selectedProduct));
            setShowCartModal(false);
            setSelectedProduct(null);
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Favorite Products</h2>

            {favorites.length === 0 ? (
                <p className="text-center">No favorite products added yet.</p>
            ) : (
                <div className="row">
                    {favorites.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <MyCard
                                name={product.title}
                                img={product.thumbnail}
                                path={`/productdetails/${product.id}`}
                                price={product.price}
                                rating={product.rating}
                                stock={product.stock}
                                isFavorited={true}
                                onToggleFavorite={() => handleToggleFavorite(product)} 
                                isInCart={cart.some((item) => item.id === product.id)}
                                onToggleCart={() => handleToggleCart(product)} 
                            />
                        </div>
                    ))}
                </div>
            )}

            {selectedProduct && showFavoriteModal && (
                <Confirm
                    show={showFavoriteModal}
                    onClose={() => {
                        setShowFavoriteModal(false);
                        setSelectedProduct(null);
                    }}
                    onConfirm={confirmRemoveFavorite}
                    title="Remove from Favorites"
                    message={`Are you sure you want to remove "${selectedProduct.title}" from your wishlist?`}
                />
            )}

            {selectedProduct && showCartModal && (
                <Confirm
                    show={showCartModal}
                    onClose={() => {
                        setShowCartModal(false);
                        setSelectedProduct(null);
                    }}
                    onConfirm={confirmRemoveCart}
                    title="Remove from Cart"
                    message={`Are you sure you want to remove "${selectedProduct.title}" from your cart?`}
                />
            )}
        </div>
    );
}

export default Favorites;
