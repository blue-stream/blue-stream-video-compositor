import { config } from '../config';
import { HttpClient } from '../utils/http.client';

export class UsersService {
    static api: string = `${config.endpoints.users.hostname}:${config.endpoints.users.port}${config.endpoints.users.api}`;

    static get(id: string, authorizationHeader: string) {
        return HttpClient.get(`${UsersService.api}/${id}`, null, authorizationHeader);
    }
}
