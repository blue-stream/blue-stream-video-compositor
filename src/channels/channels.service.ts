import { HttpClient } from './../utils/http.client';
import { config } from '../config';

export class ChannelsService {
    static api: string = `${config.endpoints.channels.hostname}:${config.endpoints.channels.port}${config.endpoints.channels.api}`;

    static  get(channelId: string, authorizationHeader: string) {
        return HttpClient.get(`${ChannelsService.api}/${channelId}`, null, authorizationHeader);
    }

    static  getMany(query: any, authorizationHeader: string) {
        return HttpClient.get(`${ChannelsService.api}/many`, query, authorizationHeader);
    }

    static async doesExist(channelId: string, authorizationHeader: string) {
        return HttpClient.head(`${ChannelsService.api}/${channelId}`, null, authorizationHeader);
    }
}
