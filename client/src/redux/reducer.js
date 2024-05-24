import {
  GET_ALL_BREEDS,
  GET_ALL_TEMPERAMENTS,
  GET_DETAIL,
  SEARCH_BREED,
  CREATE_DOG,
  ORDER,
  FILTER,
  FETCH_ERROR,
  HANDLE_ERROR,
  HANDLE_WEIGHT,
  FILTER_BY_DB_API,
} from "./action-types";

const initialState = {
  allBreeds: [],
  catalogue: [],
  breed: {},
  newBreed: {},
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
              breed.temperament.name.split(", ").includes(action.payload)
            ),
          };

    case FILTER_BY_DB_API:
      // console.log(
      //   action.payload.filter((obtainedBreed) =>
      //     [...state.catalogue].some(
      //       (breed) => breed.name === obtainedBreed.name
      //     )
      //   )
      // );

      console.log(
        action.payload.breeds.filter((obtainedBreed) =>
          obtainedBreed.image.includes("public")
        )
      );
      return {
        ...state,
        catalogue:
          action.payload.method === "db"
            ? action.payload.breeds.filter((obtainedBreed) =>
                obtainedBreed.image.includes("public")
              )
            : action.payload.breeds,
      };

    case ORDER:
      if (action.payload === "seleccionar") {
        return {
          ...state,
          catalogue: originalBreeds,
        };
      }
      const sortedBreeds =
        action.payload === "a-z"
          ? [...state.catalogue].sort((a, b) => a.name.localeCompare(b.name))
          : [...state.catalogue].sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        catalogue: sortedBreeds,
      };

    case HANDLE_WEIGHT:
      action.payload === "seleccionar" && {
        ...state,
        catalogue: originalBreeds,
      };
      const sortedBreedsByWeight = [...state.catalogue].sort((a, b) => {
        const averageWeightA = (a.weight.min + a.weight.max || 0) / 2;
        const averageWeightB = (b.weight.min + b.weight.max || 0) / 2;

        return action.payload === "Mas liviano"
          ? averageWeightA - averageWeightB
          : averageWeightB - averageWeightA;
      });
      return {
        ...state,
        catalogue: sortedBreedsByWeight,
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
