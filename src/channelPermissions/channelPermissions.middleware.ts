import { Request, Response, NextFunction } from 'express';
import { ChannelPermissionsService } from './channelPermissions.service';
import { VideosService } from '../videos/videos.service';

enum PermissionTypes {
    Upload = 'UPLOAD',
    Edit = 'EDIT',
    Remove = 'REMOVE',
    Admin = 'ADMIN',
}

export class ChannelPermissionsMiddleware {
    static hasUploadPermission() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const userPermissions = await ChannelPermissionsService.getOne({ channel: req.body.channel }, req.headers.authorization!);

            if (!userPermissions) {
                throw new Error('User does not have permissions to this channel');
            }

            if (userPermissions.permissions.indexOf(PermissionTypes.Upload) === -1 &&
                userPermissions.permissions.indexOf(PermissionTypes.Admin) === -1) {
                throw new Error('User does not have Upload/Admin permissions to this channel');
            }

            next();
        };
    }

    static hasEditPermission() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const video = await VideosService.get(req.params.id, req.headers.authorization!);

            if (!video) {
                throw new Error('Video does not exists');
            }

            const userPermissions = await ChannelPermissionsService.getOne({ channel: video.channel }, req.headers.authorization!);

            if (!userPermissions) {
                throw new Error('User does not have permissions to this channel');
            }

            if (userPermissions.permissions.indexOf(PermissionTypes.Edit) === -1 &&
                userPermissions.permissions.indexOf(PermissionTypes.Admin) === -1) {
                throw new Error('User does not have Edit/Admin permissions to this channel');
            }

            next();
        };
    }

    static hasDeletePermission() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const video = await VideosService.get(req.params.id, req.headers.authorization!);

            if (!video) {
                throw new Error('Video does not exists');
            }

            const userPermissions = await ChannelPermissionsService.getOne({ channel: video.channel }, req.headers.authorization!);

            if (!userPermissions) {
                throw new Error('User does not have permissions to this channel');
            }

            if (userPermissions.permissions.indexOf(PermissionTypes.Remove) === -1 &&
                userPermissions.permissions.indexOf(PermissionTypes.Admin) === -1) {
                throw new Error('User does not have Remove/Admin permissions to this channel');
            }

            next();
        };
    }
}
