import React, {
  useEffect,
  useRef,
  ReactNode,
  useCallback,
  isValidElement,
  useState,
} from "react";
import "./PhoneNumberInput.scss";
import Countries from "../service/utils/countries.json";
import { UpArrowIcon, DownArrowIcon, IconSearch } from "../service/utils/icons";
import ReactDOM from "react-dom";

interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

const PortalContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  const portalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const portalContainer = portalContainerRef.current;
    if (portalContainer) {
      portalContainer.innerHTML = ""; // Wyczyść kontener przy każdej zmianie children

      React.Children.forEach(children, (child) => {
        if (isValidElement(child)) {
          const portalElement = document.createElement("div");
          portalContainer.appendChild(portalElement);
          ReactDOM.render(child, portalElement);
        }
      });
    }
  }, [children]);

  return <div className="portal-container" ref={portalContainerRef} />;
};

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

type CountriesSelectProps = {
  selectCountry: (country: Country) => void;
  countries: Country[] | null | undefined;
  countryCode: string;
};

const CountriesSelect: React.FC<CountriesSelectProps> = ({
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

type SearchBoxProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;

  countryCode: string;
};

const SearchBox: React.FC<SearchBoxProps> = ({ countryCode, handleChange }) => {
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

export default PhoneNumberInput;
