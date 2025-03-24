import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProductForm = ({ show, handleClose, handleSave, product }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({ title: "", price: "", image: "", category: "", description: "", stock: "" });
    }
    setErrors({});
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === "price" || name === "stock" ? Number(value) : value 
    });
  };

  const validate = () => {
    let newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Product name is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.stock === "" || formData.stock < 0) newErrors.stock = "Stock cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      handleSave(formData);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product ? "Edit Product" : "Add New Product"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              min="0"
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image Link</Form.Label>
            <Form.Control 
              type="text" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control 
              type="text" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              isInvalid={!!errors.category}
            />
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control 
              type="number" 
              name="stock" 
              value={formData.stock} 
              onChange={handleChange} 
              min="0"
              isInvalid={!!errors.stock}
            />
            <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>
          {product ? "Save" : "Add Product"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductForm;
