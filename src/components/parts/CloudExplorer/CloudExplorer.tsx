import { useContext, useEffect, useRef, useState } from 'react';
import FileService from '../../../api/FileService';
import { FileContext } from '../../../context';
import RouteStorageHelper from '../../../helpers/RouteStorageHelper';
import IFolder from '../../../models/FileManager/IFolder';
import ITiles from '../../../models/FileManager/ITiles';
import File from '../Tiles/File/File';
import Folder from '../Tiles/Folder/Folder';

const CloudExplorer = () => {
    const {currentLevel, setCurrentLevel} = useContext(FileContext);
    const {folders, files} = useContext<ITiles>(FileContext);
    const {setFolders, setFiles} = useContext(FileContext);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isCanLoadMore, setIsCanLoad] = useState(true);
    const trigger = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();

    const spinnerGif = require('../../../resources/gifs/spinner.gif');

    const onFolderClick = (folder: IFolder) : void => {
        const newLevel = RouteStorageHelper.up(currentLevel, folder.name);
        
        setCurrentLevel(newLevel);
    }

    useEffect(() => {
        if(isLoading) {
            return;
        }
        
        setIsLoading(true);

        if(observer.current) observer.current.disconnect();

        var cb = function(entries: any, observer: IntersectionObserver) {
            if (entries[0].isIntersecting && isCanLoadMore) {
                setPage(page + 1);
            }
        };

        observer.current = new IntersectionObserver(cb);
        observer.current.observe(trigger.current!);

    }, [isLoading])

    useEffect(() => {
        if (page === 0){
            return;
        }

        addingElementsFromFolder(currentLevel);
    }, [page]);

    const addingElementsFromFolder = async (path: string) => {
        const rootFolder = await FileService.getFolderLimit(path, 15, page);

        const _folders = rootFolder.folders;
        const _files = rootFolder.files;

        if (_folders.length < 1 && _files.length < 1){ 
            setIsCanLoad(false);
            setIsLoading(false);
            
            return;
        }

        setFolders([...folders, ..._folders]);
        setFiles([...files, ..._files]);

        setIsLoading(false);
    }

    return (
        <div className='list'>
            {folders?.map((folder) => <Folder folder={folder} clickHandle={onFolderClick}/>)}
            {files?.map((file) => <File {...file=file}/>)}
            <div ref={trigger} style={{height: 0, background: 'red'}}/>
            {isLoading && isCanLoadMore &&
            <>
                <div className="container text-center mt-2">
                    <img src={spinnerGif}/>
                </div>
            </>
            }
        </div>
    );
};

export default CloudExplorer;