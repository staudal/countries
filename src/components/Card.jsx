import React from "react";
import { NumericFormat } from "react-number-format";

export default function Card({ country, setModal, setSelected }) {
  return (
    <div
      onClick={() => (setModal(true), setSelected(country))}
      className="bg-white rounded-md border transition duration-200 ease-in-out hover:shadow-lg hover:cursor-pointer"
      key={country.name.common}
    >
      <img className="rounded-t-md w-full h-60 object-cover" src={country.flags.svg} alt={country.name.common} />
      <div className="p-4 sm:p-6 space-y-2">
        <h2 className="text-xl font-semibold">{country.name.common}</h2>
        <div className="text-gray-600">
          <p>
            <span className="font-bold">Region: </span>
            {country.region}
          </p>
          <p>
            <span className="font-bold">Capital: </span>
            {country.capital}
          </p>
          <p>
            <span className="font-bold">Population: </span>
            <NumericFormat value={country.population} displayType={"text"} thousandSeparator={true} />
          </p>
        </div>
      </div>
    </div>
  );
}
