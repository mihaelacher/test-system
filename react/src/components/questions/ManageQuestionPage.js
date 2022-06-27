import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadQuestions,
  saveQuestion,
} from "../../redux/actions/questionActions";
import { loadQuestionTypes } from "../../redux/actions/questionTypeActions";
import PropTypes from "prop-types";
import QuestionForm from "./QuestionForm";
import { toast } from "react-toastify";

function ManageQuestionPage({
  questions,
  questionTypes,
  loadQuestionTypes,
  loadQuestions,
  saveQuestion,
  history,
  ...props
}) {
  const [question, setQuestion] = useState({ ...props.question });
  /* const [errors, setErrors] = useState({});
   const [saving, setSaving] = useState(false); */

  useEffect(() => {
    if (questions.length === 0) {
      loadQuestions().catch((error) => {
        alert("Loading questions failed" + error);
      });
    } else {
      setQuestion({ ...props.question });
    }

    if (questionTypes.length === 0) {
      loadQuestionTypes().catch((error) => {
        alert("Loading question types failed" + error);
      });
    }
  }, [props.question]);

  function handleChange(event) {
    let { name, value } = event.target;
    setQuestion((prevQuestion) => {
      if (name === "questionTypeId") {
        value = parseInt(value);
      }

      if (name === "answer" || name === "isCorrect") {
        let prevAnswers = [];
        if (prevQuestion[name]) {
          prevAnswers = prevQuestion[name];
        }

        prevAnswers[event.target.getAttribute("data-key")] = value;
        value = prevAnswers;
      }

      return {
        ...prevQuestion,
        [name]: value,
      };
    });
  }

  /* function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  } */

  function handleSave(event) {
    event.preventDefault();
    /* if (!formIsValid()) return; 
    setSaving(true); */
    saveQuestion(question).then(() => {
      toast.success("Question saved.");
      history.push("/questions");
    });
  }

  return (
    <QuestionForm
      question={question}
      errors={{}}
      questionTypes={questionTypes}
      onChange={handleChange}
      onSave={handleSave}
      saving={false}
    />
  );
}

ManageQuestionPage.propTypes = {
  question: PropTypes.object.isRequired,
  questionTypes: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
  loadQuestions: PropTypes.func.isRequired,
  loadQuestionTypes: PropTypes.func.isRequired,
  saveQuestion: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getQuestionById(questions, id) {
  return questions.find((question) => question.id === parseInt(id)) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const question =
    id && state.questions.length > 0
      ? getQuestionById(state.questions, id)
      : {};

  return {
    question,
    questions: state.questions,
    questionTypes: state.questionTypes,
  };
}

const mapDispatchToProps = {
  loadQuestions,
  loadQuestionTypes,
  saveQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageQuestionPage);
