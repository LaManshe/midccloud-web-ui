import React, { useContext, useEffect, useState } from 'react';
import FileService from '../../../api/FileService';
import { FileContext } from '../../../context';
import RouteStorageHelper from '../../../helpers/RouteStorageHelper';
import IFile from '../../../models/FileManager/IFile';
import IFolder from '../../../models/FileManager/IFolder';
import CloudExplorer from '../CloudExplorer/CloudExplorer';
import ControlPanel from '../ControlPanel/ControlPanel';

import './FileManager.css';

const FileManager = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(RouteStorageHelper.root());
    const [folders, setFolders] = useState<IFolder[]>([]);
    const [files, setFiles] = useState<IFile[]>([]);
    const [isNeedToUpdate, setIsNeedToUpdate] = useState(false);

    const spinnerGif = require('../../../resources/gifs/spinner.gif');

    useEffect(() => {
        setIsLoading(true);

        getFolder(currentLevel);

        setIsNeedToUpdate(false);
    }, [currentLevel, isNeedToUpdate]);

    const getFolder = async (path: string) => {
        const rootFolder = await FileService.getFolderLimit(path, 15, 0);

        const _folders = rootFolder.folders;
        const _files = rootFolder.files;

        setFolders(_folders);
        setFiles(_files);

        setIsLoading(false);
    }

    if (isLoading) {
        return(
            <div className='container-fluid absolute-center-position d-flex justify-content-center align-items-center'>
                <img src={spinnerGif} />
            </div>
        )
    }

    return (
        <FileContext.Provider value={{
            currentLevel,
            setCurrentLevel,
            folders,
            setFolders,
            files,
            setFiles,
            setIsNeedToUpdate
        }}>
            <div className='container'>
                <div className="row d-flex">
                    <ControlPanel />
                </div>
                <div className="row d-flex">
                    <CloudExplorer />
                </div>
            </div>
        </FileContext.Provider>
    );
};

export default FileManager;