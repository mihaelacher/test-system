import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/question/";

export function getQuestions() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveQuestion(question) {
  return fetch(baseUrl + (question.id || ""), {
    method: question.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(question),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteQuestion(questionId) {
  return fetch(baseUrl + questionId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
