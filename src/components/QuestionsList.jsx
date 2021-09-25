import React from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../store/auth";
import { selectActiveTab } from "../store/ui";
import { selectQuestions } from "../store/questions";
import QuestionItem from "./QuestionItem";

export default function QuestionsList() {
  const questions = useSelector(selectQuestions);
  const activeTab = useSelector(selectActiveTab);
  const user = useSelector(selectAuthUser);

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Object.values(questions)
        .filter((q) => Object.keys(user.answers).includes(q.id) == activeTab)
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((q) => (
          <QuestionItem key={q.id} question={q} answered={activeTab == true} />
        ))}
    </ul>
  );
}
