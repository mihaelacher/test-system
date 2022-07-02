import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const QuestionList = ({ questions, onClick, operationType, testQuestions }) => (
  <div className="table-responsive">
    <table className="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Instruction</th>
          <th>Points</th>
          <th>Type</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => {
          return (
            <tr key={question.id}>
              <td>
                <Link to={"/question/" + question.id}>{question.text}</Link>
              </td>
              <td>{question.instruction}</td>
              <td>{question.points}</td>
              <td>{question.questionType}</td>
              <td>
                {operationType === "DELETE" ? (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onClick(question)}
                  >
                    Delete
                  </button>
                ) : (
                  <input
                    name="questionId"
                    type="checkbox"
                    checked={testQuestions.includes(question.id) ? true : false}
                    onChange={() => onClick(question.id)}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  operationType: PropTypes.string.isRequired,
  testQuestions: PropTypes.array,
};

export default QuestionList;
