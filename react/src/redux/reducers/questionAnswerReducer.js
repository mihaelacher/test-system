import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function questionReducer(
  state = initialState.questionAnswers,
  action
) {
  switch (action.type) {
    case types.LOAD_QUESTION_ANSWERS_SUCCESS:
      return action.questionAnswers;
    default:
      return state;
  }
}
