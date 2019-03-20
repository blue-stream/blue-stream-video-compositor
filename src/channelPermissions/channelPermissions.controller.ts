import { Request, Response } from 'express';
import { ChannelPermissionsService } from './channelPermissions.service';
import { VideosRpc } from '../videos/videos.rpc';
import { UsersRpc } from '../users/users.rpc';
import { log } from '../utils/logger';

export class ChannelPermissionsController {
    static async getChannelPermittedUsers(req: Request, res: Response) {
        let userPermissions = await ChannelPermissionsService.getChannelPermittedUsers(req.params.channelId, req.query, req.headers.authorization!);
        const userIds = userPermissions.map((userPermission: { user: string }) => userPermission.user);
        const users = await UsersRpc.getUsersByIds(userIds).catch((error) => {
            log('warn' , 'Users RPC request failed - getUsersByIds', error.message, '', req.user ? req.user.id : 'unknown', { error });
            return undefined;
        });

        userPermissions = userPermissions.map((userPermission: any) => {
            return {
                ...userPermission,
                user: users ? users[userPermission.user] : userPermission.user,
            };
        });

        return res.json(userPermissions);
    }

    static async getUserPermittedChannels(req: Request, res: Response) {
        let userPermissions = await ChannelPermissionsService.getUserPermittedChannels(req.query, req.headers.authorization!);
        const channelIds = userPermissions.map((userPermission: { channel: { id: string } }) => userPermission.channel.id);
        const channelsViews = await VideosRpc.getChannelsViews(channelIds);
        userPermissions = userPermissions.map((userPermission: any) => {
            userPermission.channel = {
                ...userPermission.channel,
                views: channelsViews ? channelsViews[userPermission.channel.id] || 0 : 0,
            };
            return userPermission;
        });

        return res.json(userPermissions);
    }
}
