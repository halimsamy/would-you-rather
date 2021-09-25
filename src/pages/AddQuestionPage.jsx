import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addQuestion } from "../store/questions";

export default function AddQuestionPage() {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addQuestion({ optionOneText: optionOne, optionTwoText: optionTwo })
    );
    history.push("/");
  };

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Would you rather ... or ...?
            </h3>
            <p className="mt-1 text-sm text-gray-500">Complete the question.</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="option-one"
                className="block text-sm font-medium text-gray-700"
              >
                Option First
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="option-one"
                  id="option-one"
                  required
                  value={optionOne}
                  onChange={(e) => setOptionOne(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="option-two"
                className="block text-sm font-medium text-gray-700"
              >
                Option Two
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="option-two"
                  id="option-two"
                  required
                  value={optionTwo}
                  onChange={(e) => setOptionTwo(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
