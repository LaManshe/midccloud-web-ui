import { useEffect, useState } from 'react';
import FileService from '../../../api/FileService';
import { FileContext } from '../../../context';
import RouteStorageHelper from '../../../helpers/RouteStorageHelper';
import IFile from '../../../models/FileManager/IFile';
import IFolder from '../../../models/FileManager/IFolder';
import CloudExplorer from '../CloudExplorer/CloudExplorer';
import ControlPanel from '../ControlPanel/ControlPanel';
import { ICheckedItem } from '../../../interfaces/ICheckedItem';

import './FileManager.css';

const FileManager = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(RouteStorageHelper.root());
    const [folders, setFolders] = useState<IFolder[]>([]);
    const [files, setFiles] = useState<IFile[]>([]);
    const [checkedItems, setCheckedItems] = useState<ICheckedItem[]>([]);

    const spinnerGif = require('../../../resources/gifs/spinner.gif');

    useEffect(() => {
        setIsLoading(true);

        getIncludesAsync();
    }, [currentLevel]);

    const getIncludesAsync = async () => {
        await getFolderIncludes();

        setIsLoading(false);
    }

    const getFolderIncludes = async () => {
        const rootFolder = await FileService.getFolderLimit(currentLevel, 15, 0);

        setFolders(rootFolder.folders);
        setFiles(rootFolder.files);

        setIsLoading(false);
    }

    const addFolder = async (folderName: string) => {
        await FileService.createFolder(currentLevel, folderName);

        await getIncludesAsync();
    }

    const removeFolders = async (foldersPath: string[]) => {
        await FileService.removeFolders(foldersPath);

        await getIncludesAsync();
    }

    const addFiles = async (files:any) => {
        await FileService.upload(currentLevel, files);

        await getIncludesAsync();
    }

    const removeFiles = async (filesPath: string[]) => {
        await FileService.removeFiles(filesPath);

        await getIncludesAsync();
    }

    const removeCheckedItems = async (event: any) => {
        let requestToRemoveFolders: string[] = [];
        let requestToRemoveFiles: string[] = [];

        checkedItems.map((item) => {
            //item.hideFunction();
            
            if (item.type === 'Folder'){
                requestToRemoveFolders = requestToRemoveFolders.concat(item.path);
            }

            if (item.type === 'File'){
                requestToRemoveFiles = requestToRemoveFiles.concat(item.path);
            }
        });

        if (requestToRemoveFolders.length > 0) {
            await removeFolders(requestToRemoveFolders);
        }

        if (requestToRemoveFiles.length > 0) {
            await removeFiles(requestToRemoveFiles);
        }

        setCheckedItems([]);

        await getIncludesAsync();
    }

    const sortFiles = (option: string) => {
        let sortedFiles: IFile[] = [];

        switch (option) {
            case 'upload':
                sortedFiles = [...files].sort((a, b) => 
                    new Date(b.uploadTime).getTime() -
                    new Date(a.uploadTime).getTime());
                break;
            case 'creation':
                sortedFiles = [...files].sort((a, b) => 
                    new Date(b.extension.creationTime).getTime() -
                    new Date(a.extension.creationTime).getTime());
                break;
            default:
                break;
        }
        
        setFiles(sortedFiles);
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
            addFolder,
            removeCheckedItems,
            addFiles,
            checkedItems,
            setCheckedItems,
            sortFiles
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