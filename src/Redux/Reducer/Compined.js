import { combineReducers } from "redux";
import cartReducer from "./CartItems"; 
import favoritesReducer from "./Favorite";
import searchReducer from "./Search"; 

export default combineReducers({
    cart: cartReducer,  
    fav: favoritesReducer,
    search: searchReducer 
});
