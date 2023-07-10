import React, { ComponentType, useState } from "react";
import { Modal, Button } from "@mui/material";
import "./Modal.scss";

interface MiniModalProps {
  open: boolean;
  onClose: () => void;
}

const withMiniModal = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithMiniModal: React.FC<P & MiniModalProps> = ({
    open,
    onClose,
    ...props
  }) => {
    return (
      <Modal open={open} onClose={onClose}>
        <div
          className="Modal__Box"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <WrappedComponent {...(props as P)} />
          <Button onClick={onClose}>Close</Button>
        </div>
      </Modal>
    );
  };

  const MiniModalHOC: React.FC<P> = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <button onClick={handleOpen}>Open Modal</button>
        <WithMiniModal {...props} open={open} onClose={handleClose} />
      </>
    );
  };

  return MiniModalHOC;
};

export default withMiniModal;
