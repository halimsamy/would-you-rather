import React, { useEffect } from "react";
import { Switch, Route } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth } from "../store/auth";
import { fetchUsers } from "../store/users";
import { fetchQuestions } from "../store/questions";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LeaderboardPage from "../pages/LeaderboardPage";
import AddQuestionPage from "../pages/AddQuestionPage";
import QuestionPage from "../pages/QuestionPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoadingBar from "react-redux-loading-bar";
import NavBar from "./NavBar";

function App() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, []);

  return (
    <div className="app">
      <LoadingBar style={{ backgroundColor: "#6366F1" }} />
      {!isAuth ? (
        <LoginPage />
      ) : (
        <React.Fragment>
          <NavBar />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/leaderboard">
                <LeaderboardPage />
              </Route>
              <Route path="/questions/:id">
                <QuestionPage />
              </Route>
              <Route path="/add">
                <AddQuestionPage />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
