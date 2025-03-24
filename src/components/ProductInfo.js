function ProductInfo({ product }) {
    const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

    return (
        <>
            <h2>{product.title}</h2>
            <p className="text-muted">{product.description}</p>
            
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>SKU:</strong> {product.sku}</p>

            <p>
                <strong>Price:</strong> <del>${product.price}</del> 
                <span className="text-success"> ${discountedPrice}</span>
                <span className="badge bg-danger ms-2">-{product.discountPercentage}%</span>
            </p>

            <p>
                <strong>Stock:</strong> {product.stock} ({product.availabilityStatus})
            </p>

            <p><strong>Weight:</strong> {product.weight}g</p>
            <p><strong>Dimensions:</strong> {product.dimensions?.width}cm x {product.dimensions?.height}cm x {product.dimensions?.depth}cm</p>

            <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
            <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
            <p><strong>Shipping:</strong> {product.shippingInformation}</p>
        </>
    );
}

export default ProductInfo;
// function ProductInfo({ product }) {
//     return (
//         <>
//             <h2>{product.title}</h2>
//             <p className="text-muted">{product.description}</p>
            
//             <p><strong>Category:</strong> {product.category}</p>
//             <p><strong>Price:</strong> ${product.price}</p>
//             <p><strong>Stock:</strong> {product.stock}</p>
//             <p><strong>Rating:</strong> {product.rating}</p>
//         </>
//     );
// }

// export default ProductInfo;