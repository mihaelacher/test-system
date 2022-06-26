import { combineReducers } from "redux";
import questions from "./questionReducer";
import questionTypes from "./questionTypeReducer";

const rootReducer = combineReducers({ questions, questionTypes });

export default rootReducer;
