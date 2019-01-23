import { Router } from 'express';
import { VideosRouter } from './videos/videos.router';
import { ChannelsRouter } from './channels/channels.router';
import { config } from './config';

const AppRouter: Router = Router();

AppRouter.use(config.endpoints.videos.api, VideosRouter);
AppRouter.use(config.endpoints.channels.api, ChannelsRouter);

export { AppRouter };
