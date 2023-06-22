import React from "react";

export default function SortField({ setSortOption }) {
  return (
    <div className="w-full sm:w-auto">
      <select
        onChange={(event) => setSortOption(event.target.value)}
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-500 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue="population-descending"
      >
        <option value="name-ascending">Name (ascending)</option>
        <option value="name-descending">Name (descending)</option>
        <option value="population-ascending">Population (ascending)</option>
        <option value="population-descending">Population (descending)</option>
      </select>
    </div>
  );
}
