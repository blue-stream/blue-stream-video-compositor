import { Request, Response } from 'express';
import { ChannelsService } from '../channels/channels.service';
import { VideosService } from './videos.service';
import { UsersService } from '../users/users.service';
import { ChannelsRpc } from '../channels/channels.rpc';
import { sign } from 'jsonwebtoken';
import { config } from '../config';

export class VideosController {
    static async get(req: Request, res: Response) {
        const video = await VideosService.get(req.params.id, req.headers.authorization!);

        const results = await Promise.all([
            UsersService.get(video.owner, req.headers.authorization!).catch(e => video.owner),
            ChannelsService.get(video.channel, req.headers.authorization!).catch(e => video.channel),
        ]);

        const [owner, channel] = results;
        const signedToken = sign({ user: req.user.id, path: video.contentPath }, config.videoSecret);

        res.json({
            ...video,
            channel,
            owner,
            token: signedToken,
        });
    }

    static async getMany(req: Request, res: Response) {
        let videos = await VideosService.getMany(req.query, req.headers.authorization!);
        const channelsIds = videos.map((video: any) => video.channel);
        const channels = await ChannelsRpc.getChannelsByIds(channelsIds).catch(e => []);

        videos = videos.map((video: any) => {
            return {
                ...video,
                channel: channels[video.channel] || video.channel,
            };
        });
        return res.json(videos);
    }

    static async create(req: Request, res: Response) {
        await ChannelsService.doesExist(req.body.channel, req.headers.authorization!);
        res.json(await VideosService.create(req.body, req.headers.authorization!));
    }

    static async getSearched(req: Request, res: Response) {
        let videos = await VideosService.getSearched(req.query, req.headers.authorization!);
        const channelsIds = videos.map((video: any) => video.channel);
        const channels = await ChannelsRpc.getChannelsByIds(channelsIds).catch(e => []);

        videos = videos.map((video: any) => {
            return {
                ...video,
                channel: channels[video.channel] || video.channel,
            };
        });
        return res.json(videos);
    }
}
