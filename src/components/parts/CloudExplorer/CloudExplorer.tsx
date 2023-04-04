import { useContext, useEffect, useRef, useState } from 'react';
import FileService from '../../../api/FileService';
import { FileContext } from '../../../context';
import RouteStorageHelper from '../../../helpers/RouteStorageHelper';
import IFolder from '../../../models/FileManager/IFolder';
import ITiles from '../../../models/FileManager/ITiles';
import File from '../Tiles/File/File';
import Folder from '../Tiles/Folder/Folder';
import { ICheckedItem } from '../../../interfaces/ICheckedItem';

const CloudExplorer = () => {
    const {currentLevel, setCurrentLevel} = useContext(FileContext);
    const {folders, files} = useContext<ITiles>(FileContext);
    const {setFolders, setFiles} = useContext(FileContext);
    const {setCheckedItems} = useContext(FileContext);

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

        if(observer.current) {
            observer.current.disconnect();
        }

        var cb = function(entries: any, observer: IntersectionObserver) {
            if (entries[0].isIntersecting && isCanLoadMore) {
                console.log('up +1 page');
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

    const setEveryCheck = () => {
        var checked: ICheckedItem[] = [];
        files.forEach((file) => {
            const checkedFile : ICheckedItem = {
                type: 'File',
                path: file.name
            }
            checked.concat(checkedFile);
        })

        setCheckedItems(checked);
    }

    return (
        <div className='list'>
            <div className="simple-checkbox">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col-auto">
                                    <input type='checkbox' onChange={setEveryCheck}/>
                                </div>
                                <div className="col">
                                    <p>Point all</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {folders?.map((folder) => <Folder folder={folder} clickHandle={onFolderClick} key={folder.name}/>)}
            {files?.map((file) => <File {...file=file} key={file.name}/>)}
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