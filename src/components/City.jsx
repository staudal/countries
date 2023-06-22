import React from "react";

export default function City({ city }) {
  return (
    <div className="w-full bg-white shadow-lg flex space-between">
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl font-bold">{city ? city.city : "No city found"}</p>
        <p className="text-xl">{city ? city.populationCounts[0].value : "No city found"}</p>
      </div>
    </div>
  );
}
