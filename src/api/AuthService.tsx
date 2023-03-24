import {AxiosResponse} from 'axios';
import ITokens from '../models/api/responses/ITokens';

import api from './http';

export default class AuthService {
    static async getStorage(): Promise<AxiosResponse>{
        const response = await api.get<AxiosResponse>('/files');
        
        return response;
    }

    static async login(login: string, password: string): Promise<string>{
        const data = new FormData();
        data.append('Login', login);
        data.append('Password', password);

        const response = await api.post<ITokens>('/auth/auth', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        if (response.status === 200){
            const token = response.data.token;

            return token;
        }

        return '';
    }

    static async tokenIsAlive(): Promise<Boolean>{
        const response = await api.get<AxiosResponse>('/auth/check');

        if (response.status === 200){
            return true;
        }

        return false;
    }

}