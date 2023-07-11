import React, { useEffect } from "react";
import { UpArrowIcon, DownArrowIcon } from "../service/utils/icons";
import { Country } from "../service/utils/interface";

type SelectedCountryBoxProps = {
  open: (value: boolean) => void;
  openDropdown: boolean;
  selectedCountry: Country | null | undefined;
};

export const SelectedCountryBox: React.FC<SelectedCountryBoxProps> = ({
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
