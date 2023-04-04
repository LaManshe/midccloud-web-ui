import React, { useContext, useState } from 'react';
import FileService from '../../../api/FileService';
import { FileContext } from '../../../context';
import RouteStorageHelper from '../../../helpers/RouteStorageHelper';
import CreateFolderModal from '../Modals/CreateFolderModal';

import './ControlPanel.css';

const ControlPanel = () => {
    const {currentLevel, setCurrentLevel} = useContext(FileContext);
    const {addFolder, addFiles, removeCheckedItems} = useContext(FileContext);
    const {checkedItems} = useContext(FileContext);
    const {sortFiles} = useContext(FileContext);

    const [refElement, setReference] = useState<HTMLInputElement | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState('creation')

    const addFileIco = require('../../../resources/icons/add-file_ico.png');
    const addFolderIcon = require('../../../resources/icons/add-folder_ico.png');
    const stepBackIcon = require('../../../resources/icons/step-back_ico.png');
    const removeIcon = require('../../../resources/icons/remove_ico.png');

    const addFileIconClickHandle = (event:any) => {
        event.preventDefault();

        refElement?.click();
    }

    const handleInputFileOnChange = async (event: any) => {
        addFiles(event.target.files);
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

    const handleSubmitModal = async (text: string) => {
        setModalText(text);

        addFolder(text);
    };

    const removeCheckedHandle = () => {
        removeCheckedItems();
    }

    const isAnyCheckedItems = () => {
        if (checkedItems.length > 0){
            return '';
        }

        return 'd-none';
    }

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);

        sortFiles(event.target.value);
    };

    return (
        <div className="container control-panel">
            <div className="row d-flex align-items-center">
                <div className="col-auto">
                    <div className="row">
                        <div className={`col ${isDisableStepBack()}`}>
                            <input className="btn-icon p-1" type="image" src={stepBackIcon} onClick={stepBackHandle}/>
                        </div>
                        <div className="col">
                            <input className='btn-icon p-1' type="image" src={addFileIco} onClick={(event) => addFileIconClickHandle(event)}/>
                            <input ref={setReference} type="file" className='d-none' multiple onChange={(event) => handleInputFileOnChange(event)}></input>
                        </div>
                        <div className="col">
                            <input className='btn-icon p-1' type="image" src={addFolderIcon} onClick={handleOpenModal}/>
                            <CreateFolderModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitModal}/>
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="dropdown">Select a sort:</label>
                            <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                                <option value="upload">By upload</option>
                                <option value="creation">By creation</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="row">
                        <div className={`col ${isAnyCheckedItems()}`}>
                            <input className="btn-icon p-1" type="image" src={removeIcon} onClick={removeCheckedHandle}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;