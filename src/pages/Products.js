import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../Redux/Action/FavoriteAction";
import { toggleCart } from "../Redux/Action/CartAction";
import axios from "axios";
import MyCard from "../components/MyCard";
import Confirm from "../components/Confirm";
import Button from "../components/Button"; 
import { setSearchQuery } from "../Redux/Action/SearchAction"; 

function Products() {
    const dispatch = useDispatch();

    const favorites = useSelector((state) => state.fav.favorites || []);
    const cart = useSelector((state) => state.cart.cart || []);
    const searchQuery = useSelector((state) => state.search.query || "");

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); 
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // Filtering states
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products")
            .then((response) => {
                console.log("API response:", response.data); // Add this line
                if (Array.isArray(response.data.products)) { // Adjusted to match the correct structure
                    setProducts(response.data.products);
                    setFilteredProducts(response.data.products);

                    const uniqueCategories = [...new Set(response.data.products.map((p) => p.category))];
                    setCategories(uniqueCategories);
                } else {
                    console.error("Unexpected API response:", response.data);
                    setProducts([]);
                    setFilteredProducts([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setProducts([]);
                setFilteredProducts([]);
            });
    }, []);

    // Handle search query persistence
    useEffect(() => {
        sessionStorage.setItem("searchQuery", searchQuery);
    }, [searchQuery]);

    // Apply filters
    useEffect(() => {
        let filtered = [...products];

        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        filtered = filtered.filter((product) =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, priceRange, products]);

    const handleToggleFavorite = (product) => {
        const isFavorite = favorites.some((fav) => fav.id === product.id);
        if (isFavorite) {
            setSelectedProduct(product);
            setModalType("favorite");
            setShowModal(true);
        } else {
            dispatch(toggleFavorite(product));
        }
    };

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

    const confirmRemoveItem = () => {
        if (selectedProduct) {
            if (modalType === "favorite") {
                dispatch(toggleFavorite(selectedProduct));
            } else if (modalType === "cart") {
                dispatch(toggleCart(selectedProduct));
            }
            setShowModal(false);
            setSelectedProduct(null);
        }
    };

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Products</h2>
            {/* Search Bar */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a product..."
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
            </div>

            <div className="row mb-4">
                <div className="col-md-4">
                    <label>Category:</label>
                    <select
                        className="form-control"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <label>Price Range:</label>
                    <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="1000"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    />
                    <p>Up to ${priceRange[1]}</p>
                </div>
            </div>

            <div className="row">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <MyCard
                                name={product.title}
                                img={product.thumbnail}
                                path={`/productdetails/${product.id}`}
                                price={product.price}
                                rating={product.rating}
                                stock={product.stock}
                                isFavorited={favorites.some((fav) => fav.id === product.id)}
                                onToggleFavorite={() => handleToggleFavorite(product)}
                                isInCart={cart.some((item) => item.id === product.id)}
                                onToggleCart={() => handleToggleCart(product)}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-center">No products found.</p>
                )}
            </div>

            <div className="d-flex justify-content-center mt-4">
                <Button
                    color="warning"
                    size="medium"
                    btnName="Previous"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    rounded={true}
                />
                <span className="mx-3 align-self-center">
                    Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}
                </span>
                <Button
                    color="warning"
                    size="medium"
                    btnName="Next"
                    onClick={() =>
                        setCurrentPage((prev) =>
                            prev < Math.ceil(filteredProducts.length / productsPerPage)
                                ? prev + 1
                                : prev
                        )
                    }
                    disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                    rounded={true}
                />
            </div>

            {selectedProduct && showModal && (
                <Confirm
                    show={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedProduct(null);
                    }}
                    onConfirm={confirmRemoveItem}
                    title={modalType === "cart" ? "Remove from Cart" : "Remove from Favorites"}
                    message={`Are you sure you want to remove "${selectedProduct.title}" from your ${
                        modalType === "cart" ? "cart" : "wishlist"
                    }?`}
                />
            )}
        </div>
    );
}

export default Products;
