import React from 'react';
import IFile from '../../../../models/FileManager/IFile';

const File = (file: IFile) => {
    const logo = require("../../../../resources/icons/file_ico.png") as string;

    return (
        <div className='file'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={logo}/>
                        <strong>{file.name}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default File;