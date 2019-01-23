import * as proxy from 'http-proxy-middleware';
import { config } from './config';

const videosApi: string = `${config.endpoints.videos.hostname}:${config.endpoints.videos.port}`;
const channelsApi: string = `${config.endpoints.channels.hostname}:${config.endpoints.channels.port}`;

const VideosProxy = proxy({ target: videosApi });
const ChannelsProxy = proxy({ target: channelsApi });

export { VideosProxy, ChannelsProxy };
