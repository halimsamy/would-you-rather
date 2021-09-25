import React from "react";
import PropTypes from "prop-types";
import { CheckIcon } from "@heroicons/react/solid";

export default function LoginUser({ user, selected, active }) {
  return (
    <React.Fragment>
      <div className="flex items-center">
        <img
          src={user.avatarURL}
          alt=""
          className="flex-shrink-0 h-6 w-6 rounded-full"
        />
        <span
          className={
            (selected ? "font-semibold" : "font-normal") +
            " ml-3 block truncate"
          }
        >
          {user.name}
        </span>
      </div>

      {selected ? (
        <span
          className={
            (active ? "text-white" : "text-indigo-600") +
            " absolute inset-y-0 right-0 flex items-center pr-4"
          }
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
    </React.Fragment>
  );
}

LoginUser.propTypes = {
  user: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  active: PropTypes.bool,
};
