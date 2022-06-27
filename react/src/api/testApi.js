import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/test/";

export function getTests() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveTest(test) {
  return fetch(baseUrl + (test.id || ""), {
    method: test.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(test),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTest(testId) {
  return fetch(baseUrl + testId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
