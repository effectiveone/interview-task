import React, { useEffect, useState } from "react";
import { Country } from "../service/utils/interface";

type CountriesSelectProps = {
  selectCountry: (country: Country) => void;
  countries: Country[] | null | undefined;
  countryCode: string;
};

export const CountriesSelect: React.FC<CountriesSelectProps> = ({
  selectCountry,
  countries,
  countryCode,
}) => {
  const [filteredCountries, setFilteredCountries] = useState<Country[] | null>(
    null
  );

  useEffect(() => {
    const updatedFilteredCountries = (countries || []).filter(
      (country: Country) =>
        country.name.toLowerCase().includes(countryCode?.toLowerCase() || "")
    );
    console.log("selectedCountry", countryCode);
    setFilteredCountries(updatedFilteredCountries);
  }, [countries, countryCode]);

  return (
    <div className="PhoneNumber__Wrapper">
      {filteredCountries?.map((country: Country, index: number) => (
        <div
          className="PhoneNumber__listItems"
          key={index}
          onClick={() => selectCountry(country)}
        >
          <div>
            {country.flag}
            {country.name}
          </div>
          <div className="PhoneNumber__digicode">{country.dial_code}</div>{" "}
        </div>
      ))}
    </div>
  );
};
