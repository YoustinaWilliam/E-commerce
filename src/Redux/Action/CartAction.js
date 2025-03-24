export const TOGGLE_CART = "TOGGLE_CART";
export const CLEAR_CART = "CLEAR_CART"; 

export const toggleCart = (product) => {
    return {
        type: TOGGLE_CART,
        payload: product
    };
};

export const clearCart = () => {
    return {
        type: CLEAR_CART
    };
};
