import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import AnswerInput from "./AnswerInput";

const OPEN_QUESTION_TYPE_ID = 1;
const SINGLE_CHOICE_QUESTION_TYPE_ID = 2;
const MULTIPLE_CHOICE_QUESTION_TYPE_ID = 3;

const QuestionForm = ({
  question,
  questionTypes,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  const [inputList, setInputList] = useState([]);
  const [questionType, setQuestionType] = useState();

  const onAddBtnClick = (event) => {
    event.preventDefault();
    setInputList(
      inputList.concat(
        <AnswerInput questionType={questionType} onChange={onChange} />
      )
    );
  };

  const onSelectQuestionType = (event) => {
    setQuestionType(
      event.target.value == MULTIPLE_CHOICE_QUESTION_TYPE_ID
        ? "checkbox"
        : "radio"
    );
    onChange(event);
  };

  return (
    <form onSubmit={onSave}>
      <h2>{question.id ? "Edit" : "Add"} Question</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="text"
        label="text"
        type="text"
        value={question.text}
        onChange={onChange}
        error={errors.text}
      />

      <TextInput
        name="instruction"
        label="instruction"
        type="text"
        value={question.instruction}
        onChange={onChange}
        error={errors.instruction}
      />

      <TextInput
        name="points"
        label="points"
        type="number"
        value={question.points}
        onChange={onChange}
        error={errors.points}
      />

      <SelectInput
        name="questionTypeId"
        label="Question Type"
        value={parseInt(question.questionTypeId) || ""}
        defaultOption="Select Question Type"
        options={questionTypes.map((questionType) => ({
          value: questionType.id,
          text: questionType.name,
        }))}
        onChange={onSelectQuestionType}
        error={errors.questionTypeId}
      />

      {questionType ? (
        <>
          <button className="btn btn-secondary" onClick={onAddBtnClick}>
            Add Question
          </button>
          {inputList}
        </>
      ) : (
        ""
      )}

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

QuestionForm.propTypes = {
  question: PropTypes.object.isRequired,
  questionTypes: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuestionForm;
