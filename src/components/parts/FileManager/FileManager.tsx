import React, { useState } from 'react';
import { FileContext } from '../../../context';
import RouteStorageHelper from '../../../helpers/RouteStorageHelper';
import CloudExplorer from '../CloudExplorer/CloudExplorer';
import ControlPanel from '../ControlPanel/ControlPanel';

const FileManager = () => {
    const [currentLevel, setCurrentLevel] = useState(RouteStorageHelper.root());

    return (
        <FileContext.Provider value={{
            currentLevel,
            setCurrentLevel
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