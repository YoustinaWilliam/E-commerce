import { TOGGLE_FAVORITE } from "../Action/FavoriteAction";

const getUserFavorites = () => {
    const userEmail = sessionStorage.getItem("userEmail");
    if (!userEmail) return [];

    return JSON.parse(localStorage.getItem(`favorites_${userEmail}`)) || [];
};

const saveUserFavorites = (favorites) => {
    const userEmail = sessionStorage.getItem("userEmail");
    if (userEmail) {
        localStorage.setItem(`favorites_${userEmail}`, JSON.stringify(favorites));
    }
};

const initialState = {
    favorites: getUserFavorites(),
};

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const exists = state.favorites.some((item) => item.id === action.payload.id);
            const updatedFavorites = exists
                ? state.favorites.filter((item) => item.id !== action.payload.id)
                : [...state.favorites, action.payload];

            saveUserFavorites(updatedFavorites);

            return { ...state, favorites: updatedFavorites };

        default:
            return state;
    }
};

export default favoriteReducer;
