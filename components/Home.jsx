import React, { useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import "../App.css";
import { useWindowSize } from "../custom-hooks/useWindowSize";
import { useTheme } from "../custom-hooks/useTheme";

export default function App() {
  const [query, setQuery] = useState("");
  const [isDark] = useTheme();
  const windowSize = useWindowSize();
  return (
    <>
      <main className={`${isDark ? "dark" : ""}`}>
        <div className="search-filter-container">
          <SearchBar setQuery={setQuery} />
          <SelectMenu setQuery={setQuery} />
        </div>
        {/* <h1 style={{ textAlign: "center" }}>
          {" "}
          {windowSize.width} X {windowSize.height}{" "}
        </h1> */}

        <CountriesList query={query} />
      </main>
    </>
  );
}
