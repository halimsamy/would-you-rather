import React, { useState } from "react";
import { useParams, Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectQuestionById, answerQuestion } from "../store/questions";
import { selectUserById } from "../store/users";
import { selectAuthUser } from "../store/auth";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";

const options = ["optionOne", "optionTwo"];

export default function QuestionPage() {
  const { id } = useParams();
  const question = useSelector(selectQuestionById(id));

  if (question === undefined) {
    return <Redirect to="/404" />;
  }

  const author = useSelector(selectUserById(question.author));
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState(user.answers[id]);

  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  const handleAnswer = (newAnswer) => {
    if (answer) {
      return;
    }

    dispatch(answerQuestion({ answer: newAnswer, id: id }));
    setAnswer(newAnswer);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-96 bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="w-full flex items-center justify-between p-6 space-x-6">
          <img
            className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
            src={author.avatarURL}
            alt=""
          />
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="text-gray-900 text-sm font-medium truncate">
                {author.name} asked:
              </h3>
            </div>
            <p className="mt-1 text-gray-500 text-sm truncate">
              Would you rather...
            </p>
          </div>
        </div>

        <RadioGroup value={answer} onChange={handleAnswer}>
          <div className="space-y-0">
            {options.map((option) => (
              <RadioGroup.Option
                key={option}
                value={option}
                className="relative block border bg-white shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
              >
                {({ checked }) => (
                  <>
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className="font-medium text-gray-900"
                        >
                          {question[option].text}
                        </RadioGroup.Label>
                      </div>
                    </div>

                    <RadioGroup.Description
                      as="div"
                      className="mt-2 flex text-sm sm:mt-0 sm:flex-col sm:items-center sm:ml-4 sm:text-right"
                    >
                      <div className="flex items-center">
                        {checked && (
                          <CheckIcon
                            className="w-5 h-5 text-green-400 mr-1"
                            aria-hidden="true"
                          ></CheckIcon>
                        )}
                        {answer && (
                          <div
                            className={
                              (checked
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800") +
                              " inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium mr-1 sm:mr-0"
                            }
                          >
                            {(
                              (question[option].votes.length / totalVotes) *
                              100
                            ).toFixed()}
                            %
                          </div>
                        )}
                      </div>

                      {answer && (
                        <p className="text-gray-500 sm:inline">
                          {question[option].votes.length} out of {totalVotes}
                        </p>
                      )}
                    </RadioGroup.Description>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
