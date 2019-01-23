import * as express from 'express';
import { Logger } from '../logger';
import { syslogSeverityLevels } from 'llamajs/dist';
import { AxiosError } from 'axios';

export function errorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if ((error as AxiosError).response) {
        const axiosError = error as AxiosError;
        Logger.log(
            syslogSeverityLevels.Critical,
            'AxiosError',
            `${error.name} was thrown with status ${axiosError.response!.status} and message ${axiosError.response!.statusText}`);

        res.status(axiosError.response!.status).send();
    } else {
        next(error);
    }
}

export function unknownErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    Logger.log(
        syslogSeverityLevels.Critical,
        'Unknown Error',
        `${error.name} was thrown with status 500 and message ${error.message}`);

    res.status(500).send({
        type: error.name,
        message: error.message,
    });

    next(error);
}
