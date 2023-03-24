import React from 'react';
import IFolder from '../../../../models/FileManager/IFolder';

const Folder = (folder: IFolder) => {
    const logo = require("../../../../resources/icons/folder_ico.png") as string;

    return (
        <div className='folder'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={logo}/>
                        <strong>{folder.name}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Folder;