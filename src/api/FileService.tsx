import {AxiosResponse} from 'axios';
import IFile from '../models/FileManager/IFile';
import ITiles from '../models/FileManager/ITiles';
import api from './http';

export default class FileService {
    static async getRootFolder(): Promise<ITiles> {
        const response = await api.get('/files/?path=/');

        return response.data;
    }

    static async getFolder(path: string): Promise<ITiles> {
        const response = await api.get('/files/?path=' + path);

        return response.data;
    }

    static async upload(path: string, files: any): Promise<AxiosResponse> {
        const filesData = new FormData();
        
        Array.prototype.forEach.call(files, (file: any) => {
            filesData.append('Files', file);
        });

        filesData.append('Folder', path);

        const response = await api.post('files/upload', filesData);

        return response;
    }

    static async createFolder(path: string, folderName: string): Promise<AxiosResponse> {
        const folderPath = new FormData();

        const createFolderName = path + folderName;

        folderPath.append('folderPath', createFolderName);

        const response = await api.post('files/create-folder', folderPath);

        return response;
    }
}