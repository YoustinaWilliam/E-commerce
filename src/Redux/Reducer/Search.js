// const initialState = {
//     query: "",
// };

// const searchReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "SET_SEARCH_QUERY":
//             return { ...state, query: action.payload };
//         default:
//             return state;
//     }
// };

// export default searchReducer;
import { SET_SEARCH_QUERY } from "../Action/SearchAction";

const getSearchQuery = () => {
    return sessionStorage.getItem("searchQuery") || "";
};

const saveSearchQuery = (query) => {
    sessionStorage.setItem("searchQuery", query);
};

const initialState = {
    query: getSearchQuery(),
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            saveSearchQuery(action.payload);
            return { ...state, query: action.payload };

        default:
            return state;
    }
};

export default searchReducer;
