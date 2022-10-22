import { MyAction } from "./actions";

export const getAllWatchList = (payload) => {
  return { type: MyAction.GETALLWATCHLIST, payload: payload };
};
export const addToWatchList = (payload) => {
  return { type: MyAction.ADDTOWATCHLIST, payload: payload };
};
export const clearMyWatchList = (payload) => {
  return { type: MyAction.CLEARWATCHLIST, payload: payload };
};