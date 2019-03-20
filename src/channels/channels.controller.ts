import { Request, Response } from 'express';
import { ChannelsService } from './channels.service';
import { VideosRpc } from '../videos/videos.rpc';
import { log } from '../utils/logger';

export class ChannelsController {
    static async getMany(req: Request, res: Response) {
        let channels = await ChannelsService.getMany(req.query, req.headers.authorization!);
        const channelIds = channels.map((channel: { id: string }) => channel.id);
        const views = await VideosRpc.getChannelsViews(channelIds).catch((error) => {
            log('warn' , 'Videos RPC request failed - getChannelsViews', error.message, '', req.user ? req.user.id : 'unknown', [error]);
            return undefined;
        });

        channels = channels.map((channel: any) => {
            return {
                ...channel,
                views: views ? views[channel.id] : undefined,
            };
        });

        return res.json(channels);
    }
}
