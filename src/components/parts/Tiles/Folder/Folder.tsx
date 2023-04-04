import React, { useContext, useState } from 'react';
import { FileContext } from '../../../../context';
import IFolder from '../../../../models/FileManager/IFolder';
import ApplyModal from '../../Modals/ApplyModal';

import './Folder.css';
import { ICheckedItem } from '../../../../interfaces/ICheckedItem';

interface IFolderProps {
    folder: IFolder;
    clickHandle: (folder: IFolder) => void;
}

const Folder : React.FC<IFolderProps> = ({folder, clickHandle}) => {
    const {currentLevel} = useContext(FileContext);
    const {removeFolder} = useContext(FileContext);
    const {checkedItems, setCheckedItems} = useContext(FileContext);

    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [contentApplyModal, setContentApplyModal] = useState<JSX.Element>();
    const [showFolderClass, setShowFolderClass] = useState('show');

    const folderPath = `${currentLevel}\\${folder.name}`

    const folderIcon = require("../../../../resources/icons/folder_ico.png") as string;
    const removeIcon = require("../../../../resources/icons/remove_ico.png") as string;

    const folderClickHandle = (event: any) => {
        event.stopPropagation();
        
        if (event.target.tagName === 'INPUT'){
            return;
        }

        clickHandle(folder);
    }

    const closeApplyModalHandler = () => {
        if (isApplyModalOpen === false){
            return;
        }

        setIsApplyModalOpen(false);
    }

    const removeFolderHandle = (event:any) => {
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

    const removeFolderHandler = async () => {
        setShowFolderClass('hide');

        closeApplyModalHandler();
    }

    const checkBoxChangeHandle = (event: any) => {
        event.stopPropagation();

        if (event.target.checked){
            const checkedItem: ICheckedItem = {
                type: 'Folder',
                //hideFunction: removeFolderHandler,
                path: folderPath
            }
            setCheckedItems(checkedItems.concat(checkedItem));
        }
        else {
            setCheckedItems(checkedItems.filter((checkedItem: ICheckedItem) => checkedItem.path !== folderPath));
        }
    }

    return (
        <div className={`folder ${showFolderClass}`} onClick={(event) => folderClickHandle(event)}>
            <div className="container">
                <div className="row">
                    <div className="col-auto d-flex align-items-center">
                        <input type='checkbox' key={folder.name} onChange={(event) => checkBoxChangeHandle(event)}/>
                    </div>
                    <div className="col d-flex align-items-center">
                        <img src={folderIcon}/>
                        <strong>{folder.name}</strong>
                    </div>
                </div>
            </div>
            <ApplyModal isOpen={isApplyModalOpen} content={contentApplyModal} onClose={(event) => closeApplyModalHandler()} onApply={() => removeFolderHandler()} />
        </div>
    );
};

export default Folder;

