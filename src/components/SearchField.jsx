import React from "react";

export default function SearchField({ setInput, setSearchOption, searchOption }) {
  return (
    <div className="w-full sm:w-auto">
      <div className="relative rounded-md shadow-sm">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <select
            onChange={(e) => setSearchOption(e.target.value)}
            name="searchOption"
            value={searchOption}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            <option value="name">Name</option>
            <option value="region">Region</option>
            <option value="capital">Capital</option>
          </select>
        </div>
      </div>
    </div>
  );
}
