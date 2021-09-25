import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveTab, changeActiveTab } from "../store/ui";

const tabs = ["Unanswered Questions", "Answered Questions"];

export default function HomePageNav() {
  const activeTab = useSelector(selectActiveTab);
  const dispatch = useDispatch();

  const setActiveTab = (tab) => {
    dispatch(changeActiveTab(tab));
  };

  return (
    <div className="mb-5">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          onChange={(e) => setActiveTab(e.target.value)}
          value={activeTab}
        >
          {tabs.map((tab, index) => (
            <option key={tab} value={index}>
              {tab}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200 ">
          <nav className="-mb-px flex justify-center" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={
                  (index === activeTab
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300") +
                  " w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                }
                aria-current={index === activeTab ? "page" : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
