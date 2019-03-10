import { Router } from 'express';
import { VideosRouter } from './videos/videos.router';
import { ChannelsRouter } from './channels/channels.router';
import { config } from './config';
import { ChannelPermissionsRouter } from './channelPermissions/channelPermissions.router';
import { HealthRouter } from './utils/health/health.router';

const AppRouter: Router = Router();

AppRouter.use(config.endpoints.videos.api, VideosRouter);
AppRouter.use(config.endpoints.channels.api, ChannelsRouter);
AppRouter.use(config.endpoints.userPermissions.api, ChannelPermissionsRouter);
AppRouter.use('/health', HealthRouter);

export { AppRouter };
