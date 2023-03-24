import React, { useContext, useState } from 'react';
import FileService from '../../../api/FileService';
import { FileContext } from '../../../context';
import RouteStorageHelper from '../../../helpers/RouteStorageHelper';
import CreateFolderModal from '../CreateFolderModal/CreateFolderModal';

import './ControlPanel.css';

const ControlPanel = () => {
    const {currentLevel, setCurrentLevel} = useContext(FileContext);

    const [refElement, setReference] = useState<HTMLInputElement | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState<string>("");

    const addFileIco = require('../../../resources/icons/add-file_ico.png');
    const addFolderIcon = require('../../../resources/icons/add-folder_ico.png');
    const stepBackIcon = require('../../../resources/icons/step-back_ico.png');

    const addFile = (event:any) => {
        event.preventDefault();

        refElement?.click();
    }

    const handleInputFileOnChange = (event: any) => {
        FileService.upload(currentLevel, event.target.files);
    }

    const stepBackHandle = () => {
        const newLevel = RouteStorageHelper.down(currentLevel);

        setCurrentLevel(newLevel);
    }

    const isDisableStepBack = () => {
        if (currentLevel === '\\'){
            return 'd-none';
        }
    }

    const handleOpenModal = () => {
        if (isModalOpen){
            setIsModalOpen(false);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitModal = (text: string) => {
        setModalText(text);

        var response = FileService.createFolder(currentLevel, text);

        console.log(response);
    };

    return (
        <div className="container control-panel">
            <div className="row">
                <div className={`col ${isDisableStepBack()}`}>
                    <input className="btn-icon p-1" type="image" src={stepBackIcon} onClick={stepBackHandle}/>
                </div>
                <div className="col">
                    <input className='btn-icon p-1' type="image" src={addFileIco} onClick={(event) => addFile(event)}/>
                    <input ref={setReference} type="file" className='d-none' multiple onChange={(event) => handleInputFileOnChange(event)}></input>
                </div>
                <div className="col">
                    <input className='btn-icon p-1' type="image" src={addFolderIcon} onClick={handleOpenModal}/>
                    <CreateFolderModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitModal}/>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;