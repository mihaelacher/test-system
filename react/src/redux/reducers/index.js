import { combineReducers } from "redux";
import questions from "./questionReducer";
import questionTypes from "./questionTypeReducer";
import tests from "./testReducer";
import users from "./userReducer";

const rootReducer = combineReducers({ questions, questionTypes, tests, users });

export default rootReducer;
