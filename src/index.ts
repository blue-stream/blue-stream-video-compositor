import * as express from 'express';
import * as bodyParser from 'body-parser';
import { syslogSeverityLevels } from 'llamajs';

import { config } from './config';
import { AppRouter } from './router';
import { AppProxyRouter } from './proxyRouter';
import { Authenticator } from './utils/authenticator';
import { Logger } from './utils/logger';
import { unknownErrorHandler, errorHandler } from './utils/errors/errorHandler';

const server = express();

server.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const origin = req.headers.origin as string;

    if (config.cors.allowedOrigins.indexOf(origin) !== -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    return next();
});

if (config.authentication.required) {
    server.use((req, res, next) => {
        req.headers.authorization = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJAZG8ifQ.k1sGqvw0IJ1ocB9XrF8Oviaz4D-A4E9fDkz_VmAY-LA';
        next();
    });
    server.use(Authenticator.initialize());
    server.use(Authenticator.middleware);
} else {
    server.use(Authenticator.mockUser);
}

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(AppRouter);
server.use(AppProxyRouter);

server.use(errorHandler);
server.use(unknownErrorHandler);

Logger.configure();

Logger.log(syslogSeverityLevels.Informational, 'Video Compositor Started', `Port: ${config.server.port}`);
console.log(`${config.server.name} running on port ${config.server.port}`);

server.listen(config.server.port);
