import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../store/users";
import { ReplyIcon, CheckIcon } from "@heroicons/react/solid";

export default function QuestionItem({ question, answered }) {
  const author = useSelector(selectUserById(question.author));

  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-sm font-medium truncate">
              {author.name} asked:
            </h3>
          </div>
          <p className="mt-1 text-gray-500 text-sm truncate">
            {question.optionOne.text} or ...
          </p>
        </div>
        <img
          className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
          src={author.avatarURL}
          alt=""
        />
      </div>

      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="w-0 flex-1 flex">
          <Link
            to={`/questions/${question.id}/`}
            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
          >
            {answered ? (
              <CheckIcon
                className="w-5 h-5 text-green-400"
                aria-hidden="true"
              />
            ) : (
              <ReplyIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            )}
            <span className="ml-3">Answer{answered && "ed"}</span>
          </Link>
        </div>
      </div>
    </li>
  );
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  answered: PropTypes.bool,
};
