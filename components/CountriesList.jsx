import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountriesList({ query }) {
  const [allCountry, setAllCountryData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setAllCountryData(data);
      });
  }, []);

  const filterCountryData = allCountry.filter(
    (country) =>
      country.name.common.toLowerCase().includes(query) ||
      country.region.toLowerCase().includes(query)
  );

  return (
    <>
      {!allCountry.length ? (
        <CountriesListShimmer />
      ) : (
        <div className="countries-container">
          {filterCountryData.map((country) => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flagImage={country.flags.svg}
                altFlagImage={country.flags.alt}
                population={country.population}
                region={country.region}
                capital={country.capital?.[0]}
                data={country}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
