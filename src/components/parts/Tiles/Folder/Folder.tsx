import React, { useContext, useState } from 'react';
import { JsxElement } from 'typescript';
import FileService from '../../../../api/FileService';
import { FileContext } from '../../../../context';
import IFolder from '../../../../models/FileManager/IFolder';
import ApplyModal from '../../Modals/ApplyModal';

import './Folder.css';

const Folder : React.FC<IFolderProps> = ({folder, clickHandle}) => {
    const {currentLevel, setIsNeedToUpdate} = useContext(FileContext);

    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [contentApplyModal, setContentApplyModal] = useState<JSX.Element>();

    const folderIcon = require("../../../../resources/icons/folder_ico.png") as string;
    const removeIcon = require("../../../../resources/icons/remove_ico.png") as string;

    const folderClickHandle = () => {
        clickHandle(folder);
    }

    const closeApplyModalHandler = (event:any) => {
        event.stopPropagation();

        if (isApplyModalOpen === false){
            return;
        }

        setIsApplyModalOpen(false);
    }

    const removeFolder = (event:any) => {
        event.stopPropagation();

        if (isApplyModalOpen){
            return;
        }

        const contentForApplyModal = 
            <div className="row">
                <div className="col">
                    <strong>Do you really want to delete folder {folder.name}?</strong>
                    <p>The entire contents of the folder will also be deleted!</p>
                </div>
            </div>
        ;

        setContentApplyModal(contentForApplyModal);

        setIsApplyModalOpen(true);
    }

    const removeFolderHandler = async (event:any) => {
        event.stopPropagation();

        const fullPath = `${currentLevel}\\${folder.name}`;
        const response = await FileService.removeFolder(fullPath);
        
        setIsNeedToUpdate(true);

        closeApplyModalHandler(event);
    }

    return (
        <div className='folder' onClick={folderClickHandle}>
            <div className="container">
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <img src={folderIcon}/>
                        <strong>{folder.name}</strong>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        <input className='btn-icon-remove p-1' type="image" src={removeIcon} onClick={(event) => removeFolder(event)}/>
                    </div>
                </div>
            </div>
            <ApplyModal isOpen={isApplyModalOpen} content={contentApplyModal} onClose={(event) => closeApplyModalHandler(event)} onApply={(event) => removeFolderHandler(event)} />
        </div>
    );
};

export default Folder;

interface IFolderProps {
    folder: IFolder;
    clickHandle: (folder: IFolder) => void;
}