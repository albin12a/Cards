import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ open, onClose, children }: ModalProps) => {
  return (
    <>
      <div className={`modal-container ${open && "open"}`}>
        <div className="modal">
          <div
            className="close-icon"
            onClick={() => {
              onClose();
            }}
          >
            X
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
