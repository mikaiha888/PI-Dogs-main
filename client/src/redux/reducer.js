import {
  GET_ALL_BREEDS,
  GET_ALL_TEMPERAMENTS,
  GET_DETAIL,
  SEARCH_BREED,
  CREATE_DOG,
  ORDER,
  FILTER,
  FETCH_ERROR,
  HANDLE_ERROR
} from "./action-types";

const initialState = {
  allBreeds: [],
  catalogue: [],
  breed: {},
  newBreed: [],
  temperaments: [],
  fetchError: null,
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
        catalogue: action.payload,
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
      const originalBreeds = [...state.allBreeds];
      return action.payload === "seleccionar"
        ? {
            ...state,
            catalogue: originalBreeds,
          }
        : {
            ...state,
            catalogue: originalBreeds.filter((breed) =>
              breed.temperaments && breed.temperaments[0]?.name
                ? breed.temperaments[0].name
                    .split(", ")
                    .includes(action.payload)
                : breed.temperament
                ? breed.temperament.split(", ").includes(action.payload)
                : false
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

    case FETCH_ERROR:
      return {
        ...state,
        fetchError: [action.payload],
      };

    case HANDLE_ERROR:
      return {
        ...state,
        fetchError: state.fetchError.slice(1),
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
