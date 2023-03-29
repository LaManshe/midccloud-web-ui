import React, { useState } from "react";

import './Modal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  content: JSX.Element | undefined;
}

const FileOpenModal: React.FC<Props> = ({ isOpen, onClose, content }) => {
    const closeHandle = () => {
        onClose();
    }

    return (
    <>
        {isOpen && (
            <div className="modal" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeHandle}></button>
                        </div>
                        <div className="modal-body text-center">
                            {content}
                        </div>
                    </div>
                </div>
          </div>
        )}
    </>
    );
};

export default FileOpenModal;