import React from "react";
import PropTypes from "prop-types";
import {
  CheckCircleIcon,
  ChevronDoubleUpIcon,
  MailIcon,
} from "@heroicons/react/solid";

export default function UserItem({ user, index }) {
  const questionsAnswered = Object.keys(user.answers).length;
  const questionsCreated = user.questions.length;

  const getRankColor = () => {
    if (index === 0) {
      return "#FFD700";
    } else if (index === 1) {
      return "#909090";
    } else if (index === 2) {
      return "#CD7F32";
    }

    return "#A9A9A9";
  };

  return (
    <li>
      <div href="#" className="block hover:bg-gray-50">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src={user.avatarURL}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {user.name}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="truncate">
                    Total Score:{" "}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {questionsAnswered + questionsCreated}
                    </span>
                  </span>
                </p>
              </div>
              <div className="block">
                <div>
                  <p className="text-sm text-gray-900">
                    Answered questions: {questionsAnswered}
                  </p>
                  <p className="text-sm text-gray-900">
                    Created questions: {questionsCreated}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center" style={{ color: getRankColor() }}>
            <span className="mr-1">{index + 1}</span>
            <ChevronDoubleUpIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </li>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
