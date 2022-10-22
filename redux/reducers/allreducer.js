import { themeReducer } from "./themeReducer";
import { combineReducers } from "redux";
import { asyncDataReducer } from "./asyncDataReducer";
import { loadingReducer } from "./loadingReducer";
import { myListReducer } from "./myListReducer";
import { resumeReducer } from "./resumeReducer";
import { recentlyWatchedReducer } from "./recentlyWatchedReducer";

export const oneReducer = combineReducers({
  theme: themeReducer,
  data: asyncDataReducer,
  loading: loadingReducer,
  myList: myListReducer,
  resumeId: resumeReducer,
  watchList : recentlyWatchedReducer
});
