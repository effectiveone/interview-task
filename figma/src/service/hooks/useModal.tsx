import { useState } from "react";

interface UseModalOptions {
  onClose: () => void;
}

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(".modal")) return;
    closeModal();
  };

  const useModalOptions: UseModalOptions = {
    onClose: closeModal,
  };

  return {
    isOpen,
    openModal,
    closeModal,
    handleOutsideClick,
    useModalOptions,
  };
};

export default useModal;
