import { Router } from 'express';
import { VideosProxy, ChannelsProxy } from './proxies';
import { config } from './config';

const AppProxyRouter: Router = Router();

AppProxyRouter.use(config.endpoints.videos.api, VideosProxy);
AppProxyRouter.use(config.endpoints.channels.api, ChannelsProxy);

export { AppProxyRouter };
