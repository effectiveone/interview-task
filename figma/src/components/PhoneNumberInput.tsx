import React, { useState } from "react";
import axios from "axios";
import "./PhoneNumberInput.scss";
import Countries from "../service/utils/countries.json";

interface Country {
  name: string;
  alpha2Code: string;
  dialCode: string;
  flag: string;
}

const PhoneNumberInput: React.FC = () => {
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");

  const fetchCountryCode = (countryName: string) => {
    const country: any | undefined = Countries.find((item: any) =>
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

  return (
    <div className="PhoneNumber__Box">
      <h3 className="PhoneNumber__Heading">Change phone number</h3>
      <input type="text" value={phone} onChange={handleChange} />
      {countryCode && <div>{countryCode}</div>}
    </div>
  );
};

export default PhoneNumberInput;
