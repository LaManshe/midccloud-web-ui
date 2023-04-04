import React, { useContext, useEffect, useState } from 'react';
import FileService from '../../../../api/FileService';
import { FileContext } from '../../../../context';
import IFile from '../../../../models/FileManager/IFile';
import ApplyModal from '../../Modals/ApplyModal';
import FileOpenModal from '../../Modals/FileOpenModal';

import './File.css';
import { ICheckedItem } from '../../../../interfaces/ICheckedItem';

const File = (file: IFile) => {
    const logo = require("../../../../resources/icons/file_ico.png") as string;
    const removeIcon = require("../../../../resources/icons/remove_ico.png") as string;

    var extension = FileExtensionEnum.Unknown;

    const {currentLevel, setIsNeedToUpdate} = useContext(FileContext);
    const {checkedItems, setCheckedItems} = useContext(FileContext);

    const [imageSrc, setImageSrc] = useState<string>('');
    const [isFileOpenModalOpen, setIsFileOpenModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element>();
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [contentApplyModal, setContentApplyModal] = useState<JSX.Element>();
    const [showFileClass, setShowFileClass] = useState('show');

    const filePath = `${currentLevel}\\${file.name}`;

    function dataURItoBlob(dataURI: string): Blob {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    useEffect(() => {
        console.log(`mount ${file.name}`);

        return () => {
            console.log(`unmount ${file.name}`);
        }
    }, [])

    useEffect(() => {
        var imageUrl: string = '';
        switch (file.extension.type) {
            case 'CompressedImage':
                const blob = dataURItoBlob(file.extension.blob);
                imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
                extension = FileExtensionEnum.CompressedImage;
                break;
            default:
                setImageSrc(logo);
        }

        return () => {
            //setShowFileClass('hide');
            //console.log(file.name);
            //console.log('unmounted');
            URL.revokeObjectURL(imageUrl);
        }
    }, []);

    const clickHandle = async (event: any) => {
        if (event.target.tagName === 'INPUT'){
            return;
        }

        if (isFileOpenModalOpen) {
            return;
        }

        const fileFull = await FileService.getFile(file.name, currentLevel);

        switch (fileFull.extension.type) {
            case 'Image':
                const imgSrc = URL.createObjectURL(dataURItoBlob(fileFull.extension.blob));
                const modalContent: JSX.Element = 
                    <img className="w-100" src={imgSrc} />
                ;
                setModalContent(modalContent);

                break;
            default:
                const modalContentUndefined: JSX.Element = 
                    <p>This content undefined</p>
                ;
                setModalContent(modalContentUndefined);
        }

        setIsFileOpenModalOpen(true);
    }

    const closeModalPhotoShowerHandle = () => {
        //todo revoke image

        setIsFileOpenModalOpen(false);
    };

    const handleCloseApplyModal = () => {
        if (isApplyModalOpen === false) {
            return;
        }
        
        setIsApplyModalOpen(false);
    };

    const removeFileHandler = async () => {
        setShowFileClass('hide');

        handleCloseApplyModal();
    }

    const checkBoxChangeHandle = (event: any) => {
        event.stopPropagation();

        if (event.target.checked){
            const checkedItem: ICheckedItem = {
                type: 'File',
                //hideFunction: removeFileHandler,
                path: filePath
            }
            setCheckedItems(checkedItems.concat(checkedItem));
        }
        else {
            setCheckedItems(checkedItems.filter((checkedItem: ICheckedItem) => checkedItem.path !== filePath));
        }
    }

    return (
        <div className={`file m-2 d-flex align-items-center ${showFileClass}`} onClick={(event) => clickHandle(event)}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="row d-flex flex-wrap">
                            <div className="col-auto d-flex align-items-center">
                                <input type='checkbox' key={file.name} onChange={(event) => checkBoxChangeHandle(event)}/>
                            </div>
                            <div className="col-auto">
                                <img className="image" src={imageSrc}/>
                            </div>
                            <div className="col d-flex align-items-center text-truncate">
                                {file.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FileOpenModal isOpen={isFileOpenModalOpen} onClose={closeModalPhotoShowerHandle} content={modalContent}/>
        </div>
    );
};

enum FileExtensionEnum {
    CompressedImage,
    Unknown
}

export default File;