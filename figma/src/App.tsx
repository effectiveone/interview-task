import PhoneNumberInput from "./components/PhoneNumberInput";
import useModal from "./service/hooks/useModal";
import { useEffect } from "react";

const App = () => {
  const { isOpen, openModal, closeModal, handleOutsideClick, useModalOptions } =
    useModal();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        {!isOpen && <button onClick={openModal}>Open Modal</button>}
        {isOpen && (
          <>
            <PhoneNumberInput
              handleOutsideClick={handleOutsideClick}
              closeModal={closeModal}
            />
          </>
        )}
      </div>
    </>
  );
};

export default App;
