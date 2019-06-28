import axios from "axios";

import {
  CREATE_TRADE,
  UPDATE_TRADE,
  DELETE_TRADE,
  GET_TRADE,
  TRADE_LOADING,
  GET_TRADES,
  TRADES_LOADING
} from "./types";

import { GET_ERRORS } from "./types";

// Create trade
export const createTrade = tradeData => dispatch => {
  console.log("I'm in")
  axios
    .post("/api/trades/create", tradeData)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: CREATE_TRADE,
        payload: res.data
      })
    }
    )
    //   .catch(err => console.log(err));
    .catch(error => {
      const { data } = error.response;
      dispatch({
        type: GET_ERRORS,
        payload: data
      })
    }
    );

};

// Update trade
export const updateTrade = tradeData => dispatch => {
  axios
    .patch("/api/trades/update", tradeData)
    .then(res =>
      dispatch({
        type: UPDATE_TRADE,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Delete trade
export const deleteTrade= id => dispatch => {
  axios
    .delete(`/api/trades/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TRADE,
        payload: id
      })
    )
    .catch(err => console.log(err));
};

// Get specific trade by id
export const getTrade = id => dispatch => {
  dispatch(setTradeLoading());
  axios
    .get(`/api/trades/${id}`)
    .then(res =>
      dispatch({
        type: GET_TRADE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRADE,
        payload: null
      })
    );
};

// Get all trades for specific user
export const getTrades = () => dispatch => {
  dispatch(setTradesLoading());
  axios
    .get("/api/trades")
    .then(res =>
      dispatch({
        type: GET_TRADES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRADES,
        payload: null
      })
    );
};

// trade loading
export const setTradeLoading = () => {
  return {
    type: TRADE_LOADING
  };
};

// trades loading
export const setTradesLoading = () => {
  return {
    type: TRADES_LOADING
  };
};
