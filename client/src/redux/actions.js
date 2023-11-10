import axios from "axios";
import {
  GET_ALL_BREEDS,
  SEARCH_BREED,
  GET_DETAIL,
  CREATE_DOG,
  FILTER,
  ORDER,
  GET_ALL_TEMPERAMENTS,
  FETCH_ERROR
} from "./action-types";

const URL = "http://localhost:3001";

export const getAllBreeds = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/dogs`);
      return dispatch({
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
      return dispatch({
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
      return dispatch({
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
      return dispatch({
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
      return dispatch({
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
  try {
    return {
      type: FILTER,
      payload: data,
    };
  } catch (error) {
    dispatch({
      type: FETCH_ERROR,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const orderCards = (order) => {
  try {
    return { type: ORDER, payload: order };
  } catch (error) {
    dispatch({
      type: FETCH_ERROR,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
