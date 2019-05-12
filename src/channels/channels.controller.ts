import { Request, Response } from 'express';
import { ChannelsService } from './channels.service';
import { VideosRpc } from '../videos/videos.rpc';
import { log } from '../utils/logger';

export class ChannelsController {
    static async getMany(req: Request, res: Response) {
        const channels = await ChannelsService.getMany(req.query, req.headers.authorization!);

        return res.json(await ChannelsController.populateViews(channels, req.user));
    }

    static async getSearched(req: Request, res: Response) {
        const channels = await ChannelsService.getSearched(req.query, req.headers.authorization!);

        return res.json(await ChannelsController.populateViews(channels, req.user));
    }

    static async populateViews(channels: any[], user: any) {
        const channelIds = channels.map((channel: { id: string }) => channel.id);
        const views = await VideosRpc.getChannelsViews(channelIds).catch((error) => {
            log('warn' , 'Videos RPC request failed - getChannelsViews', error.message, '', user ? user.id : 'unknown', { error });
            return undefined;
        });

        return channels.map((channel: any) => {
            return {
                ...channel,
                views: views ? views[channel.id] : undefined,
            };
        });
    }
}
