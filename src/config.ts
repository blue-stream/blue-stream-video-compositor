export const config = {
    endpoints: {
        users: {
            rpc: {
                port: +(process.env.USERS_RPC_PORT || 6007),
                methods: {
                    GET_USERS_BY_IDS: 'getUsersByIds',
                },
            },
            port: +(process.env.USERS_PORT || 5007),
            hostname: process.env.USERS_HOST || 'http://localhost',
            api: process.env.USERS_API || '/api/user',
        },
        videos: {
            rpc: {
                port: +(process.env.VIDEOS_RPC_PORT || 6001),
                methods: {
                    GET_CHANNELS_VIEWS: 'getChannelsViews',
                },
            },
            port: +(process.env.VIDEOS_PORT || 5001),
            hostname: process.env.VIDEOS_HOST || 'http://localhost',
            api: process.env.VIDEOS_API || '/api/video',
        },
        views: {
            port: +(process.env.VIDEOS_PORT || 5001),
            hostname: process.env.VIDEOS_HOST || 'http://localhost',
            api: process.env.VIEWS_API || '/api/view',
        },
        userClassifications: {
            port: +(process.env.VIDEOS_PORT || 5001),
            hostname: process.env.VIDEOS_HOST || 'http://localhost',
            api: process.env.CLASSIFICATIONS_PROXY_API || '/api/classification',
        },
        channels: {
            rpc: {
                port: +(process.env.CHANNELS_RPC_PORT || 6006),
                methods: {
                    GET_CHANNELS_BY_IDS: 'getChannelsByIds',
                },
            },
            port: +(process.env.CHANNELS_PORT || 5006),
            hostname: process.env.CHANNELS_HOST || 'http://localhost',
            api: process.env.CHANNELS_API || '/api/channel',
        },
        userPermissions: {
            port: +(process.env.CHANNELS_PORT || 5006),
            hostname: process.env.CHANNELS_HOST || 'http://localhost',
            api: process.env.USER_PERMISSIONS_API || '/api/userPermissions',
        },
    },
    server: {
        port: +(process.env.SERVER_PORT || 7001),
        hostname: process.env.SERVER_HOST || 'http://localhost',
        name: process.env.SERVER_NAME || 'blue-stream-video-compositor',
    },
    logger: {
        elasticsearch: process.env.LOGGER_ELASTICSEARCH && {
            hosts: process.env.LOGGER_ELASTICSEARCH.split(','),
        },
        indexPrefix: process.env.LOGGER_ELASTICSEARCH_PREFIX || 'blue-stream-logs',
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost'],
    },
    authentication: {
        required: process.env.AUTHENTICATION_REQUIRED || true,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018',
    },
    apm: {
        server: process.env.APM_SERVER || 'http://apm:8200',
        isActive: +(process.env.APM_ACTIVE || 1),
    },
    videoSecret: 'video@bs2019!',
};
