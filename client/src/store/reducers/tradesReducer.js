import {
  CREATE_TRADE,
  UPDATE_TRADE,
  DELETE_TRADE,
  GET_TRADE,
  TRADE_LOADING,
  GET_TRADES,
  TRADES_LOADING
} from "../actions/types";

const initialState = {
  trades: [],
  trade: [],
  tradeLoading: false,
  tradesLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TRADE:
      return {
        ...state,
        trades: [action.payload, ...state.trades]
      };
    case UPDATE_TRADE:
      let index = state.trades.findIndex(
        trade => trade._id === action.payload._id
      );

      state.trades.splice(index, 1);

      return {
        ...state,
        trades: [action.payload, ...state.trades]
      };
    case DELETE_TRADE:
      return {
        ...state,
        trades: state.trades.filter(
          trade => trade._id !== action.payload
        )
      };
    case GET_TRADE:
      return {
        ...state,
        trade: action.payload,
        tradeLoading: false
      };
    case GET_TRADES:
      return {
        ...state,
        trades: action.payload,
        tradesLoading: false
      };
    case TRADE_LOADING:
      return {
        ...state,
        tradeLoading: true
      };
    case TRADES_LOADING:
      return {
        ...state,
        tradesLoading: true
      };
    default:
      return state;
  }
}
