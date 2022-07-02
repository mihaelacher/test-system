import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import QuestionsPage from "./questions/QuestionsPage";
import ManageQuestionPage from "./questions/ManageQuestionPage";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestsPage from "./tests/TestsPage";
import ManageTestPage from "./tests/ManageTestPage";
import UsersPage from "./users/UsersPage";
import ManageUserPage from "./users/ManageUserPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/questions" component={QuestionsPage} />
        <Route path="/question/:id" component={ManageQuestionPage} />
        <Route path="/question" component={ManageQuestionPage} />
        <Route path="/tests" component={TestsPage} />
        <Route path="/test/:id" component={ManageTestPage} />
        <Route path="/test" component={ManageTestPage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/user/:id" component={ManageUserPage} />
        <Route path="/user" component={ManageUserPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
