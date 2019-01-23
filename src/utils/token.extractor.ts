import { Request } from 'express';

export function tokenToHeader(req: Request): { headers: Object } {
    const authHeader = req.headers['authorization'];

    return {
        headers: {
            authorization: authHeader,
        },
    };
}
