import { useSelector, useDispatch } from "react-redux";
import { toggleCart, clearCart } from "../Redux/Action/CartAction";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Button from "../components/Button";
import Confirm from "../components/Confirm";

function Buy() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart || []);
    const history = useHistory();
    const location = useLocation();

    const [cartItems, setCartItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let updatedCart = [...cart];

        if (location.state && location.state.product) {
            const selectedProduct = { ...location.state.product, quantity: 1 };
            if (!updatedCart.find((item) => item.id === selectedProduct.id)) {
                updatedCart.push(selectedProduct);
            }
        }
        setCartItems(updatedCart);
    }, [location.state, cart]);

    const handleQuantityChange = (productId, newQuantity) => {
        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock)) }
                    : item
            )
        );
    };

    const handleRemoveFromCart = (product) => {
        setSelectedProduct(product);
        setShowConfirmModal(true);
    };

    const confirmRemoveFromCart = () => {
        if (selectedProduct) {
            dispatch(toggleCart(selectedProduct));
            setCartItems((prevCart) => prevCart.filter((item) => item.id !== selectedProduct.id));
            setShowConfirmModal(false);
            setSelectedProduct(null);
        }
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.quantity * Number(item.price),
        0
    );

    const handleConfirmOrder = () => {
        if (cartItems.length === 0) return;

        const outOfStockItems = cartItems.filter(item => item.quantity > item.stock);

        if (outOfStockItems.length > 0) {
            setErrorMessage(`The following items exceed available stock:\n` + 
                outOfStockItems.map(item => `${item.title}: Max ${item.stock} available`).join("\n"));
            return;
        }

        setErrorMessage("");

        const updateStockRequests = cartItems.map((item) => {
            return fetch(`https://dummyjson.com/products/${item.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stock: item.stock - item.quantity,
                }),
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error updating stock:", error));
        });

        Promise.all(updateStockRequests)
            .then(() => {
                dispatch(clearCart());
                setCartItems([]);
                setShowAlert(true);

                setTimeout(() => {
                    setShowAlert(false);
                    history.push("/");
                }, 3000);
            })
            .catch((error) => console.error("Error processing order:", error));
    };

    return (
        <div className="container my-4">
            <h2>Your Cart</h2>
            {showAlert && <div className="alert alert-success">Order placed successfully!</div>} 
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>${Number(item.price).toFixed(2)}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.quantity || 1}
                                        min="1"
                                        max={item.stock}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        className="form-control"
                                        style={{ width: "80px" }}
                                    />
                                </td>
                                <td>${(item.quantity * Number(item.price)).toFixed(2)}</td>
                                <td>
                                    <Button
                                        color="danger"
                                        size="small"
                                        btnName="Remove"
                                        onClick={() => handleRemoveFromCart(item)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <h4>Total: ${totalPrice.toFixed(2)}</h4>
            <Button color="success" size="large" btnName="Confirm Order" onClick={handleConfirmOrder} />

            {selectedProduct && showConfirmModal && (
                <Confirm
                    show={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={confirmRemoveFromCart}
                    title="Remove from Cart"
                    message={`Are you sure you want to remove "${selectedProduct.title}" from your cart?`}
                />
            )}
        </div>
    );
}

export default Buy;
