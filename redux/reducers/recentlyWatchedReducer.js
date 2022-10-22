import { MyAction } from "../actions/actions";

export const recentlyWatchedReducer = (state = [], action) => {
  switch (action.type) {
    case MyAction.ADDTOWATCHLIST:
      return [...state.filter(item => item.id !== action.payload.id), action.payload].reverse();
    case MyAction.CLEARWATCHLIST:
      return state = []
    case MyAction.GETALLWATCHLIST:
      return action.payload;
    default:
      return state;
  }
};
