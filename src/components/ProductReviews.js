function ProductReviews({ reviews }) {
    return (
        <div className="mt-5">
            <h4>Customer Reviews</h4>
            {reviews?.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="border p-3 mb-3 rounded">
                        <p><strong>{review.reviewerName}</strong> <span className="text-muted">({review.reviewerEmail})</span></p>
                        <p>
                            {[...Array(review.rating)].map((_, i) => (
                                <i key={i} className="bi bi-star-fill text-warning"></i>
                            ))}
                        </p>

                        <p>{review.comment}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
}

export default ProductReviews;
