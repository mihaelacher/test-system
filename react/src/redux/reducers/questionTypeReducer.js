import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function questionReducer(
  state = initialState.questionTypes,
  action
) {
  switch (action.type) {
    case types.LOAD_QUESTION_TYPES_SUCCESS:
      return action.questionTypes;
    default:
      return state;
  }
}
