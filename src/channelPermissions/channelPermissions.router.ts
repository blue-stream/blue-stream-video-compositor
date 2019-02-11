import { Router } from 'express';
import { ChannelPermissionsController } from './channelPermissions.controller';
import { Wrapper } from '../utils/wrapper';

const ChannelPermissionsRouter: Router = Router();

ChannelPermissionsRouter.get('/channels', Wrapper.wrapAsync(ChannelPermissionsController.getUserPermittedChannels));
ChannelPermissionsRouter.get('/:channelId/users', Wrapper.wrapAsync(ChannelPermissionsController.getChannelPermittedUsers));

export { ChannelPermissionsRouter };
