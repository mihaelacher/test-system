import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TestList = ({ tests, onDeleteClick }) => (
  <div className="table-responsive">
    <table className="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Intro Text</th>
          <th>Max Duration</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {tests.map((test) => {
          return (
            <tr key={test.id}>
              <td>
                <Link to={"/test/" + test.id}>{test.name}</Link>
              </td>
              <td>{test.introText}</td>
              <td>{test.maxDuration}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(test)}
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

TestList.propTypes = {
  tests: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default TestList;
