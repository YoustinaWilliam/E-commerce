import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../Redux/Action/FavoriteAction";
import { toggleCart } from "../Redux/Action/CartAction";
import axios from "axios";
import ProductImages from "../components/ProductImages.js";
import ProductInfo from "../components/ProductInfo";
import ProductReviews from "../components/ProductReviews";
import Button from "../components/Button";
import Confirm from "../components/Confirm";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showFavoriteModal, setShowFavoriteModal] = useState(false);

    const favorites = useSelector((state) => state.fav.favorites || []);
    const cart = useSelector((state) => state.cart.cart || []);

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                console.log("Product details:", response.data);
                setProduct(response.data);
            })
            .catch((err) => console.error("Error fetching product details:", err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const isInCart = cart.some((item) => item.id === product.id);
    const isFavorite = favorites.some((fav) => fav.id === product.id);

    const handleToggleCart = () => {
        if (isInCart) {
            setShowCartModal(true);
        } else {
            dispatch(toggleCart(product));
        }
    };

    const confirmRemoveFromCart = () => {
        dispatch(toggleCart(product));
        setShowCartModal(false);
    };

    const handleToggleFavorite = () => {
        if (isFavorite) {
            setShowFavoriteModal(true);
        } else {
            dispatch(toggleFavorite(product));
        }
    };

    const confirmRemoveFromFavorites = () => {
        dispatch(toggleFavorite(product));
        setShowFavoriteModal(false);
    };

    const handleBuyNow = () => {
        history.push("/buy", { product });
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-6">
                    <ProductImages images={product.images} thumbnail={product.thumbnail} title={product.title} />
                </div>
                <div className="col-md-6">
                    <ProductInfo product={product} />
                    <div className="d-flex mt-3 gap-3">
                        <Button
                            color="warning"
                            size="large"
                            btnName={<><i className="fa-solid fa-cart-shopping"></i> {isInCart ? "Remove from Cart" : "Add to Cart"} </>}
                            rounded={true}
                            onClick={handleToggleCart}
                        />
                        <Button
                            color="warning"
                            size="large"
                            btnName={<>
                                <i className={isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                            </>}
                            rounded={true}
                            onClick={handleToggleFavorite}
                        />
                        <Button
                            color="danger"
                            size="large"
                            btnName={<><i className="fa-solid fa-rocket"></i> Buy Now </>}
                            rounded={true}
                            onClick={handleBuyNow}
                        />
                    </div>
                </div>
            </div>
            <ProductReviews reviews={product.reviews} />
            <Confirm
                show={showCartModal}
                onClose={() => setShowCartModal(false)}
                onConfirm={confirmRemoveFromCart}
                title="Remove from Cart"
                message={`Are you sure you want to remove "${product.title}" from your cart?`}
            />
            <Confirm
                show={showFavoriteModal}
                onClose={() => setShowFavoriteModal(false)}
                onConfirm={confirmRemoveFromFavorites}
                title="Remove from Favorites"
                message={`Are you sure you want to remove "${product.title}" from your wishlist?`}
            />
        </div>
    );
}

export default ProductDetails;
