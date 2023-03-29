import React, { useState } from "react";

import './Modal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(text);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal__overlay" onClick={onClose}></div>
          <div className="modal__content">
            <div className="modal__header">
              <button className="modal__close" onClick={onClose}>
                &times;
              </button>
            </div>
            <div className="modal__body">
              <input type="text" value={text} onChange={handleInputChange} />
            </div>
            <div className="modal__footer">
              <button onClick={handleSubmit}>OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;