import * as express from 'express';
import { log } from '../logger';
import { AxiosError } from 'axios';
import { ServerError, UserError } from './applicationError';

export function userErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof UserError) {
        log('info' , 'User Error', `${error.name} was thrown with status ${error.status} and message ${error.message}`, '', req.user.id);
        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });

        next();
    } else {
        next(error);
    }
}

export function serverErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof ServerError) {
        log('warn' , 'Server Error', `${error.name} was thrown with status ${error.status} and message ${error.message}`, '', req.user.id);
        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });

        next();
    } else {
        next(error);
    }
}

export function errorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if ((error as AxiosError).response) {
        const axiosError = error as AxiosError;
        log('warn' , 'AxiosError', `${error.name} was thrown with status ${axiosError.response!.status} and message ${axiosError.response!.statusText}`, '', req.user.id);

        res.status(axiosError.response!.status).send();
    } else {
        next(error);
    }
}

export function unknownErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    log('error' , 'Unknown Error', `${error.name} was thrown with status 500 and message ${error.message}`, '', req.user.id);

    res.status(500).send({
        type: error.name,
        message: error.message,
    });

    next(error);
}
