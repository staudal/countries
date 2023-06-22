import useSWR from "swr";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import SearchField from "./components/SearchField";
import SortField from "./components/SortField";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  const [input, setInput] = useState("");
  const [searchOption, setSearchOption] = useState("name"); // ["name", "region", "capital"]
  const [sortOption, setSortOption] = useState("name-ascending"); // ["name-ascending", "name-descending", "population-ascending", "population-descending"]
  const { data, error, isLoading } = useSWR("https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // sort data
  if (sortOption === "name-ascending") {
    data.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
  } else if (sortOption === "name-descending") {
    data.sort((a, b) => (a.name.common < b.name.common ? 1 : -1));
  } else if (sortOption === "population-ascending") {
    data.sort((a, b) => (a.population > b.population ? 1 : -1));
  } else if (sortOption === "population-descending") {
    data.sort((a, b) => (a.population < b.population ? 1 : -1));
  }

  // filter data
  const filteredData = data.filter((country) => {
    if (country.capital[0] === undefined) {
      country.capital[0] = "No Capital";
    }

    if (searchOption === "name") {
      return country.name.common.toLowerCase().includes(input.toLowerCase());
    } else if (searchOption === "region") {
      return country.region.toLowerCase().includes(input.toLowerCase());
    } else if (searchOption === "capital") {
      return country.capital[0].toLowerCase().includes(input.toLowerCase());
    }
  });

  // render data
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
      <div className="flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-6">
        <SearchField setInput={setInput} setSearchOption={setSearchOption} searchOption={searchOption} />
        <p className="text-gray-500 hidden sm:block">
          <span className="font-bold">Total: </span>
          <NumericFormat value={filteredData.length} displayType={"text"} thousandSeparator={true} />
        </p>
        <SortField setSortOption={setSortOption} />
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
        {filteredData.map((country) => (
          <div className="bg-white rounded-md border" key={country.name.common}>
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
        ))}
      </div>
    </div>
  );
}

export default App;
