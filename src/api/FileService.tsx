import {AxiosResponse} from 'axios';
import ITiles from '../models/FileManager/ITiles';
import api from './http';

export default class FileService {
    static async getRootFolder(): Promise<ITiles>{
        const response = await api.get('/files/?path=/');

        return response.data;
    }
}