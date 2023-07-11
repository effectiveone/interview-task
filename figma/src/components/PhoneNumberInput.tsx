import React, { useEffect, useRef, useCallback, useState } from "react";
import Countries from "../service/utils/countries.json";
import { SearchBox } from "./SearchBox";
import { SelectedCountryBox } from "./SelectedCountry";
import { CountriesSelect } from "./CountriesSelect";
import { PortalContainer } from "./PortalContainer";
import { Country } from "../service/utils/interface";

type ModalProps = {
  handleOutsideClick: (event: MouseEvent) => void;
  closeModal: () => void;
};

const PhoneNumberInput: React.FC<ModalProps> = ({
  handleOutsideClick,
  closeModal,
}) => {
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<
    Country | null | undefined
  >(Countries[0]);
  const [prefix, setPrefix] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCountryCode(value);
    console.log("handleChange__selectedCountry", countryCode);
  };

  const selectCountry = (selectedPropCountry: Country) => {
    setSelectedCountry(selectedPropCountry);
    setOpenDropdown(false);
    setPrefix(selectedPropCountry.dial_code);
  };

  useEffect(() => {
    console.log("selectedCountry changed:", selectedCountry);
  }, [selectedCountry]);

  const getCurrentNumber = useCallback(() => {
    const currentNumber = `${prefix}${phone}`;
    return currentNumber;
  }, [prefix, phone]);

  const cancelModal = () => {
    setSelectedCountry(Countries[0]);
    setPhone("");
    closeModal();
    setCountryCode("");
    setOpenDropdown(false);
    setPrefix("");
  };

  const saveNumber = () => {
    const number = getCurrentNumber();
    alert(number);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={wrapperRef} className="PhoneNumber__Container">
      <div className="PhoneNumber__Box">
        <h3 className="PhoneNumber__Heading">Change phone number</h3>
        <span className="PhoneNumber__Span">Provide new number phone</span>
        <div className="PhoneNumber__InputsWrapper">
          <SelectedCountryBox
            openDropdown={openDropdown}
            selectedCountry={selectedCountry}
            open={setOpenDropdown}
          />
          <input
            className="PhoneNumber__PhoneInput"
            placeholder="000-000-000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="PhoneNumber__Btn_Wrapper">
          <button onClick={cancelModal}>Cancel</button>
          <button onClick={saveNumber}>Save</button>
        </div>

        {openDropdown && (
          <PortalContainer>
            <>
              <SearchBox
                handleChange={handleChange}
                countryCode={countryCode}
              />

              <CountriesSelect
                selectCountry={selectCountry}
                countries={Countries}
                countryCode={countryCode}
              />
            </>
          </PortalContainer>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberInput;
