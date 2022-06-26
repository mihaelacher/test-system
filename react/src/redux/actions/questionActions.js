import * as types from "./actionTypes";
import * as questionApi from "../../api/questionApi";

export function loadQuestionsSuccess(questions) {
  return { type: types.LOAD_QUESTIONS_SUCCESS, questions };
}

export function createQuestionSuccess(question) {
  return { type: types.CREATE_QUESTION_SUCCESS, question };
}

export function updateQuestionSuccess(question) {
  return { type: types.UPDATE_QUESTION_SUCCESS, question };
}

export function deleteQuestionOptimistic(question) {
  return { type: types.DELETE_QUESTION_OPTIMISTIC, question };
}

export function loadQuestions() {
  return function (dispatch) {
    return questionApi.getQuestions().then((questions) => {
      dispatch(loadQuestionsSuccess(questions));
    });
  };
}

export function saveQuestion(question) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return questionApi.saveQuestion(question).then((savedQuestion) => {
      question.id
        ? dispatch(updateQuestionSuccess(savedQuestion))
        : dispatch(createQuestionSuccess(savedQuestion));
    });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteQuestionOptimistic(course));
    return questionApi.deleteQuestion(course.id);
  };
}
