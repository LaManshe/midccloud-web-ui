import React, { useContext, useEffect, useState } from 'react';
import FileService from '../../../api/FileService';
import { FileContext } from '../../../context';
import RouteStorageHelper from '../../../helpers/RouteStorageHelper';
import IFile from '../../../models/FileManager/IFile';
import IFolder from '../../../models/FileManager/IFolder';
import File from '../Tiles/File/File';
import Folder from '../Tiles/Folder/Folder';

const CloudExplorer = () => {
    const {currentLevel, setCurrentLevel} = useContext(FileContext);
    const [folders, setFolders] = useState<IFolder[]>([]);
    const [files, setFiles] = useState<IFile[]>([]);

    useEffect(() => {
        getFolder(currentLevel);
    }, [currentLevel]);

    const onFolderClick = (folder: IFolder) : void => {
        const newLevel = RouteStorageHelper.up(currentLevel, folder.name);

        setCurrentLevel(newLevel);
    }
 
    const getFolder = async (path: string) => {
        const rootFolder = await FileService.getFolder(path);

        const _folders = rootFolder.folders;
        const _files = rootFolder.files;

        setFolders(_folders);
        setFiles(_files);
    }

    return (
        <div className='list'>
            {folders?.map((folder) => <Folder folder={folder} clickHandle={onFolderClick}/>)}
            {files?.map((file) => <File {...file=file}/>)}
        </div>
    );
};

export default CloudExplorer;