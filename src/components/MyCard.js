import { Link } from "react-router-dom";
import Price from "../components/Price";
import Button from "../components/Button"; 

function MyCard(props) {
    return (
        <div className="card h-100 shadow-sm">
            <img
                src={props.img}
                className="card-img-top p-3 lazy-load"
                alt={props.name}
                style={{ height: "150px", objectFit: "contain" }}
                loading="lazy"
            />

            <div className="card-body">
                <h5 className="card-title text-truncate">{props.name}</h5>
                <p className="card-text small text-muted">
                    {props.name.substring(0, 50)}...
                </p>

                <div className="d-flex align-items-center mb-2">
                    <span className="text-warning me-2">
                        <i className="bi bi-star-fill"></i> {props.rating}
                    </span>
                    <span className="text-muted small">
                        ({props.stock} reviews)
                    </span>
                </div>

                <Price price={props.price} />

                <p className="text-muted small">
                    EGP 28.00 delivery Tomorrow, 1 Jan
                    <br /> Or fastest delivery Today by 11 PM
                </p>

                <p className="text-danger fw-bold small">
                     {typeof props.stock === "number" && props.stock > 0 
                            ? `Only ${props.stock} left in stock - order soon.` : "Out of stock"}
                </p>


                <div className="d-flex align-items-center">
                    <Button
                        color="warning"
                        size="medium"
                        btnName={props.isInCart ? "Remove from Cart" : "Add to Cart"}
                        rounded={true}
                        onClick={props.onToggleCart} 
                        className="text-dark fw-bold ShopingCart"
                        style={{ borderRadius: "30px" }}
                    />

                    <Button
                        color=""
                        size=""
                        icon={<i className={props.isFavorited ? "fa-solid fa-star text-warning" : "fa-regular fa-star text-dark"}></i>}
                        style={{ border: "none", background: "transparent", fontSize: "1.5rem" }}
                        onClick={props.onToggleFavorite}
                    />
                </div>

                {props.path && (
                    <Link to={props.path} className="btn btn-danger mt-2 w-100">
                        View Details
                    </Link>
                )}
            </div>
        </div>
    );
}

export default MyCard;
