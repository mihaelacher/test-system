import { combineReducers } from "redux";
import questions from "./questionReducer";
import questionTypes from "./questionTypeReducer";
import tests from "./testReducer";

const rootReducer = combineReducers({ questions, questionTypes, tests });

export default rootReducer;
