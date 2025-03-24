import React from "react";
import { Table, Button } from "react-bootstrap";

const ProductTable = ({ products, onEdit, onDelete, setShowModal }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <img src={product.thumbnail} alt={product.title} style={{ width: "50px", height: "50px" }} />
            </td>
            <td>{product.title}</td>
            <td>{product.category}</td>
            <td>${product.price}</td>
            <td>
              <Button variant="warning" onClick={() => { onEdit(product); setShowModal(true); }}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(product.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;
