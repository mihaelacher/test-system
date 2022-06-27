import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import QuestionList from "./QuestionList";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import * as questionActions from "../../redux/actions/questionActions";

class QuestionsPage extends React.Component {
  state = {
    redirectToAddTestPage: false,
  };

  componentDidMount() {
    const { questions, actions } = this.props;

    if (questions.length === 0) {
      actions.loadQuestions().catch((error) => {
        alert("Loading questions failed" + error);
      });
    }
  }

  handleDeleteQuestion = async (question) => {
    toast.success("Question deleted");
    try {
      await this.props.actions.deleteQuestion(question);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddTestPage && <Redirect to="/question" />}
        <h2>Questions</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-question"
          onClick={() => this.setState({ redirectToAddTestPage: true })}
        >
          Add Question
        </button>

        <QuestionList
          onDeleteClick={this.handleDeleteQuestion}
          questions={this.props.questions}
        />
      </>
    );
  }
}

QuestionsPage.propTypes = {
  questions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    questions: state.questions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadQuestions: bindActionCreators(
        questionActions.loadQuestions,
        dispatch
      ),
      deleteQuestion: bindActionCreators(
        questionActions.deleteQuestion,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
