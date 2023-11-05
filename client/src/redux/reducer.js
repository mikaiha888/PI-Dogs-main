import { 
    GET_ALL_BREEDS,
    GET_DETAIL,
    SEARCH_BREED,
} from "./action-types";

const initialState = {
    allBreeds: [],
    breed: {}
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
        case GET_DETAIL:
            return {
                ...state,
                breed: action.payload
            }
    
        default:
            return {
                ...state,
            }
    }
}

export default reducer;