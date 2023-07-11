import React from "react";
import { IconSearch } from "../service/utils/icons";

type SearchBoxProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  countryCode: string;
};

export const SearchBox: React.FC<SearchBoxProps> = ({
  countryCode,
  handleChange,
}) => {
  return (
    <div className="search-input">
      <div className="search-input__icon">
        <IconSearch />
      </div>
      <input
        type="text"
        value={countryCode}
        onChange={handleChange}
        placeholder="Search"
        className="search-input__input"
      />
      <div className="search-input__divider" />
    </div>
  );
};
