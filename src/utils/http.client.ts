import axios, { AxiosPromise } from 'axios';
import { stringify } from 'querystring';

export class HttpClient {
    static async get(url: string, query?: any, authToken?: string) {
        return (await axios.get(`${url}?${stringify(query)}`, { headers: { authorization: authToken } })).data;
    }

    static async post(url: string, body: Object, authToken?: string) {
        return (await axios.post(url, body, { headers: { authorization: authToken } })).data;
    }

    static async delete(url: string, authToken?: string) {
        return (await axios.delete(url, { headers: { authorization: authToken } })).data;
    }

    static async put(url: string, body: Object, authToken?: string) {
        return (await axios.put(url, body, { headers: { authorization: authToken } })).data;
    }

    static async head(url: string, query?: any, authToken?: string) {
        return (await axios.head(`${url}?${stringify(query)}`, { headers: { authorization: authToken } })).data;
    }
}
