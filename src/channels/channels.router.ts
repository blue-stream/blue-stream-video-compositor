import { Router } from 'express';
import { ChannelsController } from './channels.controller';
import { Wrapper } from '../utils/wrapper';

const ChannelsRouter: Router = Router();

ChannelsRouter.get('/many', Wrapper.wrapAsync(ChannelsController.getMany));
ChannelsRouter.get('/search', Wrapper.wrapAsync(ChannelsController.getSearched));

export { ChannelsRouter };
