import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PhoneNumberInput.scss";
import Countries from "../service/utils/countries.json";
import { UpArrowIcon, DownArrowIcon } from "../service/utils/icons";

interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

const PhoneNumberInput: React.FC = () => {
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<
    Country | null | undefined
  >(Countries[0]);
  const [prefix, setPrefix] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const fetchCountryCode = (countryName: string) => {
    const country = Countries.find((item: Country) =>
      item.name.toLowerCase().includes(countryName.toLowerCase())
    );
    if (country) {
      setCountryCode(`${country.flag} ${country.name}${country.dial_code}`);
    } else {
      setCountryCode("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPhone(value);
    if (value.length > 0) {
      fetchCountryCode(value);
    } else {
      setCountryCode("");
    }
  };

  const selectCountry = (selectedPropCountry: Country) => {
    setSelectedCountry(selectedPropCountry);
    setOpenDropdown(false);
    setPrefix(selectedPropCountry.dial_code);
  };

  useEffect(() => {
    console.log("selectedCountry changed:", selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="PhoneNumber__Box">
      <h3 className="PhoneNumber__Heading">Change phone number</h3>
      {selectedCountry && (
        <SelectedCountryBox
          openDropdown={openDropdown}
          selectedCountry={selectedCountry}
          open={setOpenDropdown}
        />
      )}
      {openDropdown && (
        <>
          <input type="text" onChange={handleChange} placeholder="Search" />
          {countryCode && <div>{countryCode}</div>}
          {!countryCode && (
            <CountriesSelect
              selectCountry={selectCountry}
              countries={Countries}
            />
          )}
        </>
      )}
    </div>
  );
};

type CountriesSelectProps = {
  selectCountry: (country: Country) => void;
  countries: Country[] | null | undefined;
};

const CountriesSelect: React.FC<CountriesSelectProps> = ({
  selectCountry,
  countries,
}) => (
  <>
    <div className="PhoneNumber__Wrapper">
      {countries?.map((country: Country, index: number) => (
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
  </>
);

type SelectedCountryBoxProps = {
  open: (value: boolean) => void;
  openDropdown: boolean;
  selectedCountry: Country | null | undefined;
};

const SelectedCountryBox: React.FC<SelectedCountryBoxProps> = ({
  selectedCountry,
  open,
  openDropdown,
}) => {
  useEffect(() => {
    console.log("selectedCountry changed:", selectedCountry);
  }, [selectedCountry]);

  return (
    <>
      <div className="PhoneNumber__countrybox">
        {selectedCountry && (
          <>
            {selectedCountry.flag}
            {selectedCountry.dial_code}
          </>
        )}
        <div className="PhoneNumber__Icon" onClick={() => open(!openDropdown)}>
          {openDropdown ? <UpArrowIcon /> : <DownArrowIcon />}
        </div>
      </div>
    </>
  );
};

export default PhoneNumberInput;
