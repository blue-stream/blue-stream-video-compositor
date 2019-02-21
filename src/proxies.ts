import * as proxy from 'http-proxy-middleware';
import { config } from './config';

const videosApi: string = `${config.endpoints.videos.hostname}:${config.endpoints.videos.port}`;
const channelsApi: string = `${config.endpoints.channels.hostname}:${config.endpoints.channels.port}`;
const usersApi: string = `${config.endpoints.users.hostname}:${config.endpoints.users.port}`;

const restream = (proxyReq: any, req: any, res: any) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
};

const VideosProxy = proxy({ target: videosApi, onProxyReq: restream });
const ChannelsProxy = proxy({ target: channelsApi, onProxyReq: restream });
const UsersProxy = proxy({ target: usersApi, onProxyReq: restream });

export { VideosProxy, ChannelsProxy, UsersProxy };
