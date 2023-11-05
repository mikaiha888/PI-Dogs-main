import axios from 'axios';
import {
    GET_ALL_BREEDS,
    SEARCH_BREED,
    GET_DETAIL,
    FILTER
} from "./action-types"

const url = "http://localhost:3001/";

export const getAllBreeds = () => {
  return async (dispatch) => {
      try {
          const { data } = await axios.get(`${url}dogs/`);
        return dispatch({
            type: GET_ALL_BREEDS,
            payload: data
        })
    } catch (error) {
        throw Error(error.message);
    }
  }
}

export const searchBreed = (query) => {
  return async (dispatch) => {
      try {
          const { data } = await axios.get(`${url}dogs/search?name=${query}`);
        return dispatch({
            type: SEARCH_BREED,
            payload: data
        })
    } catch (error) {
        throw Error(error.message);
    }
  }
}

export const getDetail = (id) => {
  return async (dispatch) => {
      try {
          const { data } = await axios.get(`${url}dogs/${id}`);
        return dispatch({
            type: GET_DETAIL,
            payload: data
        })
    } catch (error) {
        throw Error(error.message);
    }
  }
}