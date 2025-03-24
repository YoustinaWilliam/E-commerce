// export const toggleSearch = (payload) => {
//     return {
//         type: "TOGGLE_SEARCH",
//         payload
//     }
// }
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

export const setSearchQuery = (query) => {
    return {
        type: SET_SEARCH_QUERY,
        payload: query
    };
};
