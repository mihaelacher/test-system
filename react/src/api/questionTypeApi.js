import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/questionType";

export function getQuestionTypes() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
