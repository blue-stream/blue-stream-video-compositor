import { Router } from 'express';
import { VideosController } from './videos.controller';
import { Wrapper } from '../utils/wrapper';
import { ChannelPermissionsMiddleware } from '../channelPermissions/channelPermissions.middleware';
import { VideosProxy } from '../proxies';

const VideosRouter: Router = Router();

VideosRouter.get('/', Wrapper.wrapAsync(VideosController.getMany));
VideosRouter.get('/amount', VideosProxy);
VideosRouter.get('/tags', VideosProxy);
VideosRouter.get('/search', Wrapper.wrapAsync(VideosController.getSearched));
VideosRouter.get('/:id', Wrapper.wrapAsync(VideosController.get));
VideosRouter.post('/', Wrapper.wrapAsync(ChannelPermissionsMiddleware.hasUploadPermission()), Wrapper.wrapAsync(VideosController.create));
VideosRouter.put('/reupload/:id', Wrapper.wrapAsync(ChannelPermissionsMiddleware.hasReuploadPermission()), Wrapper.wrapAsync(VideosController.reuploadVideo))
VideosRouter.put('/:id', Wrapper.wrapAsync(ChannelPermissionsMiddleware.hasEditPermission()));
VideosRouter.delete('/:id', Wrapper.wrapAsync(ChannelPermissionsMiddleware.hasDeletePermission()));

export { VideosRouter };
