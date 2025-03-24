function ProductImages(props) {
    return (
        <>
            <img 
                src={props.thumbnail} 
                alt={props.title} 
                className="img-fluid mb-3"
                style={{ maxHeight: "300px", objectFit: "contain" }}
            />
            <div className="d-flex">
                {props.images?.map((img, index) => (
                    <img 
                        key={index} 
                        src={img} 
                        alt={props.title} 
                        className="img-thumbnail me-2" 
                        style={{ width: "80px", height: "80px", objectFit: "cover" }} 
                    />
                ))}
            </div>
        </>
    );
}

export default ProductImages;
