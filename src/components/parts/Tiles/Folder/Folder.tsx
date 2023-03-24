import React from 'react';
import IFolder from '../../../../models/FileManager/IFolder';

import './Folder.css';

const Folder : React.FC<IFolderProps> = ({folder, clickHandle}) => {
    const logo = require("../../../../resources/icons/folder_ico.png") as string;

    const folderClickHandle = () => {
        clickHandle(folder);
    }

    return (
        <div className='folder' onClick={folderClickHandle}>
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

interface IFolderProps {
    folder: IFolder;
    clickHandle: (folder: IFolder) => void;
}