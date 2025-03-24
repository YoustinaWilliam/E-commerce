
function Price({ price }) { 
    if (price === undefined || price === null || isNaN(price)) {
        return <span>N/A</span>; 
    }

    const validPrice = Number(price); 
    const [integerPart, decimalPart] = validPrice.toFixed(2).split('.');

    return (
        <div className="d-flex align-items-baseline">
            <p className="m-0 price-currency">EGP</p> 
            <h1 className="m-0 price-integer">{integerPart}</h1>
            <p className="m-0 price-decimal">.{decimalPart}</p>
        </div>
    );
}

export default Price;
