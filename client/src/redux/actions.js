import axios from "axios";
import {
  GET_ALL_BREEDS,
  GET_ALL_TEMPERAMENTS,
  SEARCH_BREED,
  GET_DETAIL,
  CREATE_DOG,
  FILTER,
  FILTER_BY_DB_API,
  ORDER,
  FETCH_ERROR,
  HANDLE_ERROR,
  HANDLE_WEIGHT,
} from "./action-types";

const URL = "http://localhost:3001";

export const getAllBreeds = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/dogs`);
      dispatch({
        type: GET_ALL_BREEDS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

export const getAllTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/temperaments`);
      dispatch({
        type: GET_ALL_TEMPERAMENTS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

export const searchBreed = (query) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/dogs/search?name=${query}`);
      dispatch({
        type: SEARCH_BREED,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/dogs/${id}`);
      dispatch({
        type: GET_DETAIL,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

export const createDog = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/dogs`, body);
      dispatch({
        type: CREATE_DOG,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

export const filterCards = (data) => {
  return {
    type: FILTER,
    payload: data,
  };
};

export const filterCardsByDbOrApi = (method) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL}/dogs/filter?filter=${method === "Base de datos" ? "db" : "api"}`
      );
      dispatch({
        type: FILTER_BY_DB_API,
        payload: { breeds: data, method: method === "Base de datos" ? "db" : "api" },
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

export const orderCards = (order) => {
  return { type: ORDER, payload: order };
};

export const handleError = () => ({
  type: HANDLE_ERROR,
});

export const handleWeight = (weight) => {
  return { type: HANDLE_WEIGHT, payload: weight };
};
