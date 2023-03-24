import React, { useEffect, useState } from 'react';
import FileService from '../../../api/FileService';
import IFile from '../../../models/FileManager/IFile';
import IFolder from '../../../models/FileManager/IFolder';
import File from '../Tiles/File/File';
import Folder from '../Tiles/Folder/Folder';

const CloudExplorer = () => {
    const [folders, setFolders] = useState<IFolder[]>([]);
    const [files, setFiles] = useState<IFile[]>([]);

    useEffect(() => {
        const getRootFolder = async () => {
            const rootFolder = await FileService.getRootFolder();

            const _folders = rootFolder.folders;
            const _files = rootFolder.files;

            setFolders(_folders);
            setFiles(_files);
        }

        getRootFolder();
    }, []);

    


    return (
        <div className='list'>
            {folders?.map((folder) => <Folder {...folder=folder}/>)}
            {files?.map((file) => <File {...file=file}/>)}
        </div>
    );
};

export default CloudExplorer;