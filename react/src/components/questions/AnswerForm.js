import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AnswerInput from "./AnswerInput";

const AnswerForm = ({ question, onChange }) => {
  const [answerInputs, setAnswerInputs] = useState([]);

  useEffect(() => {
    if (question.questionTypeId === 1) {
      setAnswerInputs([]);
    }
    if (question.answer) {
      setAnswerInputs(
        question.answer.map(function (el, index) {
          let isCorrect = false;
          if (question.isCorrect) {
            isCorrect = question.isCorrect[index] ? true : false;
          }

          return (
            // eslint-disable-next-line react/jsx-key
            <AnswerInput
              question={question}
              onChange={onChange}
              counter={index}
              value={el}
              isChecked={isCorrect}
              onDelete={handleDelete}
            />
          );
        }, [])
      );
    }
  }, [question]);

  function handleClick(event) {
    event.preventDefault();
    let counter = answerInputs.length;

    setAnswerInputs(
      answerInputs.concat(
        <AnswerInput
          question={question}
          onChange={onChange}
          counter={counter++}
          isChecked={false}
        />
      )
    );
  }

  function handleDelete(event) {
    event.preventDefault();
    // TODO: handle answer delete
  }

  return (
    <>
      {question.questionTypeId !== 1 && (
        <>
          <button className="btn btn-secondary" onClick={handleClick}>
            Add Question
          </button>
          {answerInputs}
        </>
      )}
    </>
  );
};

AnswerForm.propTypes = {
  question: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AnswerForm;
