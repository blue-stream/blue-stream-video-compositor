import { HttpClient } from '../utils/http.client';
import { config } from '../config';

export class ChannelPermissionsService {
    static api: string = `${config.endpoints.userPermissions.hostname}:${config.endpoints.userPermissions.port}${config.endpoints.userPermissions.api}`;

    static getOne(query: any, authorizationHeader: string) {
        return HttpClient.get(`${ChannelPermissionsService.api}/one`, query, authorizationHeader);
    }

    static getChannelPermittedUsers(channelId: string, query: any, authorizationHeader: string) {
        return HttpClient.get(`${ChannelPermissionsService.api}/${channelId}/users`, query, authorizationHeader);
    }

    static getUserPermittedChannels(query: any, authorizationHeader: string) {
        return HttpClient.get(`${ChannelPermissionsService.api}/channels`, query, authorizationHeader);
    }

    static async doesExist(channelId: string, authorizationHeader: string) {
        return HttpClient.head(`${ChannelPermissionsService.api}/${channelId}`, null, authorizationHeader);
    }
}
