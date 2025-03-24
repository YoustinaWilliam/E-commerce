import { TOGGLE_CART, CLEAR_CART } from "../Action/CartAction";

const initialState = {
    cart: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CART:
            const itemExists = state.cart.some((item) => item.id === action.payload.id);
            return {
                ...state,
                cart: itemExists
                    ? state.cart.filter((item) => item.id !== action.payload.id) 
                    : [...state.cart, { ...action.payload, quantity: 1 }], 
            };

        case CLEAR_CART:
            return { ...state, cart: [] }; 

        default:
            return state;
    }
};

export default cartReducer;
