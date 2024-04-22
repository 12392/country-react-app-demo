import React, { useEffect, useState } from "react";
import "../CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTheme } from "../custom-hooks/useTheme";
import CountryDetailShimmer from "./CountryDetailShimmer";

export default function CountryDetail() {
  const params = useParams();
  const [isDark] = useTheme();
  const countryName = params.country;

  const [countryData, setcountryData] = useState(null);
  const [countryNotfound, setcountryNotfound] = useState(false);
  const location = useLocation();

  function updateCountryData(data) {
    setcountryData({
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName || {})[0].common,
      population: data.population.toLocaleString("en-IN"),
      region: data.region,
      subRegion: data.subregion,
      capital: data.capital?.[0],
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      languages: Object.values(data.languages || {}).join(", "),
      topLevelDomain: data.tld.join(", "),
      flagImage: data.flags.svg,
      altFlagImage: data.flags.alt,
      borders: [],
    });

    if (!data.borders) {
      data.borders = [];
    }

    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setTimeout(() =>
        setcountryData((prevState) => ({
          ...prevState,
          borders,
        }))
      );
    });
  }

  useEffect(() => {
    if (location.state) {
      updateCountryData(location.state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })
      .catch((err) => {
        setcountryNotfound(true);
      });
  }, [countryName]);

  if (countryNotfound) {
    return (
      <>
        {" "}
        <div> Country not found</div>
      </>
    );
  }
  return countryData === null ? (
    "loading....."
  ) : (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData.flagImage} alt={countryData.altFlagImage} />
            <div className="details-text-container">
              <h1>{countryName}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: </b>
                  <span className="native-name">
                    {countryData.nativeName || countryData.name}
                  </span>
                </p>
                <p>
                  <b>Population: </b>
                  <span className="population">{countryData.population}</span>
                </p>
                <p>
                  <b>Region: </b>
                  <span className="region">{countryData.region}</span>
                </p>
                <p>
                  <b>Sub Region: </b>
                  <span className="sub-region">{countryData.subRegion}</span>
                </p>
                <p>
                  <b>Capital: </b>
                  <span className="capital">{countryData.capital}</span>
                </p>
                <p>
                  <b>Top Level Domain: </b>
                  <span className="top-level-domain">
                    {countryData.topLevelDomain}
                  </span>
                </p>
                <p>
                  <b>Currencies: </b>
                  <span className="currencies">{countryData.currencies}</span>
                </p>
                <p>
                  <b>Languages: </b>
                  <span className="languages">{countryData.languages}</span>
                </p>
              </div>
              {countryData.borders.length !== 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
