import React, { useState } from "react";

import './Modal.css';

interface Props {
  isOpen: boolean;
  content: JSX.Element | undefined;
  onClose: (event:any) => void;
  onApply: (event:any) => void;
}

const ApplyModal: React.FC<Props> = ({ isOpen, content, onClose, onApply }) => {
    const closeHandle = (event:any) => {
        onClose(event);
    }

    return (
    <>
        {isOpen && (
            <div className="modal" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Apply</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(event) => closeHandle(event)}></button>
                        </div>
                        <div className="modal-body text-center">
                            {content}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={(event) => onApply(event)}>Submit</button>
                            <button className="btn btn-danger" onClick={(event) => closeHandle(event)}>Cancel</button>
                        </div>
                    </div>
                </div>
          </div>
        )}
    </>
    );
};

export default ApplyModal;