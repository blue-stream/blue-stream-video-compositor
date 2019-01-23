import { Request, Response } from 'express';
import { ChannelsService } from './channels.service';
import { VideosRpc } from '../videos/videos.rpc';

export class ChannelsController {
    static async getMany(req: Request, res: Response) {
        let channels = await ChannelsService.getMany(req.query, req.headers.authorization!);
        const channelIds = channels.map((channel: { id: string }) => channel.id);

        try {
            const views = await VideosRpc.getChannelsViews(channelIds);

            channels = channels.map((channel: any) => {
                channel.views = views[channel.id];

                return channel;
            });
        } finally {
            return res.json(channels);
        }

    }
}
