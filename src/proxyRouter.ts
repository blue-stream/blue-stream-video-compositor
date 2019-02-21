import { Router } from 'express';
import { VideosProxy, ChannelsProxy, UsersProxy } from './proxies';
import { config } from './config';

const AppProxyRouter: Router = Router();

AppProxyRouter.use(config.endpoints.videos.api, VideosProxy);
AppProxyRouter.use(config.endpoints.views.api, VideosProxy);
AppProxyRouter.use(config.endpoints.channels.api, ChannelsProxy);
AppProxyRouter.use(config.endpoints.userPermissions.api, ChannelsProxy);
AppProxyRouter.use(config.endpoints.users.api, UsersProxy);

export { AppProxyRouter };
