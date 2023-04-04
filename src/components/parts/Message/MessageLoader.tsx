import React from 'react';

interface Props {
    text: string;
}

const MessageLoader: React.FC<Props> = ({text}) => {
    const spinnerGif = require('../../../resources/gifs/spinner.gif');

    return (
        <div className="position-fixed bottom-0 end-0 top-0 start-0 p-3" style={{zIndex: 11}}>
            <div id="liveToast" className="toast show">
                <div className="toast-header">
                    <img src={spinnerGif} className="rounded me-2" alt="..." />
                    <strong className="me-auto">Loading</strong>
                </div>
                <div className="toast-body">
                    {text}
                </div>
            </div>
        </div>
    );
};

export default MessageLoader;