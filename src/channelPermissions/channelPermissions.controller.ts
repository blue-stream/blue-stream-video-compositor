import { Request, Response } from 'express';
import { ChannelPermissionsService } from './channelPermissions.service';
import { VideosRpc } from '../videos/videos.rpc';
import { UsersRpc } from '../users/users.rpc';
import { ChannelsRpc } from '../channels/channels.rpc';

export class ChannelPermissionsController {
    static async getChannelPermittedUsers(req: Request, res: Response) {
        let userPermissions = await ChannelPermissionsService.getChannelPermittedUsers(req.params.channelId, req.query, req.headers.authorization!);
        const userIds = userPermissions.map((userPermission: { user: string }) => userPermission.user);
        const users = await UsersRpc.getUsersByIds(userIds).catch(e => undefined);

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
        const channelIds = userPermissions.map((userPermission: { channel: string }) => userPermission.channel);
        const channels = await ChannelsRpc.getChannelsByIds(channelIds).catch(e => undefined);

        userPermissions = userPermissions.map((userPermission: any) => {
            return {
                ...userPermission,
                channel: channels ? channels[userPermission.channel] : userPermission.channel,
            };
        });

        return res.json(userPermissions);
    }
}
