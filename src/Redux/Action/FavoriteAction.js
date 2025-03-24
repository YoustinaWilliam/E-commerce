export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

export const toggleFavorite = (product) => {
    return {
        type: TOGGLE_FAVORITE,
        payload: product,
    };
};
