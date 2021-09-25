import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../store/users";
import { login } from "../store/auth";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import LoginUser from "./LoginUser";

export default function LoginForm() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected) {
      dispatch(login(selected.id));
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <React.Fragment>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              Login with
            </Listbox.Label>

            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {selected ? (
                  <LoginUser user={selected} />
                ) : (
                  <span className="h-6 font-normal block text-gray-400">
                    Select an account
                  </span>
                )}

                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {Object.values(users).map((user) => (
                    <Listbox.Option
                      key={user.id}
                      className={({ active }) =>
                        (active
                          ? "text-white bg-indigo-600"
                          : "text-gray-900") +
                        " cursor-default select-none relative py-2 pl-3 pr-9"
                      }
                      value={user}
                    >
                      {({ selected, active }) => (
                        <LoginUser
                          user={user}
                          selected={selected}
                          active={active}
                        />
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </React.Fragment>
        )}
      </Listbox>

      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
        Sign in
      </button>
    </form>
  );
}
