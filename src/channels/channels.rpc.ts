import { config } from '../config';

const jayson = require('jayson/promise');

export class ChannelsRpc {
    private static rpcClient = jayson.Client.http(`${config.endpoints.channels.hostname}:${config.endpoints.channels.rpc.port}`);

    static async getChannelsByIds(channelIds: string[]) {
        const response = await ChannelsRpc.rpcClient.request(config.endpoints.channels.rpc.methods.GET_CHANNELS_BY_IDS, channelIds);

        return response.result;
    }
}
