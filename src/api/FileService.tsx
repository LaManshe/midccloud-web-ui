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
        //console.log(response);
        return response.data;
    }

    static async getFolderLimit(path: string, limit: number, page: number): Promise<ITiles> {
        const response = await api.get(`/files/limited/?path=${path}&limit=${limit}&page=${page}`);
        //console.log(response);
        return response.data;
    }

    static async upload(path: string, files: any): Promise<AxiosResponse> {
        const filesData = new FormData();
        
        Array.prototype.forEach.call(files, (file: any) => {
            filesData.append('Files', file);
        });

        filesData.append('Folder', path);

        const response = await api.post('files/upload', filesData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
              const percentCompleted = progressEvent.total
                ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                : 0;
              console.log(percentCompleted);
            }
        });

        return response;
    }

    static async createFolder(path: string, folderName: string): Promise<AxiosResponse> {
        const folderPath = new FormData();

        const createFolderName = path + folderName;

        folderPath.append('folderPath', createFolderName);

        const response = await api.post('files/create-folder', folderPath);

        return response;
    }

    static async removeFolders(foldersPath: string[]): Promise<AxiosResponse> {
        const response = await api.post(`files/delete-folders`, {
            Folders: foldersPath
        });

        return response;
    }

    static async getFile(fileName: string, path: string): Promise<IFile> {
        const response = await api.get(`/files/file/?fileName=${fileName}&path=${path}`);

        return response.data;
    }

    static async removeFiles(filesPath: string[]): Promise<AxiosResponse> {
        const response = await api.post(`/files/delete-files/`, {
            Files: filesPath
        });

        return response.data;
    }
}