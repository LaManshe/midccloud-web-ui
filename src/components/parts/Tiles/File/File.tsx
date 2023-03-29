import React, { useContext, useEffect, useState } from 'react';
import FileService from '../../../../api/FileService';
import { FileContext } from '../../../../context';
import IFile from '../../../../models/FileManager/IFile';
import ApplyModal from '../../Modals/ApplyModal';
import FileOpenModal from '../../Modals/FileOpenModal';

import './File.css';

const File = (file: IFile) => {
    const logo = require("../../../../resources/icons/file_ico.png") as string;
    const removeIcon = require("../../../../resources/icons/remove_ico.png") as string;

    var extension = FileExtensionEnum.Unknown;

    const {currentLevel, setIsNeedToUpdate} = useContext(FileContext);

    const [imageSrc, setImageSrc] = useState<string>('');
    const [isFileOpenModalOpen, setIsFileOpenModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element>();
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [contentApplyModal, setContentApplyModal] = useState<JSX.Element>();

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
            URL.revokeObjectURL(imageUrl);
        }
    }, []);

    const fileClickHandle = async () => {
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

    const handleCloseOpenFileModal = () => {
        //todo revoke image

        setIsFileOpenModalOpen(false);
    };

    const handleCloseApplyModal = (event: any) => {
        event.stopPropagation();

        if (isApplyModalOpen === false) {
            return;
        }
        
        setIsApplyModalOpen(false);
    };

    const removeFile = (event:any) => {
        event.stopPropagation();

        if (isApplyModalOpen){
            return;
        }

        const contentForApplyModal = 
            <div className="row">
                <div className="col">
                    <strong>Do you really want to delete file {file.name}?</strong>
                </div>
            </div>
        ;

        setContentApplyModal(contentForApplyModal);

        setIsApplyModalOpen(true);
    }

    const removeFileHandler = async (event:any) => {
        event.stopPropagation();

        const respoinse = await FileService.removeFile(currentLevel, file.name);

        setIsNeedToUpdate(true);

        handleCloseApplyModal(event);
    }

    return (
        <div className='file m-2 d-flex align-items-center' onClick={fileClickHandle}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col-auto">
                                <img className="image" src={imageSrc}/>
                            </div>
                            <div className="col d-flex align-items-center">
                                <strong>{file.name}</strong>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        <input className='btn-icon-remove p-1' type="image" src={removeIcon} onClick={(event) => removeFile(event)}/>
                    </div>
                </div>
            </div>
            <FileOpenModal isOpen={isFileOpenModalOpen} onClose={handleCloseOpenFileModal} content={modalContent}/>
            <ApplyModal 
                isOpen={isApplyModalOpen} 
                onClose={(event) => handleCloseApplyModal(event)} 
                content={contentApplyModal} 
                onApply={(event) => removeFileHandler(event)} />
        </div>
    );
};

enum FileExtensionEnum {
    CompressedImage,
    Unknown
}

export default File;