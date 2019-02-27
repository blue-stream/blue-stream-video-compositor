import { HttpClient } from '../utils/http.client';
import { config } from '../config';

export class VideosService {
    static api: string = `${config.endpoints.videos.hostname}:${config.endpoints.videos.port}${config.endpoints.videos.api}`;

    static get(videoId: string, authorizationHeader: string) {
        return HttpClient.get(`${VideosService.api}/${videoId}`, null, authorizationHeader);
    }

    static getMany(query: any, authorizationHeader: string) {
        return HttpClient.get(`${VideosService.api}`, query, authorizationHeader);
    }

    static getSearched(query: any, authorizationHeader: string) {
        return HttpClient.get(`${VideosService.api}/search`, query, authorizationHeader);
    }

    static create(body: any, authorizationHeader: string) {
        return HttpClient.post(`${VideosService.api}`, body, authorizationHeader);
    }

    static doesExist(videoId: string, authorizationHeader: string) {
        return HttpClient.head(`${VideosService.api}/${videoId}`, null, authorizationHeader);
    }
}
