import useSWR from "swr";
import { useState } from "react";
import SearchField from "./components/SearchField";
import SortField from "./components/SortField";
import Card from "./components/Card";
import Count from "./components/Count";
import Modal from "./components/Modal";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  const [input, setInput] = useState("");
  const [searchOption, setSearchOption] = useState("name"); // ["name", "region", "capital"]
  const [sortOption, setSortOption] = useState("population-descending"); // ["name-ascending", "name-descending", "population-ascending", "population-descending"]
  const [modal, setModal] = useState(false); // [true, false]
  const [selected, setSelected] = useState(""); // [country]

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

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-6">
        <SearchField setInput={setInput} setSearchOption={setSearchOption} searchOption={searchOption} />
        <Count filteredData={filteredData} />
        <SortField setSortOption={setSortOption} />
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
        {filteredData.map((country) => (
          <Card setSelected={setSelected} setModal={setModal} key={country.name.common} country={country} />
        ))}
      </div>
      <Modal selected={selected} modal={modal} setModal={setModal} />
    </div>
  );
}

export default App;
