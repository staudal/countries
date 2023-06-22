import React from "react";
import { NumericFormat } from "react-number-format";

export default function Count({ filteredData }) {
  return (
    <p className="text-gray-500 hidden sm:block">
      <span className="font-bold">Total: </span>
      <NumericFormat value={filteredData.length} displayType={"text"} thousandSeparator={true} />
    </p>
  );
}
