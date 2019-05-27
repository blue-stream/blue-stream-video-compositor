import { Request, Response } from 'express';
import { ChannelsService } from '../channels/channels.service';
import { VideosService } from './videos.service';
import { UsersService } from '../users/users.service';
import { ChannelsRpc } from '../channels/channels.rpc';
import { sign } from 'jsonwebtoken';
import { config } from '../config';
import { log } from '../utils/logger';

export class VideosController {
    static async get(req: Request, res: Response) {
        const video = await VideosService.get(req.params.id, req.headers.authorization!);

        const results = await Promise.all([
            UsersService.get(video.owner, req.headers.authorization!).catch((error) => {
                log('warn' , 'Users Service request failed - get', error.message, '', req.user ? req.user.id : 'unknown', { error });
                return video.owner;
            }),
            ChannelsService.get(video.channel, req.headers.authorization!).catch((error) => {
                log('warn' , 'Channels Service request failed - get', error.message, '', req.user ? req.user.id : 'unknown', { error });
                return video.channel;
            }),
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
        const channels = await ChannelsRpc.getChannelsByIds(channelsIds).catch((error) => {
            log('warn' , 'Channels Rpc request failed - getChannelsByIds', error.message, '', req.user ? req.user.id : 'unknown', { error });
            return [];
        });

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
        const video = await VideosService.create(req.body, req.headers.authorization!);
        const videoToken = sign({ user: req.user.id, video: video.id }, config.authentication.secret);

        res.json({
            ...video,
            token: videoToken,
        });
    }

    static async reuploadVideo(req: Request, res: Response) {
        const videoToken = sign({ user: req.user.id, video: req.params.id }, config.authentication.secret);

        res.json({
            token: videoToken,
        });
    }

    static async getSearched(req: Request, res: Response) {
        let videos = await VideosService.getSearched(req.query, req.headers.authorization!);
        const channelsIds = videos.map((video: any) => video.channel);
        const channels = await ChannelsRpc.getChannelsByIds(channelsIds).catch((error) => {
            log('warn' , 'Channels Rpc request failed - getChannelsByIds', error.message, '', req.user ? req.user.id : 'unknown', { error });
            return [];
        });

        videos = videos.map((video: any) => {
            return {
                ...video,
                channel: channels[video.channel] || video.channel,
            };
        });
        return res.json(videos);
    }
}
