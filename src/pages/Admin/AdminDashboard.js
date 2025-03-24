import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../Redux/Action/SearchAction";
import ProductTable from "../../components/ProductTable";
import ProductForm from "../../components/ProductForm";

const API_URL = "https://dummyjson.com/products/";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query || "");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, products]);

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من الحذف؟")) {
      fetch(`${API_URL}${id}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            setProducts(products.filter((p) => p.id !== id));
          } else {
            console.error("Error deleting product");
          }
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  const handleSave = (product) => {
    const method = product.id ? "PUT" : "POST";
    const url = product.id ? `${API_URL}${product.id}` : API_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save product!");
        return res.json();
      })
      .then((data) => {
        setProducts((prev) =>
          product.id ? prev.map((p) => (p.id === product.id ? data : p)) : [...prev, data]
        );
        setShowModal(false);
      })
      .catch((error) => console.error("Error saving product:", error));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3 d-flex justify-content-center align-items-center">
        <Col xs={12}>
          <h2 className="text-center">Dashboard</h2>
        </Col>
        <Col xs={12} md={6} className="text-end">
          <Button variant="success" onClick={() => { setEditProduct(null); setShowModal(true); }}>
            + Add Product
          </Button>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search for a product..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </Col>
      </Row>

      <ProductTable products={currentProducts} onEdit={setEditProduct} onDelete={handleDelete} setShowModal={setShowModal} />

      <div className="d-flex justify-content-center mt-4">
        <Button variant="secondary" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="mx-3 align-self-center">
          Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}
        </span>
        <Button variant="secondary" onClick={nextPage} disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}>
          Next
        </Button>
      </div>

      {showModal && (
        <ProductForm 
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          handleSave={handleSave} 
          product={editProduct} 
        />
      )}
    </Container>
  );
};

export default AdminDashboard;
