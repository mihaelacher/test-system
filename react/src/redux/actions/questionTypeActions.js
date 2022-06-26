import * as types from "./actionTypes";
import * as questionTypeApi from "../../api/questionTypeApi";

export function loadQuestionTypesSuccess(questionTypes) {
  return { type: types.LOAD_QUESTION_TYPES_SUCCESS, questionTypes };
}

export function loadQuestionTypes() {
  return function (dispatch) {
    return questionTypeApi.getQuestionTypes().then((questionTypes) => {
      dispatch(loadQuestionTypesSuccess(questionTypes));
    });
  };
}
