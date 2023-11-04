import { 
    GET_ALL_BREEDS,
    SEARCH_BREED,
} from "./action-types";

const initialState = {
    allBreeds: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BREEDS:
            return {
                ...state,
                allBreeds: action.payload
            }
    
        case SEARCH_BREED:
            return {
                ...state,
                allBreeds: action.payload
            }
    
        default:
            return {
                ...state,
            }
    }
}

export default reducer;