import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const QuestionList = ({ questions, onDeleteClick }) => (
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
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(question)}
                >
                  Delete
                </button>
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
  onDeleteClick: PropTypes.func.isRequired,
};

export default QuestionList;
