import {
  GET_ALL_BREEDS,
  GET_ALL_TEMPERAMENTS,
  GET_DETAIL,
  SEARCH_BREED,
  CREATE_DOG,
  ORDER,
  FILTER,
} from "./action-types";

const initialState = {
  allBreeds: [],
  catalogue: [],
  breed: {},
  newBreed: [],
  temperaments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS:
      return {
        ...state,
        allBreeds: action.payload,
        catalogue: action.payload,
      };

    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case SEARCH_BREED:
      return {
        ...state,
        allBreeds: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        breed: action.payload,
      };

    case CREATE_DOG:
      return {
        ...state,
        newBreed: action.payload,
      };

    case FILTER:
      action.payload === "seleccionar" && {
        ...state,
        catalogue: [...state.allBreeds],
      };
      return {
        ...state,
        catalogue: [...state.allBreeds].filter(
          (breed) =>
            breed.temperaments[0]["name"]
              .split(", ")
              .includes(action.payload) || breed.temperamnt
        ),
      };

    case ORDER:
      action.payload === "seleccionar" && {
        ...state,
        catalogue: [...state.allBreeds],
      };
      const sortedBreeds =
        action.payload === "a-z"
          ? [...state.catalogue].sort((a, b) => a.name.localeCompare(b.name))
          : [...state.catalogue].sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        catalogue: sortedBreeds,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
